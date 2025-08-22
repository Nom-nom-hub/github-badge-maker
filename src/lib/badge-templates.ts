import { BadgeTemplate } from './types';

export const BADGE_TEMPLATES: BadgeTemplate[] = [
  // Build Status & CI/CD
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
  {
    id: 'ci-github-actions',
    name: 'GitHub Actions',
    description: 'GitHub Actions workflow status',
    category: 'Build Status',
    config: {
      label: 'GitHub Actions',
      message: 'passing',
      messageColor: '#2088ff',
      logoSvg: 'github',
      style: 'flat'
    }
  },
  {
    id: 'ci-travis',
    name: 'Travis CI',
    description: 'Travis CI build status',
    category: 'Build Status',
    config: {
      label: 'Travis CI',
      message: 'passing',
      messageColor: '#3eaaaf',
      logoSvg: 'travis',
      style: 'flat'
    }
  },
  {
    id: 'ci-circleci',
    name: 'CircleCI',
    description: 'CircleCI build status',
    category: 'Build Status',
    config: {
      label: 'CircleCI',
      message: 'passing',
      messageColor: '#343434',
      logoSvg: 'circleci',
      style: 'flat'
    }
  },
  {
    id: 'ci-jenkins',
    name: 'Jenkins',
    description: 'Jenkins build status',
    category: 'Build Status',
    config: {
      label: 'Jenkins',
      message: 'passing',
      messageColor: '#d33833',
      logoSvg: 'jenkins',
      style: 'flat'
    }
  },
  {
    id: 'deploy-vercel',
    name: 'Vercel Deployment',
    description: 'Vercel deployment status',
    category: 'Build Status',
    config: {
      label: 'Vercel',
      message: 'deployed',
      messageColor: '#000000',
      logoSvg: 'vercel',
      style: 'flat'
    }
  },
  {
    id: 'deploy-netlify',
    name: 'Netlify Deployment',
    description: 'Netlify deployment status',
    category: 'Build Status',
    config: {
      label: 'Netlify',
      message: 'deployed',
      messageColor: '#00c7b7',
      logoSvg: 'netlify',
      style: 'flat'
    }
  },
  {
    id: 'deploy-heroku',
    name: 'Heroku Deployment',
    description: 'Heroku deployment status',
    category: 'Build Status',
    config: {
      label: 'Heroku',
      message: 'deployed',
      messageColor: '#430098',
      logoSvg: 'heroku',
      style: 'flat'
    }
  },
  
  // Version & Package Managers
  {
    id: 'version',
    name: 'Version',
    description: 'Current version number',
    category: 'Version',
    config: {
      label: 'version',
      message: 'v1.0.0',
      messageColor: '#007ec6',
      logoSvg: 'semanticrelease',
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
      logoSvg: 'npm',
      style: 'flat'
    }
  },
  {
    id: 'npm-downloads',
    name: 'npm Downloads',
    description: 'npm package downloads',
    category: 'Stats',
    config: {
      label: 'downloads',
      message: '1M/month',
      messageColor: '#cb3837',
      logoSvg: 'npm',
      style: 'flat'
    }
  },
  {
    id: 'yarn-version',
    name: 'Yarn Version',
    description: 'Yarn package version',
    category: 'Version',
    config: {
      label: 'yarn',
      message: 'v1.0.0',
      messageColor: '#2c8ebb',
      logoSvg: 'yarn',
      style: 'flat'
    }
  },
  {
    id: 'pnpm-version',
    name: 'pnpm Version',
    description: 'pnpm package version',
    category: 'Version',
    config: {
      label: 'pnpm',
      message: 'v1.0.0',
      messageColor: '#f69220',
      logoSvg: 'pnpm',
      style: 'flat'
    }
  },
  {
    id: 'pypi-version',
    name: 'PyPI Version',
    description: 'Python package version',
    category: 'Version',
    config: {
      label: 'PyPI',
      message: 'v1.0.0',
      messageColor: '#3775a9',
      logoSvg: 'python',
      style: 'flat'
    }
  },
  {
    id: 'maven-version',
    name: 'Maven Central',
    description: 'Maven package version',
    category: 'Version',
    config: {
      label: 'Maven Central',
      message: 'v1.0.0',
      messageColor: '#c71a36',
      logoSvg: 'apachemaven',
      style: 'flat'
    }
  },
  {
    id: 'nuget-version',
    name: 'NuGet Version',
    description: 'NuGet package version',
    category: 'Version',
    config: {
      label: 'NuGet',
      message: 'v1.0.0',
      messageColor: '#004880',
      logoSvg: 'nuget',
      style: 'flat'
    }
  },
  {
    id: 'crates-version',
    name: 'Crates.io Version',
    description: 'Rust crate version',
    category: 'Version',
    config: {
      label: 'crates.io',
      message: 'v1.0.0',
      messageColor: '#dea584',
      logoSvg: 'crates.io',
      style: 'flat'
    }
  },
  {
    id: 'gem-version',
    name: 'RubyGems Version',
    description: 'Ruby gem version',
    category: 'Version',
    config: {
      label: 'gem',
      message: 'v1.0.0',
      messageColor: '#e9573f',
      logoSvg: 'ruby',
      style: 'flat'
    }
  },
  {
    id: 'packagist-version',
    name: 'Packagist Version',
    description: 'PHP package version',
    category: 'Version',
    config: {
      label: 'packagist',
      message: 'v1.0.0',
      messageColor: '#f28d1a',
      logoSvg: 'composer',
      style: 'flat'
    }
  },
  {
    id: 'cocoapods-version',
    name: 'CocoaPods Version',
    description: 'CocoaPods package version',
    category: 'Version',
    config: {
      label: 'CocoaPods',
      message: 'v1.0.0',
      messageColor: '#ee3322',
      logoSvg: 'cocoapods',
      style: 'flat'
    }
  },
  
  // License & Legal
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
  {
    id: 'license-bsd',
    name: 'BSD License',
    description: 'BSD 3-Clause license badge',
    category: 'License',
    config: {
      label: 'license',
      message: 'BSD 3-Clause',
      messageColor: '#97ca00',
      style: 'flat'
    }
  },
  {
    id: 'license-isc',
    name: 'ISC License',
    description: 'ISC license badge',
    category: 'License',
    config: {
      label: 'license',
      message: 'ISC',
      messageColor: '#97ca00',
      style: 'flat'
    }
  },
  {
    id: 'license-unlicense',
    name: 'Unlicense',
    description: 'Unlicense badge',
    category: 'License',
    config: {
      label: 'license',
      message: 'Unlicense',
      messageColor: '#97ca00',
      style: 'flat'
    }
  },
  {
    id: 'license-proprietary',
    name: 'Proprietary License',
    description: 'Proprietary license badge',
    category: 'License',
    config: {
      label: 'license',
      message: 'Proprietary',
      messageColor: '#orange',
      style: 'flat'
    }
  },

  // Frontend Technologies
  {
    id: 'react',
    name: 'Made with React',
    description: 'Built using React',
    category: 'Frontend',
    config: {
      label: 'React',
      message: '18.0+',
      messageColor: '#61dafb',
      logoSvg: 'react',
      style: 'flat'
    }
  },
  {
    id: 'vue',
    name: 'Made with Vue',
    description: 'Built using Vue.js',
    category: 'Frontend',
    config: {
      label: 'Vue.js',
      message: '3.0+',
      messageColor: '#4fc08d',
      logoSvg: 'vue.js',
      style: 'flat'
    }
  },
  {
    id: 'angular',
    name: 'Made with Angular',
    description: 'Built using Angular',
    category: 'Frontend',
    config: {
      label: 'Angular',
      message: '16.0+',
      messageColor: '#dd0031',
      logoSvg: 'angular',
      style: 'flat'
    }
  },
  {
    id: 'svelte',
    name: 'Made with Svelte',
    description: 'Built using Svelte',
    category: 'Frontend',
    config: {
      label: 'Svelte',
      message: '4.0+',
      messageColor: '#ff3e00',
      logoSvg: 'svelte',
      style: 'flat'
    }
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'Built with Next.js',
    category: 'Frontend',
    config: {
      label: 'Next.js',
      message: '14.0+',
      messageColor: '#000000',
      logoSvg: 'next.js',
      style: 'flat'
    }
  },
  {
    id: 'nuxtjs',
    name: 'Nuxt.js',
    description: 'Built with Nuxt.js',
    category: 'Frontend',
    config: {
      label: 'Nuxt.js',
      message: '3.0+',
      messageColor: '#00dc82',
      logoSvg: 'nuxt.js',
      style: 'flat'
    }
  },
  {
    id: 'gatsby',
    name: 'Gatsby',
    description: 'Built with Gatsby',
    category: 'Frontend',
    config: {
      label: 'Gatsby',
      message: '5.0+',
      messageColor: '#663399',
      logoSvg: 'gatsby',
      style: 'flat'
    }
  },
  {
    id: 'astro',
    name: 'Astro',
    description: 'Built with Astro',
    category: 'Frontend',
    config: {
      label: 'Astro',
      message: '4.0+',
      messageColor: '#ff5d01',
      logoSvg: 'astro',
      style: 'flat'
    }
  },
  {
    id: 'vite',
    name: 'Vite',
    description: 'Powered by Vite',
    category: 'Frontend',
    config: {
      label: 'Vite',
      message: '5.0+',
      messageColor: '#646cff',
      logoSvg: 'vite',
      style: 'flat'
    }
  },
  {
    id: 'webpack',
    name: 'Webpack',
    description: 'Bundled with Webpack',
    category: 'Frontend',
    config: {
      label: 'Webpack',
      message: '5.0+',
      messageColor: '#8dd6f9',
      logoSvg: 'webpack',
      style: 'flat'
    }
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    description: 'Styled with Tailwind CSS',
    category: 'Frontend',
    config: {
      label: 'Tailwind CSS',
      message: '3.0+',
      messageColor: '#06b6d4',
      logoSvg: 'tailwindcss',
      style: 'flat'
    }
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    description: 'Styled with Bootstrap',
    category: 'Frontend',
    config: {
      label: 'Bootstrap',
      message: '5.0+',
      messageColor: '#7952b3',
      logoSvg: 'bootstrap',
      style: 'flat'
    }
  },
  {
    id: 'sass',
    name: 'Sass',
    description: 'Styled with Sass',
    category: 'Frontend',
    config: {
      label: 'Sass',
      message: 'CSS',
      messageColor: '#cc6699',
      logoSvg: 'sass',
      style: 'flat'
    }
  },
  {
    id: 'less',
    name: 'Less',
    description: 'Styled with Less',
    category: 'Frontend',
    config: {
      label: 'Less',
      message: 'CSS',
      messageColor: '#1d365d',
      logoSvg: 'less',
      style: 'flat'
    }
  },
  
  // Code Quality & Testing
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
  {
    id: 'codecov',
    name: 'Codecov',
    description: 'Code coverage by Codecov',
    category: 'Quality',
    config: {
      label: 'Codecov',
      message: '95%',
      messageColor: '#f01f7a',
      logoSvg: 'codecov',
      style: 'flat'
    }
  },
  {
    id: 'coverage-90',
    name: 'Coverage 90%',
    description: '90% test coverage',
    category: 'Quality',
    config: {
      label: 'coverage',
      message: '90%',
      messageColor: '#97ca00',
      style: 'flat'
    }
  },
  {
    id: 'coverage-85',
    name: 'Coverage 85%',
    description: '85% test coverage',
    category: 'Quality',
    config: {
      label: 'coverage',
      message: '85%',
      messageColor: '#dfb317',
      style: 'flat'
    }
  },
  {
    id: 'coverage-coveralls',
    name: 'Coveralls',
    description: 'Code coverage by Coveralls',
    category: 'Quality',
    config: {
      label: 'Coveralls',
      message: '92%',
      messageColor: '#343434',
      logoSvg: 'coveralls',
      style: 'flat'
    }
  },
  {
    id: 'codeclimate',
    name: 'Code Climate',
    description: 'Code Climate maintainability',
    category: 'Quality',
    config: {
      label: 'Code Climate',
      message: 'A',
      messageColor: '#44cc11',
      logoSvg: 'codeclimate',
      style: 'flat'
    }
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    description: 'SonarQube quality gate',
    category: 'Quality',
    config: {
      label: 'SonarQube',
      message: 'passed',
      messageColor: '#4e9bcd',
      logoSvg: 'sonarqube',
      style: 'flat'
    }
  },
  {
    id: 'eslint',
    name: 'ESLint',
    description: 'ESLint configured',
    category: 'Quality',
    config: {
      label: 'ESLint',
      message: 'configured',
      messageColor: '#4b32c3',
      logoSvg: 'eslint',
      style: 'flat'
    }
  },
  {
    id: 'prettier',
    name: 'Prettier',
    description: 'Code formatted with Prettier',
    category: 'Quality',
    config: {
      label: 'Prettier',
      message: 'formatted',
      messageColor: '#f7b93e',
      logoSvg: 'prettier',
      style: 'flat'
    }
  },
  {
    id: 'typescript-strict',
    name: 'TypeScript Strict',
    description: 'TypeScript strict mode',
    category: 'Quality',
    config: {
      label: 'TypeScript',
      message: 'strict',
      messageColor: '#3178c6',
      logoSvg: 'typescript',
      style: 'flat'
    }
  },
  {
    id: 'jest',
    name: 'Jest',
    description: 'Tested with Jest',
    category: 'Quality',
    config: {
      label: 'Jest',
      message: 'tested',
      messageColor: '#c21325',
      logoSvg: 'jest',
      style: 'flat'
    }
  },
  {
    id: 'vitest',
    name: 'Vitest',
    description: 'Tested with Vitest',
    category: 'Quality',
    config: {
      label: 'Vitest',
      message: 'tested',
      messageColor: '#6e9f18',
      logoSvg: 'vitest',
      style: 'flat'
    }
  },
  {
    id: 'cypress',
    name: 'Cypress',
    description: 'E2E tested with Cypress',
    category: 'Quality',
    config: {
      label: 'Cypress',
      message: 'E2E',
      messageColor: '#17202c',
      logoSvg: 'cypress',
      style: 'flat'
    }
  },
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'E2E tested with Playwright',
    category: 'Quality',
    config: {
      label: 'Playwright',
      message: 'E2E',
      messageColor: '#2d4552',
      logoSvg: 'playwright',
      style: 'flat'
    }
  },
  {
    id: 'coverage-nyc',
    name: 'NYC Coverage',
    description: 'Code coverage with NYC/Istanbul',
    category: 'Quality',
    config: {
      label: 'nyc',
      message: '88%',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },
  {
    id: 'tests-count',
    name: 'Tests',
    description: 'Number of tests',
    category: 'Quality',
    config: {
      label: 'tests',
      message: '150 passed',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'code-quality-b',
    name: 'Code Quality B',
    description: 'Good code quality',
    category: 'Quality',
    config: {
      label: 'code quality',
      message: 'B',
      messageColor: '#97ca00',
      style: 'flat'
    }
  },
  {
    id: 'code-quality-c',
    name: 'Code Quality C',
    description: 'Average code quality',
    category: 'Quality',
    config: {
      label: 'code quality',
      message: 'C',
      messageColor: '#dfb317',
      style: 'flat'
    }
  },

  // Cloud Platforms & DevOps
  {
    id: 'aws',
    name: 'AWS',
    description: 'Deployed on AWS',
    category: 'Cloud',
    config: {
      label: 'AWS',
      message: 'deployed',
      messageColor: '#ff9900',
      logoSvg: 'amazon',
      style: 'flat'
    }
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    description: 'Deployed on Google Cloud',
    category: 'Cloud',
    config: {
      label: 'Google Cloud',
      message: 'deployed',
      messageColor: '#4285f4',
      logoSvg: 'googlecloud',
      style: 'flat'
    }
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    description: 'Deployed on Azure',
    category: 'Cloud',
    config: {
      label: 'Azure',
      message: 'deployed',
      messageColor: '#0078d4',
      logoSvg: 'microsoftazure',
      style: 'flat'
    }
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Containerized with Docker',
    category: 'Cloud',
    config: {
      label: 'Docker',
      message: 'containerized',
      messageColor: '#2496ed',
      logoSvg: 'docker',
      style: 'flat'
    }
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Orchestrated with Kubernetes',
    category: 'Cloud',
    config: {
      label: 'Kubernetes',
      message: 'orchestrated',
      messageColor: '#326ce5',
      logoSvg: 'kubernetes',
      style: 'flat'
    }
  },
  {
    id: 'terraform',
    name: 'Terraform',
    description: 'Infrastructure as Code',
    category: 'Cloud',
    config: {
      label: 'Terraform',
      message: 'IaC',
      messageColor: '#7b42bc',
      logoSvg: 'terraform',
      style: 'flat'
    }
  },
  {
    id: 'ansible',
    name: 'Ansible',
    description: 'Automated with Ansible',
    category: 'Cloud',
    config: {
      label: 'Ansible',
      message: 'automated',
      messageColor: '#ee0000',
      logoSvg: 'ansible',
      style: 'flat'
    }
  },

  // Project Status
  
  {
    id: 'status-main',
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
  {
    id: 'status-beta',
    name: 'Status Beta',
    description: 'Project is in beta',
    category: 'Status',
    config: {
      label: 'status',
      message: 'beta',
      messageColor: '#ff8c00',
      style: 'flat'
    }
  },
  {
    id: 'status-alpha',
    name: 'Status Alpha',
    description: 'Project is in alpha',
    category: 'Status',
    config: {
      label: 'status',
      message: 'alpha',
      messageColor: '#ff6347',
      style: 'flat'
    }
  },
  {
    id: 'status-stable',
    name: 'Status Stable',
    description: 'Project is stable',
    category: 'Status',
    config: {
      label: 'status',
      message: 'stable',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'status-experimental',
    name: 'Status Experimental',
    description: 'Project is experimental',
    category: 'Status',
    config: {
      label: 'status',
      message: 'experimental',
      messageColor: '#blueviolet',
      style: 'flat'
    }
  },

  // Downloads & Statistics
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
  
  {
    id: 'downloads-month',
    name: 'Monthly Downloads',
    description: 'Monthly download count',
    category: 'Stats',
    config: {
      label: 'downloads',
      message: '200K/month',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },
  {
    id: 'contributors',
    name: 'Contributors',
    description: 'Number of contributors',
    category: 'Stats',
    config: {
      label: 'contributors',
      message: '25+',
      messageColor: '#blue',
      style: 'flat'
    }
  },
  {
    id: 'code-size',
    name: 'Code Size',
    description: 'Size of the codebase',
    category: 'Stats',
    config: {
      label: 'code size',
      message: '1.5MB',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },

  // Social & Community
  {
    id: 'github-stars',
    name: 'GitHub Stars',
    description: 'Number of GitHub stars',
    category: 'Social',
    config: {
      label: 'stars',
      message: '100+',
      messageColor: '#dfb317',
      logoSvg: 'github',
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
      logoSvg: 'github',
      style: 'social'
    }
  },
  {
    id: 'github-issues',
    name: 'GitHub Issues',
    description: 'Open GitHub issues',
    category: 'Social',
    config: {
      label: 'issues',
      message: '5 open',
      messageColor: '#28a745',
      logoSvg: 'github',
      style: 'flat'
    }
  },
  {
    id: 'github-prs',
    name: 'GitHub Pull Requests',
    description: 'Open pull requests',
    category: 'Social',
    config: {
      label: 'pull requests',
      message: '3 open',
      messageColor: '#28a745',
      logoSvg: 'github',
      style: 'flat'
    }
  },
  {
    id: 'discord',
    name: 'Discord Community',
    description: 'Join our Discord server',
    category: 'Social',
    config: {
      label: 'Discord',
      message: 'join chat',
      messageColor: '#5865f2',
      logoSvg: 'discord',
      style: 'flat'
    }
  },
  {
    id: 'twitter',
    name: 'Follow on Twitter',
    description: 'Follow us on Twitter',
    category: 'Social',
    config: {
      label: 'Twitter',
      message: 'follow',
      messageColor: '#1da1f2',
      logoSvg: 'twitter',
      style: 'flat'
    }
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Connect on LinkedIn',
    category: 'Social',
    config: {
      label: 'LinkedIn',
      message: 'connect',
      messageColor: '#0077b5',
      logoSvg: 'linkedin',
      style: 'flat'
    }
  },
  {
    id: 'reddit',
    name: 'Reddit Community',
    description: 'Join our subreddit',
    category: 'Social',
    config: {
      label: 'Reddit',
      message: 'join',
      messageColor: '#ff4500',
      logoSvg: 'reddit',
      style: 'flat'
    }
  },

  // Security & Compliance
  {
    id: 'security-audit',
    name: 'Security Audit',
    description: 'Security audit passed',
    category: 'Security',
    config: {
      label: 'security audit',
      message: 'passed',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'snyk',
    name: 'Snyk Security',
    description: 'Snyk vulnerability scan',
    category: 'Security',
    config: {
      label: 'Snyk',
      message: 'no vulnerabilities',
      messageColor: '#4c1',
      logoSvg: 'snyk',
      style: 'flat'
    }
  },
  {
    id: 'dependabot',
    name: 'Dependabot',
    description: 'Dependabot enabled',
    category: 'Security',
    config: {
      label: 'Dependabot',
      message: 'enabled',
      messageColor: '#025e8c',
      logoSvg: 'dependabot',
      style: 'flat'
    }
  },
  {
    id: 'codeql',
    name: 'CodeQL',
    description: 'CodeQL security analysis',
    category: 'Security',
    config: {
      label: 'CodeQL',
      message: 'analyzed',
      messageColor: '#2088ff',
      logoSvg: 'github',
      style: 'flat'
    }
  },
  {
    id: 'gdpr-compliant',
    name: 'GDPR Compliant',
    description: 'GDPR compliance badge',
    category: 'Security',
    config: {
      label: 'GDPR',
      message: 'compliant',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    description: 'SOC 2 compliance',
    category: 'Security',
    config: {
      label: 'SOC 2',
      message: 'Type II',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  
  // Backend Technologies
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Built with Node.js',
    category: 'Backend',
    config: {
      label: 'Node.js',
      message: '20.0+',
      messageColor: '#339933',
      logoSvg: 'node.js',
      style: 'flat'
    }
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Built with Python',
    category: 'Backend',
    config: {
      label: 'Python',
      message: '3.11+',
      messageColor: '#3776ab',
      logoSvg: 'python',
      style: 'flat'
    }
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Built with TypeScript',
    category: 'Backend',
    config: {
      label: 'TypeScript',
      message: '5.0+',
      messageColor: '#3178c6',
      logoSvg: 'typescript',
      style: 'flat'
    }
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Built with Java',
    category: 'Backend',
    config: {
      label: 'Java',
      message: '17+',
      messageColor: '#ed8b00',
      logoSvg: 'oracle',
      style: 'flat'
    }
  },
  {
    id: 'csharp',
    name: 'C#',
    description: 'Built with C#',
    category: 'Backend',
    config: {
      label: 'C#',
      message: '.NET 8',
      messageColor: '#239120',
      logoSvg: 'csharp',
      style: 'flat'
    }
  },
  {
    id: 'go',
    name: 'Go',
    description: 'Built with Go',
    category: 'Backend',
    config: {
      label: 'Go',
      message: '1.21+',
      messageColor: '#00add8',
      logoSvg: 'go',
      style: 'flat'
    }
  },
  {
    id: 'rust',
    name: 'Rust',
    description: 'Built with Rust',
    category: 'Backend',
    config: {
      label: 'Rust',
      message: '1.75+',
      messageColor: '#000000',
      logoSvg: 'rust',
      style: 'flat'
    }
  },
  {
    id: 'php',
    name: 'PHP',
    description: 'Built with PHP',
    category: 'Backend',
    config: {
      label: 'PHP',
      message: '8.3+',
      messageColor: '#777bb4',
      logoSvg: 'php',
      style: 'flat'
    }
  },
  {
    id: 'ruby',
    name: 'Ruby',
    description: 'Built with Ruby',
    category: 'Backend',
    config: {
      label: 'Ruby',
      message: '3.2+',
      messageColor: '#cc342d',
      logoSvg: 'ruby',
      style: 'flat'
    }
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    description: 'Built with Kotlin',
    category: 'Backend',
    config: {
      label: 'Kotlin',
      message: '1.9+',
      messageColor: '#7f52ff',
      logoSvg: 'kotlin',
      style: 'flat'
    }
  },
  {
    id: 'scala',
    name: 'Scala',
    description: 'Built with Scala',
    category: 'Backend',
    config: {
      label: 'Scala',
      message: '3.0+',
      messageColor: '#dc322f',
      logoSvg: 'scala',
      style: 'flat'
    }
  },
  {
    id: 'swift',
    name: 'Swift',
    description: 'Built with Swift',
    category: 'Backend',
    config: {
      label: 'Swift',
      message: '5.9+',
      messageColor: '#fa7343',
      logoSvg: 'swift',
      style: 'flat'
    }
  },

  // Backend Frameworks
  {
    id: 'express',
    name: 'Express.js',
    description: 'Built with Express.js',
    category: 'Backend',
    config: {
      label: 'Express.js',
      message: '4.0+',
      messageColor: '#000000',
      logoSvg: 'express',
      style: 'flat'
    }
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    description: 'Built with FastAPI',
    category: 'Backend',
    config: {
      label: 'FastAPI',
      message: 'Python',
      messageColor: '#009688',
      logoSvg: 'fastapi',
      style: 'flat'
    }
  },
  {
    id: 'django',
    name: 'Django',
    description: 'Built with Django',
    category: 'Backend',
    config: {
      label: 'Django',
      message: 'Python',
      messageColor: '#092e20',
      logoSvg: 'django',
      style: 'flat'
    }
  },
  {
    id: 'flask',
    name: 'Flask',
    description: 'Built with Flask',
    category: 'Backend',
    config: {
      label: 'Flask',
      message: 'Python',
      messageColor: '#000000',
      logoSvg: 'flask',
      style: 'flat'
    }
  },
  {
    id: 'spring',
    name: 'Spring Boot',
    description: 'Built with Spring Boot',
    category: 'Backend',
    config: {
      label: 'Spring Boot',
      message: 'Java',
      messageColor: '#6db33f',
      logoSvg: 'spring',
      style: 'flat'
    }
  },
  {
    id: 'laravel',
    name: 'Laravel',
    description: 'Built with Laravel',
    category: 'Backend',
    config: {
      label: 'Laravel',
      message: 'PHP',
      messageColor: '#ff2d20',
      logoSvg: 'laravel',
      style: 'flat'
    }
  },
  {
    id: 'rails',
    name: 'Ruby on Rails',
    description: 'Built with Ruby on Rails',
    category: 'Backend',
    config: {
      label: 'Rails',
      message: 'Ruby',
      messageColor: '#cc0000',
      logoSvg: 'rubyonrails',
      style: 'flat'
    }
  },
  {
    id: 'dotnet',
    name: '.NET',
    description: 'Built with .NET',
    category: 'Backend',
    config: {
      label: '.NET',
      message: '8.0+',
      messageColor: '#512bd4',
      logoSvg: 'dotnet',
      style: 'flat'
    }
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    description: 'Built with NestJS',
    category: 'Backend',
    config: {
      label: 'NestJS',
      message: 'Node.js',
      messageColor: '#e0234e',
      logoSvg: 'nestjs',
      style: 'flat'
    }
  },

  // Databases
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Uses PostgreSQL database',
    category: 'Database',
    config: {
      label: 'PostgreSQL',
      message: '16.0+',
      messageColor: '#336791',
      logoSvg: 'postgresql',
      style: 'flat'
    }
  },
  {
    id: 'mysql',
    name: 'MySQL',
    description: 'Uses MySQL database',
    category: 'Database',
    config: {
      label: 'MySQL',
      message: '8.0+',
      messageColor: '#4479a1',
      logoSvg: 'mysql',
      style: 'flat'
    }
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'Uses MongoDB database',
    category: 'Database',
    config: {
      label: 'MongoDB',
      message: '7.0+',
      messageColor: '#47a248',
      logoSvg: 'mongodb',
      style: 'flat'
    }
  },
  {
    id: 'redis',
    name: 'Redis',
    description: 'Uses Redis cache',
    category: 'Database',
    config: {
      label: 'Redis',
      message: 'Cache',
      messageColor: '#dc382d',
      logoSvg: 'redis',
      style: 'flat'
    }
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    description: 'Uses SQLite database',
    category: 'Database',
    config: {
      label: 'SQLite',
      message: '3.0+',
      messageColor: '#003b57',
      logoSvg: 'sqlite',
      style: 'flat'
    }
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    description: 'Uses Elasticsearch',
    category: 'Database',
    config: {
      label: 'Elasticsearch',
      message: '8.0+',
      messageColor: '#005571',
      logoSvg: 'elasticsearch',
      style: 'flat'
    }
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: 'Uses Firebase',
    category: 'Database',
    config: {
      label: 'Firebase',
      message: 'BaaS',
      messageColor: '#ffca28',
      logoSvg: 'firebase',
      style: 'flat'
    }
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Uses Supabase',
    category: 'Database',
    config: {
      label: 'Supabase',
      message: 'BaaS',
      messageColor: '#3ecf8e',
      logoSvg: 'supabase',
      style: 'flat'
    }
  },
  {
    id: 'planetscale',
    name: 'PlanetScale',
    description: 'Uses PlanetScale',
    category: 'Database',
    config: {
      label: 'PlanetScale',
      message: 'MySQL',
      messageColor: '#000000',
      logoSvg: 'planetscale',
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
  // Downloads & Statistics
  {
    id: 'total-downloads',
    name: 'Total Downloads',
    description: 'Total number of downloads',
    category: 'Stats',
    config: {
      label: 'downloads',
      message: '1M+',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },
  {
    id: 'downloads-weekly',
    name: 'Weekly Downloads',
    description: 'Weekly download count',
    category: 'Stats',
    config: {
      label: 'downloads',
      message: '50K/week',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },
  {
    id: 'downloads-monthly',
    name: 'Monthly Downloads',
    description: 'Monthly download count',
    category: 'Stats',
    config: {
      label: 'downloads',
      message: '200K/month',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },
  
  {
    id: 'lines-of-code',
    name: 'Lines of Code',
    description: 'Total lines of code',
    category: 'Stats',
    config: {
      label: 'lines of code',
      message: '10K+',
      messageColor: '#blue',
      style: 'flat'
    }
  },
  
  // Mobile Development
  {
    id: 'react-native',
    name: 'React Native',
    description: 'Built with React Native',
    category: 'Mobile',
    config: {
      label: 'React Native',
      message: 'iOS & Android',
      messageColor: '#61dafb',
      logoSvg: 'react',
      style: 'flat'
    }
  },
  {
    id: 'flutter',
    name: 'Flutter',
    description: 'Built with Flutter',
    category: 'Mobile',
    config: {
      label: 'Flutter',
      message: 'cross-platform',
      messageColor: '#02569b',
      logoSvg: 'flutter',
      style: 'flat'
    }
  },
  {
    id: 'ios',
    name: 'iOS App',
    description: 'Available on iOS',
    category: 'Mobile',
    config: {
      label: 'iOS',
      message: 'App Store',
      messageColor: '#000000',
      logoSvg: 'apple',
      style: 'flat'
    }
  },
  {
    id: 'android',
    name: 'Android App',
    description: 'Available on Android',
    category: 'Mobile',
    config: {
      label: 'Android',
      message: 'Play Store',
      messageColor: '#3ddc84',
      logoSvg: 'android',
      style: 'flat'
    }
  },
  {
    id: 'xamarin',
    name: 'Xamarin',
    description: 'Built with Xamarin',
    category: 'Mobile',
    config: {
      label: 'Xamarin',
      message: 'cross-platform',
      messageColor: '#3498db',
      logoSvg: 'xamarin',
      style: 'flat'
    }
  },
  {
    id: 'ionic',
    name: 'Ionic',
    description: 'Built with Ionic',
    category: 'Mobile',
    config: {
      label: 'Ionic',
      message: 'hybrid app',
      messageColor: '#3880ff',
      logoSvg: 'ionic',
      style: 'flat'
    }
  },

  // API & Integration
  {
    id: 'api-rest',
    name: 'REST API',
    description: 'RESTful API available',
    category: 'API',
    config: {
      label: 'API',
      message: 'REST',
      messageColor: '#009688',
      style: 'flat'
    }
  },
  {
    id: 'api-graphql',
    name: 'GraphQL API',
    description: 'GraphQL API available',
    category: 'API',
    config: {
      label: 'API',
      message: 'GraphQL',
      messageColor: '#e10098',
      logoSvg: 'graphql',
      style: 'flat'
    }
  },
  {
    id: 'openapi',
    name: 'OpenAPI Spec',
    description: 'OpenAPI specification available',
    category: 'API',
    config: {
      label: 'OpenAPI',
      message: 'spec',
      messageColor: '#6ba539',
      logoSvg: 'openapiinitiative',
      style: 'flat'
    }
  },
  {
    id: 'swagger',
    name: 'Swagger Docs',
    description: 'Swagger documentation',
    category: 'API',
    config: {
      label: 'Swagger',
      message: 'docs',
      messageColor: '#85ea2d',
      logoSvg: 'swagger',
      style: 'flat'
    }
  },
  {
    id: 'postman',
    name: 'Postman Collection',
    description: 'Postman collection available',
    category: 'API',
    config: {
      label: 'Postman',
      message: 'collection',
      messageColor: '#ff6c37',
      logoSvg: 'postman',
      style: 'flat'
    }
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    description: 'Webhook support available',
    category: 'API',
    config: {
      label: 'webhooks',
      message: 'supported',
      messageColor: '#4f46e5',
      style: 'flat'
    }
  },

  // Performance & Monitoring
  {
    id: 'uptime',
    name: 'Uptime',
    description: 'Service uptime percentage',
    category: 'Performance',
    config: {
      label: 'uptime',
      message: '99.9%',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'response-time',
    name: 'Response Time',
    description: 'Average response time',
    category: 'Performance',
    config: {
      label: 'response time',
      message: '<100ms',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse Score',
    description: 'Lighthouse performance score',
    category: 'Performance',
    config: {
      label: 'Lighthouse',
      message: '100/100',
      messageColor: '#ff5722',
      logoSvg: 'lighthouse',
      style: 'flat'
    }
  },
  {
    id: 'gtmetrix',
    name: 'GTmetrix Grade',
    description: 'GTmetrix performance grade',
    category: 'Performance',
    config: {
      label: 'GTmetrix',
      message: 'A',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'pagespeed',
    name: 'PageSpeed',
    description: 'Google PageSpeed score',
    category: 'Performance',
    config: {
      label: 'PageSpeed',
      message: '95/100',
      messageColor: '#4285f4',
      logoSvg: 'googlepagespeedinsights',
      style: 'flat'
    }
  },

  // Custom Status & Labels
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
  },
  {
    id: 'custom-info',
    name: 'Info',
    description: 'Generic info badge',
    category: 'Custom',
    config: {
      label: 'info',
      message: 'available',
      messageColor: '#007ec6',
      style: 'flat'
    }
  },
  {
    id: 'made-with-love',
    name: 'Made with Love',
    description: 'Made with love badge',
    category: 'Custom',
    config: {
      label: 'made with',
      message: '❤️',
      messageColor: '#e25555',
      style: 'flat'
    }
  },
  {
    id: 'powered-by-coffee',
    name: 'Powered by Coffee',
    description: 'Powered by coffee badge',
    category: 'Custom',
    config: {
      label: 'powered by',
      message: '☕',
      messageColor: '#6f4e37',
      style: 'flat'
    }
  },
  {
    id: 'ask-me-anything',
    name: 'Ask Me Anything',
    description: 'AMA badge for maintainers',
    category: 'Custom',
    config: {
      label: 'Ask me',
      message: 'anything',
      messageColor: '#1abc9c',
      style: 'flat'
    }
  },
  {
    id: 'contributions-welcome',
    name: 'Contributions Welcome',
    description: 'Welcome contributions badge',
    category: 'Custom',
    config: {
      label: 'contributions',
      message: 'welcome',
      messageColor: '#4c1',
      style: 'flat'
    }
  },
  {
    id: 'first-timers-only',
    name: 'First Timers Only',
    description: 'First-time contributors welcome',
    category: 'Custom',
    config: {
      label: 'first-timers',
      message: 'friendly',
      messageColor: '#7057ff',
      style: 'flat'
    }
  },
  {
    id: 'hacktoberfest',
    name: 'Hacktoberfest',
    description: 'Hacktoberfest participating project',
    category: 'Custom',
    config: {
      label: 'Hacktoberfest',
      message: '2024',
      messageColor: '#ff8ae2',
      style: 'flat'
    }
  },
  {
    id: 'good-first-issue',
    name: 'Good First Issue',
    description: 'Has good first issues',
    category: 'Custom',
    config: {
      label: 'good first',
      message: 'issue',
      messageColor: '#7057ff',
      style: 'flat'
    }
  },
  {
    id: 'help-wanted',
    name: 'Help Wanted',
    description: 'Looking for help',
    category: 'Custom',
    config: {
      label: 'help',
      message: 'wanted',
      messageColor: '#008672',
      style: 'flat'
    }
  },
  {
    id: 'sponsor',
    name: 'Sponsor',
    description: 'Sponsor this project',
    category: 'Custom',
    config: {
      label: '❤️',
      message: 'sponsor',
      messageColor: '#ea4aaa',
      style: 'flat'
    }
  },
  {
    id: 'buy-me-coffee',
    name: 'Buy Me a Coffee',
    description: 'Support via Buy Me a Coffee',
    category: 'Custom',
    config: {
      label: 'Buy Me a Coffee',
      message: '☕',
      messageColor: '#ffdd00',
      logoSvg: 'buymeacoffee',
      style: 'flat'
    }
  },
  {
    id: 'patreon',
    name: 'Support on Patreon',
    description: 'Support via Patreon',
    category: 'Custom',
    config: {
      label: 'Patreon',
      message: 'support',
      messageColor: '#f96854',
      logoSvg: 'patreon',
      style: 'flat'
    }
  },
  {
    id: 'ko-fi',
    name: 'Support on Ko-fi',
    description: 'Support via Ko-fi',
    category: 'Custom',
    config: {
      label: 'Ko-fi',
      message: 'support',
      messageColor: '#ff5e5b',
      logoSvg: 'kofi',
      style: 'flat'
    }
  },

  // AI & Machine Learning
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    description: 'Built with TensorFlow',
    category: 'AI/ML',
    config: {
      label: 'TensorFlow',
      message: '2.0+',
      messageColor: '#ff6f00',
      logoSvg: 'tensorflow',
      style: 'flat'
    }
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    description: 'Built with PyTorch',
    category: 'AI/ML',
    config: {
      label: 'PyTorch',
      message: '2.0+',
      messageColor: '#ee4c2c',
      logoSvg: 'pytorch',
      style: 'flat'
    }
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Powered by OpenAI',
    category: 'AI/ML',
    config: {
      label: 'OpenAI',
      message: 'GPT-4',
      messageColor: '#412991',
      logoSvg: 'openai',
      style: 'flat'
    }
  },
  {
    id: 'jupyter',
    name: 'Jupyter Notebook',
    description: 'Data analysis with Jupyter',
    category: 'AI/ML',
    config: {
      label: 'Jupyter',
      message: 'notebook',
      messageColor: '#f37626',
      logoSvg: 'jupyter',
      style: 'flat'
    }
  },
  {
    id: 'pandas',
    name: 'Pandas',
    description: 'Data manipulation with Pandas',
    category: 'AI/ML',
    config: {
      label: 'Pandas',
      message: 'dataframes',
      messageColor: '#150458',
      logoSvg: 'pandas',
      style: 'flat'
    }
  },

  // Blockchain & Web3
  {
    id: 'ethereum',
    name: 'Ethereum',
    description: 'Built on Ethereum',
    category: 'Blockchain',
    config: {
      label: 'Ethereum',
      message: 'dApp',
      messageColor: '#3c3c3d',
      logoSvg: 'ethereum',
      style: 'flat'
    }
  },
  {
    id: 'solidity',
    name: 'Solidity',
    description: 'Smart contracts in Solidity',
    category: 'Blockchain',
    config: {
      label: 'Solidity',
      message: 'smart contracts',
      messageColor: '#363636',
      logoSvg: 'solidity',
      style: 'flat'
    }
  },
  {
    id: 'web3js',
    name: 'Web3.js',
    description: 'Web3.js integration',
    category: 'Blockchain',
    config: {
      label: 'Web3.js',
      message: 'enabled',
      messageColor: '#f16822',
      logoSvg: 'web3dotjs',
      style: 'flat'
    }
  },

  // Gaming & Entertainment
  {
    id: 'unity',
    name: 'Unity',
    description: 'Built with Unity',
    category: 'Gaming',
    config: {
      label: 'Unity',
      message: '2023.1+',
      messageColor: '#000000',
      logoSvg: 'unity',
      style: 'flat'
    }
  },
  {
    id: 'unreal-engine',
    name: 'Unreal Engine',
    description: 'Built with Unreal Engine',
    category: 'Gaming',
    config: {
      label: 'Unreal',
      message: 'Engine 5',
      messageColor: '#0e1128',
      logoSvg: 'unrealengine',
      style: 'flat'
    }
  },
  {
    id: 'steam',
    name: 'Steam',
    description: 'Available on Steam',
    category: 'Gaming',
    config: {
      label: 'Steam',
      message: 'available',
      messageColor: '#000000',
      logoSvg: 'steam',
      style: 'flat'
    }
  },

  // DevTools & Productivity
  {
    id: 'vscode',
    name: 'VS Code',
    description: 'Developed with VS Code',
    category: 'DevTools',
    config: {
      label: 'VS Code',
      message: 'extension',
      messageColor: '#007acc',
      logoSvg: 'visualstudiocode',
      style: 'flat'
    }
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Designed with Figma',
    category: 'DevTools',
    config: {
      label: 'Figma',
      message: 'design',
      messageColor: '#f24e1e',
      logoSvg: 'figma',
      style: 'flat'
    }
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Documented with Notion',
    category: 'DevTools',
    config: {
      label: 'Notion',
      message: 'docs',
      messageColor: '#000000',
      logoSvg: 'notion',
      style: 'flat'
    }
  },

  // Analytics & Monitoring
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Tracked with Google Analytics',
    category: 'Analytics',
    config: {
      label: 'Analytics',
      message: 'enabled',
      messageColor: '#e37400',
      logoSvg: 'googleanalytics',
      style: 'flat'
    }
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Error monitoring with Sentry',
    category: 'Analytics',
    config: {
      label: 'Sentry',
      message: 'monitoring',
      messageColor: '#362d59',
      logoSvg: 'sentry',
      style: 'flat'
    }
  },

  // Documentation
  {
    id: 'gitbook',
    name: 'GitBook',
    description: 'Documentation with GitBook',
    category: 'Documentation',
    config: {
      label: 'GitBook',
      message: 'docs',
      messageColor: '#3884ff',
      logoSvg: 'gitbook',
      style: 'flat'
    }
  },
  {
    id: 'markdown',
    name: 'Markdown',
    description: 'Written in Markdown',
    category: 'Documentation',
    config: {
      label: 'Markdown',
      message: 'docs',
      messageColor: '#000000',
      logoSvg: 'markdown',
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