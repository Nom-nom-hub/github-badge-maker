import { BadgeTemplate } from './types';

export interface BadgeUsageStats {
  id: string;
  name: string;
  category: string;
  usageCount: number;
  lastUsed: Date;
  popularityScore: number;
  trending: boolean;
  weeklyUsage: number;
  monthlyUsage: number;
}

export interface BadgeAnalytics {
  totalBadgesCreated: number;
  totalUniqueTemplates: number;
  mostPopularCategory: string;
  mostUsedTemplate: string;
  todayUsage: number;
  weeklyUsage: number;
  monthlyUsage: number;
  userPreferences: {
    favoriteStyle: string;
    favoriteColors: string[];
    mostUsedFeatures: string[];
  };
  trends: {
    risingTemplates: BadgeUsageStats[];
    decliningTemplates: BadgeUsageStats[];
    newTemplates: BadgeUsageStats[];
  };
}

export interface UserBadgeHistory {
  id: string;
  templateId: string;
  config: any;
  createdAt: Date;
  category: string;
  isCustom: boolean;
  isFavorite: boolean;
}

class BadgeAnalyticsService {
  private readonly STORAGE_KEY = 'badge-maker-analytics';
  private readonly USAGE_KEY = 'badge-maker-usage';
  private readonly HISTORY_KEY = 'badge-maker-history';
  private readonly FAVORITES_KEY = 'badge-maker-favorites';
  
  constructor() {
    this.initializeAnalytics();
  }

