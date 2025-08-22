import { BadgeTemplate } from './types';
import { BADGE_TEMPLATES } from './badge-templates';

export interface BadgeCollection {
  id: string;
  name: string;
  description: string;
  category: string;
  badges: string[]; // Badge template IDs
  icon: string;
  color: string;
  isPremium?: boolean;
  isPopular?: boolean;
}

export const BADGE_COLLECTIONS: BadgeCollection[] = [
  // Frontend Collections
  {
    id: 'modern-react-app',
    name: 'Modern React App',
    description: 'Complete set for modern React applications',
    category: 'Frontend',
    badges: ['react', 'typescript', 'nextjs', 'tailwindcss', 'vercel', 'build-passing', 'coverage-90'],
    icon: '⚛️',
    color: '#61DAFB',
    isPopular: true
  },
  {
    id: 'vue-ecosystem',
    name: 'Vue.js Ecosystem',
    description: 'Essential badges for Vue.js projects',
    category: 'Frontend',
    badges: ['vue', 'nuxtjs', 'vuetify', 'vite', 'typescript', 'npm-version'],
    icon: '💚',
    color: '#4FC08D'
  },
  {
    id: 'angular-enterprise',
    name: 'Angular Enterprise',
    description: 'Professional Angular application setup',
    category: 'Frontend',
    badges: ['angular', 'typescript', 'rxjs', 'material-ui', 'jest', 'cypress'],
    icon: '🅰️',
    color: '#DD0031'
  },

  // Backend Collections
  {
    id: 'nodejs-api',
    name: 'Node.js API',
    description: 'REST API with Node.js and Express',
    category: 'Backend',
    badges: ['nodejs', 'express', 'typescript', 'mongodb', 'jwt', 'swagger'],
    icon: '🚀',
    color: '#339933',
    isPopular: true
  },
  {
    id: 'python-fastapi',
    name: 'Python FastAPI',
    description: 'Modern Python API with FastAPI',
    category: 'Backend',
    badges: ['python', 'fastapi', 'postgresql', 'docker', 'pytest', 'pydantic'],
    icon: '🐍',
    color: '#3776AB'
  },
  {
    id: 'java-spring',
    name: 'Java Spring Boot',
    description: 'Enterprise Java application',
    category: 'Backend',
    badges: ['java', 'spring', 'maven', 'mysql', 'junit', 'docker'],
    icon: '☕',
    color: '#ED8B00'
  },

  // Full Stack Collections
  {
    id: 'mern-stack',
    name: 'MERN Stack',
    description: 'Complete MongoDB, Express, React, Node.js setup',
    category: 'Full Stack',
    badges: ['mongodb', 'express', 'react', 'nodejs', 'typescript', 'jwt', 'heroku'],
    icon: '🔥',
    color: '#FF6B6B',
    isPopular: true
  },
  {
    id: 'jamstack',
    name: 'JAMstack',
    description: 'Modern JAMstack architecture',
    category: 'Full Stack',
    badges: ['gatsby', 'react', 'graphql', 'netlify', 'contentful', 'lighthouse'],
    icon: '⚡',
    color: '#F0047F'
  },

  // AI/ML Collections
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Complete ML project setup',
    category: 'AI/ML',
    badges: ['python', 'tensorflow', 'pytorch', 'jupyter', 'pandas', 'scikit-learn', 'docker'],
    icon: '🤖',
    color: '#FF6F00',
    isPremium: true
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Data analysis and visualization',
    category: 'AI/ML',
    badges: ['python', 'jupyter', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'plotly'],
    icon: '📊',
    color: '#2196F3'
  },

  // Mobile Collections
  {
    id: 'react-native',
    name: 'React Native',
    description: 'Cross-platform mobile development',
    category: 'Mobile',
    badges: ['react-native', 'typescript', 'expo', 'ios', 'android', 'app-store', 'play-store'],
    icon: '📱',
    color: '#61DAFB'
  },
  {
    id: 'flutter-app',
    name: 'Flutter App',
    description: 'Beautiful native mobile apps',
    category: 'Mobile',
    badges: ['flutter', 'dart', 'firebase', 'ios', 'android', 'material-design'],
    icon: '🦋',
    color: '#02569B'
  },

  // DevOps Collections
  {
    id: 'devops-complete',
    name: 'DevOps Complete',
    description: 'Full CI/CD and infrastructure setup',
    category: 'DevOps',
    badges: ['docker', 'kubernetes', 'github-actions', 'aws', 'terraform', 'prometheus'],
    icon: '🔄',
    color: '#326CE5',
    isPremium: true
  },
  {
    id: 'ci-cd-basic',
    name: 'CI/CD Essentials',
    description: 'Basic continuous integration setup',
    category: 'DevOps',
    badges: ['github-actions', 'build-passing', 'coverage-90', 'docker', 'deploy-status'],
    icon: '🚀',
    color: '#2088FF'
  },

  // Gaming Collections
  {
    id: 'unity-game',
    name: 'Unity Game',
    description: 'Unity game development badges',
    category: 'Gaming',
    badges: ['unity', 'csharp', 'steam', 'itch-io', 'windows', 'android'],
    icon: '🎮',
    color: '#000000'
  },
  {
    id: 'web-game',
    name: 'Web Game',
    description: 'Browser-based game development',
    category: 'Gaming',
    badges: ['javascript', 'typescript', 'webgl', 'threejs', 'canvas', 'pwa'],
    icon: '🕹️',
    color: '#F7DF1E'
  },

  // Blockchain Collections
  {
    id: 'ethereum-dapp',
    name: 'Ethereum DApp',
    description: 'Decentralized application on Ethereum',
    category: 'Blockchain',
    badges: ['ethereum', 'solidity', 'web3js', 'metamask', 'truffle', 'hardhat'],
    icon: '⟠',
    color: '#627EEA',
    isPremium: true
  },
  {
    id: 'defi-protocol',
    name: 'DeFi Protocol',
    description: 'Decentralized finance protocol',
    category: 'Blockchain',
    badges: ['ethereum', 'solidity', 'openzeppelin', 'uniswap', 'chainlink', 'security-audit'],
    icon: '💰',
    color: '#F7931A'
  },

  // Open Source Collections
  {
    id: 'oss-project',
    name: 'Open Source Project',
    description: 'Essential badges for open source projects',
    category: 'Community',
    badges: ['license-mit', 'contributions-welcome', 'good-first-issue', 'hacktoberfest', 'github-stars', 'github-forks'],
    icon: '🌟',
    color: '#FF6B35',
    isPopular: true
  },
  {
    id: 'community-driven',
    name: 'Community Driven',
    description: 'Build an engaged community',
    category: 'Community',
    badges: ['discord', 'slack', 'twitter', 'reddit', 'stackoverflow', 'documentation'],
    icon: '🤝',
    color: '#7289DA'
  },

  // Quality Assurance Collections
  {
    id: 'quality-focused',
    name: 'Quality Focused',
    description: 'Comprehensive quality assurance setup',
    category: 'Quality',
    badges: ['coverage-100', 'build-passing', 'code-quality-a', 'security-audit', 'performance-a', 'accessibility-aa'],
    icon: '✨',
    color: '#00D084',
    isPremium: true
  },
  {
    id: 'testing-complete',
    name: 'Testing Complete',
    description: 'Full testing suite setup',
    category: 'Quality',
    badges: ['jest', 'cypress', 'puppeteer', 'coverage-90', 'build-passing', 'test-report'],
    icon: '🧪',
    color: '#C21325'
  }
];

export function getCollectionsByCategory(category: string): BadgeCollection[] {
  return BADGE_COLLECTIONS.filter(collection => collection.category === category);
}

export function getPopularCollections(): BadgeCollection[] {
  return BADGE_COLLECTIONS.filter(collection => collection.isPopular);
}

export function getPremiumCollections(): BadgeCollection[] {
  return BADGE_COLLECTIONS.filter(collection => collection.isPremium);
}

export function getCollectionBadges(collectionId: string): BadgeTemplate[] {
  const collection = BADGE_COLLECTIONS.find(c => c.id === collectionId);
  if (!collection) return [];
  
  return BADGE_TEMPLATES.filter(template => collection.badges.includes(template.id));
}

export function getAllCategories(): string[] {
  return [...new Set(BADGE_COLLECTIONS.map(c => c.category))];
}

export function searchCollections(query: string): BadgeCollection[] {
  const lowerQuery = query.toLowerCase();
  return BADGE_COLLECTIONS.filter(collection => 
    collection.name.toLowerCase().includes(lowerQuery) ||
    collection.description.toLowerCase().includes(lowerQuery) ||
    collection.category.toLowerCase().includes(lowerQuery)
  );
}