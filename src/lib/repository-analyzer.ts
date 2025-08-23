import { ProjectContext } from './badge-suggestions';

export interface RepositoryInfo {
  owner: string;
  repo: string;
  description?: string;
  language?: string;
  topics?: string[];
  hasIssues?: boolean;
  hasWiki?: boolean;
  hasPages?: boolean;
  forksCount?: number;
  stargazersCount?: number;
  openIssuesCount?: number;
  license?: {
    name: string;
    spdx_id: string;
  };
  defaultBranch?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageInfo {
  name?: string;
  version?: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  keywords?: string[];
  license?: string;
  engines?: Record<string, string>;
}

export interface AnalysisResult {
  repository: RepositoryInfo;
  projectContext: ProjectContext;
  detectedFrameworks: string[];
  detectedTools: string[];
  confidence: number;
  suggestions: {
    badges: string[];
    collections: string[];
    customizations: string[];
  };
}

class RepositoryAnalyzer {
  private githubApiBase = 'https://api.github.com';
  
  /**
   * Analyze a GitHub repository URL and extract project information
   */
  async analyzeRepository(repoUrl: string): Promise<AnalysisResult> {
    const { owner, repo } = this.parseRepositoryUrl(repoUrl);
    
    try {
      // Fetch repository information
      const repoInfo = await this.fetchRepositoryInfo(owner, repo);
      
      // Fetch package.json if it exists
      const packageInfo = await this.fetchPackageInfo(owner, repo);
      
      // Analyze project structure
      const projectContext = this.analyzeProjectContext(repoInfo, packageInfo);
      
      // Detect frameworks and tools
      const { frameworks, tools, confidence } = this.detectTechnologies(repoInfo, packageInfo);
      
      // Generate suggestions
      const suggestions = this.generateSuggestions(projectContext, frameworks, tools);
      
      return {
        repository: repoInfo,
        projectContext,
        detectedFrameworks: frameworks,
        detectedTools: tools,
        confidence,
        suggestions
      };
    } catch (error) {
      throw new Error(`Failed to analyze repository: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse GitHub repository URL to extract owner and repo name
   */
  private parseRepositoryUrl(url: string): { owner: string; repo: string } {
    const patterns = [
      /github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?(?:\/.*)?$/,
      /^([^\/]+)\/([^\/]+)$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          owner: match[1],
          repo: match[2].replace(/\.git$/, '')
        };
      }
    }

    throw new Error('Invalid GitHub repository URL format');
  }

  /**
   * Fetch repository information from GitHub API
   */
  private async fetchRepositoryInfo(owner: string, repo: string): Promise<RepositoryInfo> {
    const response = await fetch(`${this.githubApiBase}/repos/${owner}/${repo}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Repository not found or is private');
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      owner: data.owner.login,
      repo: data.name,
      description: data.description,
      language: data.language,
      topics: data.topics || [],
      hasIssues: data.has_issues,
      hasWiki: data.has_wiki,
      hasPages: data.has_pages,
      forksCount: data.forks_count,
      stargazersCount: data.stargazers_count,
      openIssuesCount: data.open_issues_count,
      license: data.license ? {
        name: data.license.name,
        spdx_id: data.license.spdx_id
      } : undefined,
      defaultBranch: data.default_branch,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  /**
   * Fetch package.json content from repository
   */
  private async fetchPackageInfo(owner: string, repo: string): Promise<PackageInfo | null> {
    try {
      const response = await fetch(`${this.githubApiBase}/repos/${owner}/${repo}/contents/package.json`);
      
      if (!response.ok) {
        return null; // package.json doesn't exist
      }

      const data = await response.json();
      
      if (data.content) {
        const content = atob(data.content.replace(/\s/g, ''));
        return JSON.parse(content) as PackageInfo;
      }
      
      return null;
    } catch (error) {
      console.warn('Failed to parse package.json:', error);
      return null; // Failed to parse or fetch
    }
  }

  /**
   * Analyze project context from repository and package information
   */
  private analyzeProjectContext(repoInfo: RepositoryInfo, packageInfo: PackageInfo | null): ProjectContext {
    const context: ProjectContext = {
      language: repoInfo.language?.toLowerCase(),
      isOpenSource: true, // GitHub public repos are open source
      hasCI: false, // Will be enhanced later with workflow detection
      hasTests: false // Will be enhanced later with test file detection
    };

    // Detect project type from description and topics
    const indicators = [
      ...(repoInfo.description?.toLowerCase().split(' ') || []),
      ...(repoInfo.topics || []),
      ...(packageInfo?.keywords || [])
    ];

    // Detect project type
    if (indicators.some(i => ['web', 'website', 'frontend', 'react', 'vue', 'angular'].includes(i))) {
      context.type = 'web';
    } else if (indicators.some(i => ['mobile', 'ios', 'android', 'react-native', 'flutter'].includes(i))) {
      context.type = 'mobile';
    } else if (indicators.some(i => ['api', 'backend', 'server', 'rest', 'graphql'].includes(i))) {
      context.type = 'api';
    } else if (indicators.some(i => ['library', 'package', 'npm', 'pip', 'gem'].includes(i))) {
      context.type = 'library';
    } else if (indicators.some(i => ['game', 'gaming', 'unity', 'godot'].includes(i))) {
      context.type = 'game';
    } else if (indicators.some(i => ['ai', 'ml', 'machine-learning', 'tensorflow', 'pytorch'].includes(i))) {
      context.type = 'ai';
    } else if (indicators.some(i => ['blockchain', 'crypto', 'web3', 'smart-contract'].includes(i))) {
      context.type = 'blockchain';
    }

    // Detect framework from dependencies
    if (packageInfo?.dependencies || packageInfo?.devDependencies) {
      const deps = { ...packageInfo.dependencies, ...packageInfo.devDependencies };
      
      if (deps.react || deps['@types/react']) context.framework = 'react';
      else if (deps.vue || deps['@vue/core']) context.framework = 'vue';
      else if (deps['@angular/core']) context.framework = 'angular';
      else if (deps.svelte) context.framework = 'svelte';
      else if (deps.next) context.framework = 'nextjs';
      else if (deps.nuxt) context.framework = 'nuxt';
      else if (deps.express) context.framework = 'express';
      else if (deps.fastify) context.framework = 'fastify';
      else if (deps.nestjs) context.framework = 'nestjs';
    }

    // Detect features from topics and dependencies
    context.features = [];
    if (repoInfo.topics?.includes('typescript') || packageInfo?.devDependencies?.typescript) {
      context.features.push('typescript');
    }
    if (repoInfo.topics?.includes('docker') || indicators.includes('docker')) {
      context.features.push('docker');
    }
    if (packageInfo?.scripts?.test || packageInfo?.devDependencies?.jest || packageInfo?.devDependencies?.vitest) {
      context.hasTests = true;
      context.features.push('testing');
    }

    return context;
  }

  /**
   * Detect technologies and frameworks from repository data
   */
  private detectTechnologies(repoInfo: RepositoryInfo, packageInfo: PackageInfo | null): {
    frameworks: string[];
    tools: string[];
    confidence: number;
  } {
    const frameworks: Set<string> = new Set();
    const tools: Set<string> = new Set();
    let confidence = 0.5; // Base confidence

    // Language detection increases confidence
    if (repoInfo.language) {
      confidence += 0.2;
    }

    // Package.json existence increases confidence for JS/TS projects
    if (packageInfo) {
      confidence += 0.2;
      
      const deps = { ...packageInfo.dependencies, ...packageInfo.devDependencies };
      
      // Framework detection
      Object.keys(deps).forEach(dep => {
        if (dep.includes('react')) frameworks.add('React');
        if (dep.includes('vue')) frameworks.add('Vue.js');
        if (dep.includes('angular')) frameworks.add('Angular');
        if (dep.includes('svelte')) frameworks.add('Svelte');
        if (dep.includes('next')) frameworks.add('Next.js');
        if (dep.includes('nuxt')) frameworks.add('Nuxt.js');
        if (dep.includes('express')) frameworks.add('Express.js');
        if (dep.includes('fastify')) frameworks.add('Fastify');
        if (dep.includes('nest')) frameworks.add('NestJS');
        if (dep.includes('gatsby')) frameworks.add('Gatsby');
      });

      // Tool detection
      Object.keys(deps).forEach(dep => {
        if (dep.includes('webpack')) tools.add('Webpack');
        if (dep.includes('vite')) tools.add('Vite');
        if (dep.includes('rollup')) tools.add('Rollup');
        if (dep.includes('babel')) tools.add('Babel');
        if (dep.includes('typescript')) tools.add('TypeScript');
        if (dep.includes('eslint')) tools.add('ESLint');
        if (dep.includes('prettier')) tools.add('Prettier');
        if (dep.includes('jest')) tools.add('Jest');
        if (dep.includes('vitest')) tools.add('Vitest');
        if (dep.includes('cypress')) tools.add('Cypress');
        if (dep.includes('playwright')) tools.add('Playwright');
      });
    }

    // Topic-based detection
    repoInfo.topics?.forEach(topic => {
      const topicLower = topic.toLowerCase();
      
      // Framework detection from topics
      if (topicLower.includes('react')) frameworks.add('React');
      if (topicLower.includes('vue')) frameworks.add('Vue.js');
      if (topicLower.includes('angular')) frameworks.add('Angular');
      if (topicLower.includes('svelte')) frameworks.add('Svelte');
      if (topicLower.includes('nextjs') || topicLower.includes('next-js')) frameworks.add('Next.js');
      
      // Tool detection from topics
      if (topicLower.includes('typescript')) tools.add('TypeScript');
      if (topicLower.includes('docker')) tools.add('Docker');
      if (topicLower.includes('kubernetes')) tools.add('Kubernetes');
      if (topicLower.includes('ci-cd')) tools.add('CI/CD');
      if (topicLower.includes('testing')) tools.add('Testing');
    });

    // Language-specific tools
    if (repoInfo.language) {
      const lang = repoInfo.language.toLowerCase();
      if (lang === 'javascript' || lang === 'typescript') {
        tools.add('Node.js');
      } else if (lang === 'python') {
        tools.add('Python');
      } else if (lang === 'java') {
        tools.add('Java');
      } else if (lang === 'go') {
        tools.add('Go');
      } else if (lang === 'rust') {
        tools.add('Rust');
      }
    }

    return {
      frameworks: Array.from(frameworks),
      tools: Array.from(tools),
      confidence: Math.min(confidence, 1.0)
    };
  }

  /**
   * Generate badge and customization suggestions based on analysis
   */
  private generateSuggestions(
    context: ProjectContext,
    frameworks: string[],
    // _tools: string[] - tools parameter not currently used but kept for future enhancement
  ): {
    badges: string[];
    collections: string[];
    customizations: string[];
  } {
    const badges: string[] = [];
    const collections: string[] = [];
    const customizations: string[] = [];

    // Language-specific badges
    if (context.language) {
      badges.push(`${context.language}-badge`);
    }

    // Framework-specific badges
    frameworks.forEach(framework => {
      badges.push(`${framework.toLowerCase().replace(/\./g, '')}-badge`);
    });

    // Project type badges
    if (context.type) {
      badges.push(`${context.type}-project`);
    }

    // Feature badges
    if (context.hasTests) {
      badges.push('tests-passing', 'coverage-badge');
    }

    if (context.hasCI) {
      badges.push('build-status', 'ci-badge');
    }

    if (context.isOpenSource) {
      badges.push('license-badge', 'contributions-welcome');
    }

    // Collection suggestions based on project type and frameworks
    if (context.type === 'web' && frameworks.includes('React')) {
      collections.push('modern-react-app', 'frontend-essentials');
    } else if (context.type === 'api') {
      collections.push('api-essentials', 'backend-complete');
    } else if (context.type === 'ai') {
      collections.push('machine-learning', 'data-science');
    } else if (frameworks.some(f => f.includes('Node'))) {
      collections.push('nodejs-complete');
    }

    // Customization suggestions
    if (context.type === 'web') {
      customizations.push('gradient-animations', 'modern-styling');
    } else if (context.type === 'ai') {
      customizations.push('tech-theme', 'glow-effects');
    } else if (context.isOpenSource) {
      customizations.push('community-theme', 'friendly-colors');
    }

    return { badges, collections, customizations };
  }
}

export const repositoryAnalyzer = new RepositoryAnalyzer();