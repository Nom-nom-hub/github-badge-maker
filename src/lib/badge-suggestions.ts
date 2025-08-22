import { BadgeTemplate } from './types';
import { BADGE_TEMPLATES } from './badge-templates';

export interface ProjectContext {
  language?: string;
  framework?: string;
  type?: 'web' | 'mobile' | 'api' | 'library' | 'game' | 'ai' | 'blockchain';
  features?: string[];
  deployment?: string;
  hasTests?: boolean;
  hasCI?: boolean;
  isOpenSource?: boolean;
}

export interface SuggestionGroup {
  category: string;
  title: string;
  description: string;
  templates: BadgeTemplate[];
  priority: number;
}

/**
 * Intelligent badge suggestion engine
 */
export class BadgeSuggestionEngine {
  /**
   * Get smart badge suggestions based on project context
   */
  getSuggestions(context: ProjectContext): SuggestionGroup[] {
    const suggestions: SuggestionGroup[] = [];

    // Essential badges (always show)
    suggestions.push({
      category: 'essential',
      title: '🚀 Essential Badges',
      description: 'Must-have badges for any project',
      templates: this.getEssentialBadges(context),
      priority: 1
    });

    // Technology-specific badges
    if (context.language || context.framework) {
      suggestions.push({
        category: 'technology',
        title: '⚡ Technology Stack',
        description: 'Show off your tech stack',
        templates: this.getTechnologyBadges(context),
        priority: 2
      });
    }

    // Project type-specific badges
    if (context.type) {
      suggestions.push({
        category: 'project-type',
        title: '🎯 Project Specific',
        description: `Perfect for ${context.type} projects`,
        templates: this.getProjectTypeBadges(context),
        priority: 3
      });
    }

    // Quality & Testing badges
    if (context.hasTests || context.hasCI) {
      suggestions.push({
        category: 'quality',
        title: '🔍 Quality Assurance',
        description: 'Showcase your code quality',
        templates: this.getQualityBadges(context),
        priority: 4
      });
    }

    // Community badges for open source
    if (context.isOpenSource) {
      suggestions.push({
        category: 'community',
        title: '🤝 Community',
        description: 'Build an engaged community',
        templates: this.getCommunityBadges(),
        priority: 5
      });
    }

    // Deployment & Infrastructure
    if (context.deployment) {
      suggestions.push({
        category: 'deployment',
        title: '☁️ Deployment',
        description: 'Show where your project runs',
        templates: this.getDeploymentBadges(context),
        priority: 6
      });
    }

    return suggestions.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Get trending badge combinations
   */
  getTrendingCombinations(): { name: string; badges: string[]; description: string }[] {
    return [
      {
        name: 'Modern Web App',
        badges: ['nextjs', 'typescript', 'tailwindcss', 'vercel', 'build-passing'],
        description: 'Perfect for modern React/Next.js applications'
      },
      {
        name: 'AI/ML Project',
        badges: ['python', 'tensorflow', 'jupyter', 'openai', 'coverage-90'],
        description: 'Showcase your AI and machine learning project'
      },
      {
        name: 'Full Stack App',
        badges: ['nodejs', 'react', 'postgresql', 'docker', 'aws'],
        description: 'Complete full-stack application setup'
      },
      {
        name: 'Open Source Library',
        badges: ['npm-version', 'license-mit', 'contributions-welcome', 'github-stars'],
        description: 'Essential badges for open source libraries'
      },
      {
        name: 'Blockchain DApp',
        badges: ['ethereum', 'solidity', 'web3js', 'metamask', 'security-audit'],
        description: 'Decentralized application badges'
      },
      {
        name: 'Mobile App',
        badges: ['react-native', 'ios', 'android', 'app-store', 'play-store'],
        description: 'Cross-platform mobile application'
      }
    ];
  }

  private getEssentialBadges(context: ProjectContext): BadgeTemplate[] {
    const essentialIds = ['build-passing', 'license-mit', 'version'];
    
    if (context.isOpenSource) {
      essentialIds.push('contributions-welcome', 'github-stars');
    }
    
    return this.getBadgesByIds(essentialIds);
  }

  private getTechnologyBadges(context: ProjectContext): BadgeTemplate[] {
    const techIds: string[] = [];

    // Language badges
    if (context.language) {
      const languageMap: Record<string, string[]> = {
        'javascript': ['nodejs', 'npm-version'],
        'typescript': ['typescript', 'npm-version'],
        'python': ['python', 'pypi-version'],
        'rust': ['rust', 'crates-version'],
        'go': ['go'],
        'java': ['java', 'maven-version'],
        'csharp': ['csharp', 'nuget-version'],
        'php': ['php', 'packagist-version'],
        'ruby': ['ruby', 'gem-version']
      };
      
      const languageBadges = languageMap[context.language.toLowerCase()];
      if (languageBadges) {
        techIds.push(...languageBadges);
      }
    }

    // Framework badges
    if (context.framework) {
      const frameworkMap: Record<string, string[]> = {
        'react': ['react', 'npm-version'],
        'nextjs': ['nextjs', 'react'],
        'vue': ['vue', 'npm-version'],
        'angular': ['angular', 'npm-version'],
        'svelte': ['svelte', 'npm-version'],
        'django': ['django', 'python'],
        'flask': ['flask', 'python'],
        'express': ['express', 'nodejs'],
        'fastapi': ['fastapi', 'python'],
        'spring': ['spring', 'java'],
        'laravel': ['laravel', 'php'],
        'rails': ['rails', 'ruby']
      };
      
      const frameworkBadges = frameworkMap[context.framework.toLowerCase()];
      if (frameworkBadges) {
        techIds.push(...frameworkBadges);
      }
    }

    return this.getBadgesByIds([...new Set(techIds)]);
  }

  private getProjectTypeBadges(context: ProjectContext): BadgeTemplate[] {
    const typeMap: Record<string, string[]> = {
      'web': ['responsive', 'pwa', 'lighthouse'],
      'mobile': ['react-native', 'flutter', 'ios', 'android'],
      'api': ['api-rest', 'api-graphql', 'swagger', 'postman'],
      'library': ['npm-version', 'downloads', 'documentation'],
      'game': ['unity', 'unreal-engine', 'steam'],
      'ai': ['tensorflow', 'pytorch', 'jupyter', 'openai'],
      'blockchain': ['ethereum', 'solidity', 'web3js']
    };

    const typeBadges = typeMap[context.type!] || [];
    return this.getBadgesByIds(typeBadges);
  }

  private getQualityBadges(context: ProjectContext): BadgeTemplate[] {
    const qualityIds = [];
    
    if (context.hasTests) {
      qualityIds.push('coverage-100', 'jest', 'cypress');
    }
    
    if (context.hasCI) {
      qualityIds.push('ci-github-actions', 'build-passing');
    }
    
    qualityIds.push('code-quality-a', 'eslint', 'prettier');
    
    return this.getBadgesByIds(qualityIds);
  }

  private getCommunityBadges(): BadgeTemplate[] {
    return this.getBadgesByIds([
      'contributions-welcome',
      'good-first-issue',
      'help-wanted',
      'hacktoberfest',
      'discord',
      'github-stars',
      'github-forks'
    ]);
  }

  private getDeploymentBadges(context: ProjectContext): BadgeTemplate[] {
    const deploymentMap: Record<string, string[]> = {
      'vercel': ['deploy-vercel', 'lighthouse'],
      'netlify': ['deploy-netlify', 'lighthouse'],
      'heroku': ['deploy-heroku'],
      'aws': ['aws', 'docker'],
      'gcp': ['gcp', 'docker'],
      'azure': ['azure', 'docker'],
      'docker': ['docker', 'kubernetes']
    };

    const deploymentBadges = deploymentMap[context.deployment.toLowerCase()] || [];
    return this.getBadgesByIds(deploymentBadges);
  }

  private getBadgesByIds(ids: string[]): BadgeTemplate[] {
    return BADGE_TEMPLATES.filter(template => ids.includes(template.id));
  }

  /**
   * Get popular badge combinations for a category
   */
  getPopularCombinations(category: string): BadgeTemplate[][] {
    const combinations: Record<string, string[][]> = {
      'Frontend': [
        ['react', 'typescript', 'tailwindcss'],
        ['vue', 'nuxtjs', 'sass'],
        ['angular', 'typescript', 'bootstrap']
      ],
      'Backend': [
        ['nodejs', 'express', 'mongodb'],
        ['python', 'django', 'postgresql'],
        ['java', 'spring', 'mysql']
      ],
      'AI/ML': [
        ['python', 'tensorflow', 'jupyter'],
        ['pytorch', 'pandas', 'scikit-learn'],
        ['openai', 'huggingface', 'jupyter']
      ]
    };

    const combos = combinations[category] || [];
    return combos.map(combo => this.getBadgesByIds(combo));
  }
}

// Export singleton instance
export const badgeSuggestionEngine = new BadgeSuggestionEngine();
