import { BadgeTemplate } from './types';

export const BADGE_TEMPLATES: BadgeTemplate[] = [
  // Build Status
  {
    id: 'build-passing',
    name: 'Build Passing',
    description: 'Indicates successful build status',
    category: 'Build Status',
    config: {
      label: 'build',
      message: 'passing',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'build-failing',
    name: 'Build Failing',
    description: 'Indicates failed build status',
    category: 'Build Status',
    config: {
      label: 'build',
      message: 'failing',
      messageColor: '#e05d44',
      style: 'flat'
    }
  },
  {
    id: 'tests-passing',
    name: 'Tests Passing',
    description: 'All tests are passing',
    category: 'Build Status',
    config: {
      label: 'tests',
      message: 'passing',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  
  // Version
  {
    id: 'version',
    name: 'Version',
    description: 'Current version number',
    category: 'Version',
    config: {
      label: 'version',
      message: 'v1.0.0',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },
  {
    id: 'npm-version',
    name: 'npm Version',
    description: 'npm package version',
    category: 'Version',
    config: {
      label: 'npm',
      message: 'v1.0.0',
      messageColor: '#cb3837',
      style: 'flat'
    }
  },
  
  // License
  {
    id: 'license-mit',
    name: 'MIT License',
    description: 'MIT license badge',
    category: 'License',
    config: {
      label: 'license',
      message: 'MIT',
      messageColor: '#97ca00',
      style: 'flat'
    }
  },
  {
    id: 'license-apache',
    name: 'Apache License',
    description: 'Apache 2.0 license badge',
    category: 'License',
    config: {
      label: 'license',
      message: 'Apache 2.0',
      messageColor: '#97ca00',
      style: 'flat'
    }
  },
  {
    id: 'license-gpl',
    name: 'GPL License',
    description: 'GPL v3 license badge',
    category: 'License',
    config: {
      label: 'license',
      message: 'GPL v3',
      messageColor: '#97ca00',
      style: 'flat'
    }
  },
  
  // Code Quality
  {
    id: 'code-quality-a',
    name: 'Code Quality A',
    description: 'Excellent code quality',
    category: 'Quality',
    config: {
      label: 'code quality',
      message: 'A',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'coverage-100',
    name: 'Coverage 100%',
    description: 'Full test coverage',
    category: 'Quality',
    config: {
      label: 'coverage',
      message: '100%',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  
  // Technology Stacks
  {
    id: 'react',
    name: 'Made with React',
    description: 'Built using React',
    category: 'Technology',
    config: {
      label: 'made with',
      message: 'React',
      messageColor: '#61dafb',
      style: 'flat'
    }
  },
  {
    id: 'vue',
    name: 'Made with Vue',
    description: 'Built using Vue.js',
    category: 'Technology',
    config: {
      label: 'made with',
      message: 'Vue.js',
      messageColor: '#4fc08d',
      style: 'flat'
    }
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Built with Node.js',
    category: 'Technology',
    config: {
      label: 'powered by',
      message: 'Node.js',
      messageColor: '#339933',
      style: 'flat'
    }
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Built with Python',
    category: 'Technology',
    config: {
      label: 'made with',
      message: 'Python',
      messageColor: '#3776ab',
      style: 'flat'
    }
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Built with TypeScript',
    category: 'Technology',
    config: {
      label: 'made with',
      message: 'TypeScript',
      messageColor: '#3178c6',
      style: 'flat'
    }
  },
  
  // Status
  {
    id: 'status-active',
    name: 'Status Active',
    description: 'Project is actively maintained',
    category: 'Status',
    config: {
      label: 'status',
      message: 'active',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'status-maintenance',
    name: 'Status Maintenance',
    description: 'Project is in maintenance mode',
    category: 'Status',
    config: {
      label: 'status',
      message: 'maintenance',
      messageColor: '#dfb317',
      style: 'flat'
    }
  },
  {
    id: 'status-deprecated',
    name: 'Status Deprecated',
    description: 'Project is deprecated',
    category: 'Status',
    config: {
      label: 'status',
      message: 'deprecated',
      messageColor: '#e05d44',
      style: 'flat'
    }
  },
  
  // Downloads
  {
    id: 'downloads',
    name: 'Downloads',
    description: 'Number of downloads',
    category: 'Stats',
    config: {
      label: 'downloads',
      message: '1M+',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },
  
  // Social
  {
    id: 'github-stars',
    name: 'GitHub Stars',
    description: 'Number of GitHub stars',
    category: 'Social',
    config: {
      label: 'stars',
      message: '100+',
      messageColor: '#dfb317',
      style: 'social'
    }
  },
  {
    id: 'github-forks',
    name: 'GitHub Forks',
    description: 'Number of GitHub forks',
    category: 'Social',
    config: {
      label: 'forks',
      message: '50+',
      messageColor: '#007ec6',
      style: 'social'
    }
  },
  
  // Custom
  {
    id: 'custom-success',
    name: 'Success',
    description: 'Generic success badge',
    category: 'Custom',
    config: {
      label: 'status',
      message: 'success',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'custom-warning',
    name: 'Warning',
    description: 'Generic warning badge',
    category: 'Custom',
    config: {
      label: 'status',
      message: 'warning',
      messageColor: '#dfb317',
      style: 'flat'
    }
  },
  {
    id: 'custom-error',
    name: 'Error',
    description: 'Generic error badge',
    category: 'Custom',
    config: {
      label: 'status',
      message: 'error',
      messageColor: '#e05d44',
      style: 'flat'
    }
  }
];

export function getTemplatesByCategory(): Record<string, BadgeTemplate[]> {
  return BADGE_TEMPLATES.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, BadgeTemplate[]>);
}

export function getTemplateById(id: string): BadgeTemplate | undefined {
  return BADGE_TEMPLATES.find(template => template.id === id);
}