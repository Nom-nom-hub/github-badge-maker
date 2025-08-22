'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Clock, 
  Award, 
  Users, 
  Zap,
  Calendar,
  Palette,
  Heart,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { 
  badgeAnalytics, 
  BadgeAnalytics, 
  BadgeUsageStats, 
  UserBadgeHistory 
} from '@/lib/badge-analytics';
import { toast } from 'sonner';

interface BadgeAnalyticsProps {
  onSelectFromHistory?: (config: any) => void;
}

export function BadgeAnalyticsDashboard({ onSelectFromHistory }: BadgeAnalyticsProps) {
  const [analytics, setAnalytics] = useState<BadgeAnalytics | null>(null);
  const [history, setHistory] = useState<UserBadgeHistory[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [popularTemplates, setPopularTemplates] = useState<BadgeUsageStats[]>([]);
  const [trendingTemplates, setTrendingTemplates] = useState<BadgeUsageStats[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = () => {
    setAnalytics(badgeAnalytics.getAnalytics());
    setHistory(badgeAnalytics.getRecentHistory(20));
    setFavorites(badgeAnalytics.getFavorites());
    setPopularTemplates(badgeAnalytics.getPopularTemplates(10));
    setTrendingTemplates(badgeAnalytics.getTrendingTemplates(10));
  };

  const handleExportData = () => {
    try {
      const data = badgeAnalytics.exportData();
      if (data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `badge-maker-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Analytics data exported successfully!');
      }
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const handleClearHistory = () => {
    badgeAnalytics.clearHistory();
    setHistory([]);
    toast.success('History cleared successfully!');
  };

  const handleToggleFavorite = (templateId: string) => {
    badgeAnalytics.toggleFavorite(templateId);
    setFavorites(badgeAnalytics.getFavorites());
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!analytics) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Badge Analytics</h2>
          <p className="text-muted-foreground">Track your badge creation patterns and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleExportData}>
            <Download className="h-3 w-3 mr-1" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BarChart3 className="h-3 w-3 mr-1" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trends">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="h-3 w-3 mr-1" />
            History
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart className="h-3 w-3 mr-1" />
            Favorites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Total Created</p>
                    <p className="text-2xl font-bold">{analytics.totalBadgesCreated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm font-medium">This Week</p>
                    <p className="text-2xl font-bold">{analytics.weeklyUsage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">Unique Templates</p>
                    <p className="text-2xl font-bold">{popularTemplates.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Favorites</p>
                    <p className="text-2xl font-bold">{favorites.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Style Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Favorite Style</span>
                    <Badge variant="secondary">{analytics.userPreferences.favoriteStyle}</Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-3">Recent Colors</p>
                  <div className="flex flex-wrap gap-2">
                    {analytics.userPreferences.favoriteColors.slice(0, 6).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-border shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Top Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(badgeAnalytics.getCategoryUsage())
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([category, count]) => {
                      const total = Object.values(badgeAnalytics.getCategoryUsage()).reduce((a, b) => a + b, 0);
                      const percentage = total > 0 ? (count / total) * 100 : 0;
                      
                      return (
                        <div key={category} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{category}</span>
                            <span className="text-muted-foreground">{count} uses</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Popular Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  Most Popular Templates
                </CardTitle>
                <CardDescription>Based on usage frequency and recency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularTemplates.slice(0, 8).map((template, index) => (
                    <div key={template.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-medium text-sm">{template.name}</p>
                          <p className="text-xs text-muted-foreground">{template.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{template.usageCount}</p>
                        <p className="text-xs text-muted-foreground">uses</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Trending This Week
                </CardTitle>
                <CardDescription>Templates gaining popularity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTemplates.length > 0 ? (
                    trendingTemplates.slice(0, 8).map((template, index) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">{template.name}</p>
                            <p className="text-xs text-muted-foreground">{template.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">+{template.weeklyUsage}</p>
                          <p className="text-xs text-muted-foreground">this week</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No trending data yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{history.length} recent badges</p>
            <Button size="sm" variant="outline" onClick={handleClearHistory}>
              <Trash2 className="h-3 w-3 mr-1" />
              Clear History
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {history.length > 0 ? (
              history.map((item) => (
                <Card key={item.id} className="group hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{item.config.label}</p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">{item.config.message}</p>
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleFavorite(item.templateId)}
                        >
                          <Heart className={`h-3 w-3 ${
                            favorites.includes(item.templateId) ? 'fill-red-500 text-red-500' : ''
                          }`} />
                        </Button>
                        {onSelectFromHistory && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onSelectFromHistory(item.config)}
                          >
                            Use Again
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No badge history yet</p>
                <p className="text-sm">Start creating badges to see your history here!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{favorites.length} favorite templates</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {favorites.length > 0 ? (
              favorites.map((templateId) => {
                const template = popularTemplates.find(t => t.id === templateId);
                if (!template) return null;
                
                return (
                  <Card key={templateId} className="group hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Heart className="h-4 w-4 text-red-500 fill-current" />
                          <div>
                            <p className="font-medium text-sm">{template.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">{template.category}</Badge>
                              <span>•</span>
                              <span>{template.usageCount} uses</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleFavorite(templateId)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No favorite templates yet</p>
                <p className="text-sm">Mark templates as favorites to see them here!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}