  private initializeAnalytics() {
    if (typeof window === 'undefined') return;
    
    // Initialize analytics if not exists
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const initialAnalytics: BadgeAnalytics = {
        totalBadgesCreated: 0,
        totalUniqueTemplates: 0,
        mostPopularCategory: '',
        mostUsedTemplate: '',
        todayUsage: 0,
        weeklyUsage: 0,
        monthlyUsage: 0,
        userPreferences: {
          favoriteStyle: 'flat',
          favoriteColors: ['#4c1', '#007ec6', '#e05d44'],
          mostUsedFeatures: []
        },
        trends: {
          risingTemplates: [],
          decliningTemplates: [],
          newTemplates: []
        }
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialAnalytics));
    }

    // Initialize usage stats if not exists
    if (!localStorage.getItem(this.USAGE_KEY)) {
      localStorage.setItem(this.USAGE_KEY, JSON.stringify({}));
    }

    // Initialize history if not exists
    if (!localStorage.getItem(this.HISTORY_KEY)) {
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify([]));
    }

    // Initialize favorites if not exists
    if (!localStorage.getItem(this.FAVORITES_KEY)) {
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify([]));
    }
  }

  trackBadgeUsage(templateId: string, templateName: string, category: string, config: any) {
    if (typeof window === 'undefined') return;
    
    try {
      // Update usage statistics
      const usageData = this.getUsageData();
      const now = new Date();
      
      if (!usageData[templateId]) {
        usageData[templateId] = {
          id: templateId,
          name: templateName,
          category,
          usageCount: 0,
          lastUsed: now,
          popularityScore: 0,
          trending: false,
          weeklyUsage: 0,
          monthlyUsage: 0
        };
      }
      
      usageData[templateId].usageCount++;
      usageData[templateId].lastUsed = now;
      usageData[templateId].weeklyUsage++;
      usageData[templateId].monthlyUsage++;
      
      // Calculate popularity score (weighted by recency and frequency)
      const daysSinceLastUsed = Math.floor((now.getTime() - new Date(usageData[templateId].lastUsed).getTime()) / (1000 * 60 * 60 * 24));
      usageData[templateId].popularityScore = usageData[templateId].usageCount * (1 / (daysSinceLastUsed + 1));
      
      localStorage.setItem(this.USAGE_KEY, JSON.stringify(usageData));
      
      // Update analytics
      this.updateAnalytics(templateId, category, config);
      
      // Add to history
      this.addToHistory(templateId, config, category);
      
    } catch (error) {
      console.warn('Failed to track badge usage:', error);
    }
  }

  private updateAnalytics(templateId: string, category: string, config: any) {
    const analytics = this.getAnalytics();
    
    analytics.totalBadgesCreated++;
    analytics.todayUsage++;
    analytics.weeklyUsage++;
    analytics.monthlyUsage++;
    
    // Update most popular category
    const categoryUsage = this.getCategoryUsage();
    const maxCategory = Object.keys(categoryUsage).reduce((a, b) => 
      categoryUsage[a] > categoryUsage[b] ? a : b
    );
    analytics.mostPopularCategory = maxCategory;
    
    // Update most used template
    const usageData = this.getUsageData();
    const maxTemplate = Object.keys(usageData).reduce((a, b) => 
      usageData[a].usageCount > usageData[b].usageCount ? a : b
    );
    if (maxTemplate) {
      analytics.mostUsedTemplate = usageData[maxTemplate].name;
    }
    
    // Update user preferences
    if (config.style) {
      analytics.userPreferences.favoriteStyle = config.style;
    }
    
    if (config.messageColor && !analytics.userPreferences.favoriteColors.includes(config.messageColor)) {
      analytics.userPreferences.favoriteColors.push(config.messageColor);
      if (analytics.userPreferences.favoriteColors.length > 10) {
        analytics.userPreferences.favoriteColors = analytics.userPreferences.favoriteColors.slice(-10);
      }
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(analytics));
  }

  private addToHistory(templateId: string, config: any, category: string) {
    const history = this.getHistory();
    const now = new Date();
    
    const historyItem: UserBadgeHistory = {
      id: `${templateId}-${now.getTime()}`,
      templateId,
      config,
      createdAt: now,
      category,
      isCustom: !templateId.startsWith('template-'),
      isFavorite: false
    };
    
    history.unshift(historyItem);
    
    // Keep only last 100 items
    if (history.length > 100) {
      history.splice(100);
    }
    
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }

  getAnalytics(): BadgeAnalytics {
    if (typeof window === 'undefined') {
      return {
        totalBadgesCreated: 0,
        totalUniqueTemplates: 0,
        mostPopularCategory: '',
        mostUsedTemplate: '',
        todayUsage: 0,
        weeklyUsage: 0,
        monthlyUsage: 0,
        userPreferences: {
          favoriteStyle: 'flat',
          favoriteColors: [],
          mostUsedFeatures: []
        },
        trends: {
          risingTemplates: [],
          decliningTemplates: [],
          newTemplates: []
        }
      };
    }
    
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : this.getDefaultAnalytics();
    } catch {
      return this.getDefaultAnalytics();
    }
  }

  private getDefaultAnalytics(): BadgeAnalytics {
    return {
      totalBadgesCreated: 0,
      totalUniqueTemplates: 0,
      mostPopularCategory: '',
      mostUsedTemplate: '',
      todayUsage: 0,
      weeklyUsage: 0,
      monthlyUsage: 0,
      userPreferences: {
        favoriteStyle: 'flat',
        favoriteColors: [],
        mostUsedFeatures: []
      },
      trends: {
        risingTemplates: [],
        decliningTemplates: [],
        newTemplates: []
      }
    };
  }

  getUsageData(): Record<string, BadgeUsageStats> {
    if (typeof window === 'undefined') return {};
    
    try {
      const data = localStorage.getItem(this.USAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  getHistory(): UserBadgeHistory[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  toggleFavorite(templateId: string) {
    if (typeof window === 'undefined') return;
    
    try {
      const favorites = this.getFavorites();
      const index = favorites.indexOf(templateId);
      
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(templateId);
      }
      
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.warn('Failed to toggle favorite:', error);
    }
  }

  getPopularTemplates(limit: number = 10): BadgeUsageStats[] {
    const usageData = this.getUsageData();
    return Object.values(usageData)
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit);
  }

  getTrendingTemplates(limit: number = 10): BadgeUsageStats[] {
    const usageData = this.getUsageData();
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return Object.values(usageData)
      .filter(stat => new Date(stat.lastUsed) > sevenDaysAgo)
      .sort((a, b) => b.weeklyUsage - a.weeklyUsage)
      .slice(0, limit);
  }

  getCategoryUsage(): Record<string, number> {
    const usageData = this.getUsageData();
    const categoryUsage: Record<string, number> = {};
    
    Object.values(usageData).forEach(stat => {
      categoryUsage[stat.category] = (categoryUsage[stat.category] || 0) + stat.usageCount;
    });
    
    return categoryUsage;
  }

  getRecentHistory(limit: number = 20): UserBadgeHistory[] {
    return this.getHistory().slice(0, limit);
  }

  clearHistory() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify([]));
  }

  exportData() {
    if (typeof window === 'undefined') return null;
    
    return {
      analytics: this.getAnalytics(),
      usage: this.getUsageData(),
      history: this.getHistory(),
      favorites: this.getFavorites(),
      exportedAt: new Date().toISOString()
    };
  }

  importData(data: any) {
    if (typeof window === 'undefined') return;
    
    try {
      if (data.analytics) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.analytics));
      }
      if (data.usage) {
        localStorage.setItem(this.USAGE_KEY, JSON.stringify(data.usage));
      }
      if (data.history) {
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(data.history));
      }
      if (data.favorites) {
        localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(data.favorites));
      }
    } catch (error) {
      console.error('Failed to import data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const badgeAnalytics = new BadgeAnalyticsService();