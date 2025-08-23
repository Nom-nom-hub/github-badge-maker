import { BadgeConfig } from './types';

export interface ProjectConfig {
  id: string;
  name: string;
  description?: string;
  repository?: string;
  language?: string;
  framework?: string;
  badges: BadgeConfig[];
  outputFormat: 'markdown' | 'html' | 'json';
  includeReadme?: boolean;
  readmeTemplate?: string;
}

export interface BatchResult {
  project: ProjectConfig;
  output: string;
  success: boolean;
  error?: string;
}

export interface BatchExportOptions {
  format: 'zip' | 'individual';
  includeIndex?: boolean;
  customization?: {
    headerTemplate?: string;
    footerTemplate?: string;
    styling?: 'basic' | 'enhanced' | 'custom';
  };
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  defaultConfig: Partial<ProjectConfig>;
  suggestedBadges: string[];
  collectionIds?: string[];
}

class BatchBadgeGenerator {
  private projects: Map<string, ProjectConfig> = new Map();

  /**
   * Add a new project to the batch
   */
  addProject(project: ProjectConfig): void {
    this.projects.set(project.id, project);
  }

  /**
   * Remove a project from the batch
   */
  removeProject(projectId: string): boolean {
    return this.projects.delete(projectId);
  }

  /**
   * Update an existing project
   */
  updateProject(projectId: string, updates: Partial<ProjectConfig>): boolean {
    const project = this.projects.get(projectId);
    if (!project) return false;

    this.projects.set(projectId, { ...project, ...updates });
    return true;
  }

  /**
   * Get all projects in the batch
   */
  getProjects(): ProjectConfig[] {
    return Array.from(this.projects.values());
  }

  /**
   * Get a specific project by ID
   */
  getProject(projectId: string): ProjectConfig | undefined {
    return this.projects.get(projectId);
  }

  /**
   * Clear all projects
   */
  clearProjects(): void {
    this.projects.clear();
  }

  /**
   * Generate badges for all projects
   */
  async generateBatch(): Promise<BatchResult[]> {
    const results: BatchResult[] = [];

    for (const project of this.projects.values()) {
      try {
        const output = await this.generateProjectOutput(project);
        results.push({
          project,
          output,
          success: true
        });
      } catch (error) {
        results.push({
          project,
          output: '',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Generate output for a single project
   */
  private async generateProjectOutput(project: ProjectConfig): Promise<string> {
    switch (project.outputFormat) {
      case 'markdown':
        return this.generateMarkdownOutput(project);
      case 'html':
        return this.generateHtmlOutput(project);
      case 'json':
        return this.generateJsonOutput(project);
      default:
        throw new Error(`Unsupported output format: ${project.outputFormat}`);
    }
  }

  /**
   * Generate Markdown output for a project
   */
  private generateMarkdownOutput(project: ProjectConfig): string {
    let markdown = '';

    // Header
    if (project.includeReadme) {
      markdown += `# ${project.name}\n\n`;
      
      if (project.description) {
        markdown += `${project.description}\n\n`;
      }

      // Badges section
      markdown += '## Badges\n\n';
    }

    // Generate badge markdown
    const badgeLines: string[] = [];
    project.badges.forEach(badge => {
      const url = this.generateBadgeUrl(badge);
      let badgeMd = `![${badge.label}](${url})`;
      
      // Add link if repository is provided
      if (project.repository) {
        badgeMd = `[![${badge.label}](${url})](${project.repository})`;
      }
      
      badgeLines.push(badgeMd);
    });

    markdown += badgeLines.join(' ');

    if (project.includeReadme) {
      markdown += '\n\n';
      
      // Add basic README template
      if (project.readmeTemplate) {
        markdown += project.readmeTemplate;
      } else {
        markdown += this.generateBasicReadmeTemplate(project);
      }
    }

    return markdown;
  }

  /**
   * Generate HTML output for a project
   */
  private generateHtmlOutput(project: ProjectConfig): string {
    let html = '';

    if (project.includeReadme) {
      html += `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .badges { margin: 20px 0; }
        .badges img { margin-right: 5px; margin-bottom: 5px; }
        .project-header { border-bottom: 2px solid #eee; padding-bottom: 10px; }
    </style>
</head>
<body>
    <div class="project-header">
        <h1>${project.name}</h1>
        ${project.description ? `<p>${project.description}</p>` : ''}
    </div>
    <div class="badges">
        <h2>Badges</h2>
`;
    }

    // Generate badge HTML
    project.badges.forEach(badge => {
      const url = this.generateBadgeUrl(badge);
      let badgeHtml = `<img src="${url}" alt="${badge.label}">`;
      
      if (project.repository) {
        badgeHtml = `<a href="${project.repository}">${badgeHtml}</a>`;
      }
      
      html += `        ${badgeHtml}\n`;
    });

    if (project.includeReadme) {
      html += `    </div>
    <div class="content">
        ${project.readmeTemplate ? 
          project.readmeTemplate.replace(/\n/g, '<br>') : 
          this.generateBasicReadmeTemplate(project).replace(/\n/g, '<br>')
        }
    </div>
</body>
</html>`;
    } else {
      html += '    </div>';
    }

    return html;
  }

  /**
   * Generate JSON output for a project
   */
  private generateJsonOutput(project: ProjectConfig): string {
    const output = {
      project: {
        name: project.name,
        description: project.description,
        repository: project.repository,
        language: project.language,
        framework: project.framework
      },
      badges: project.badges.map(badge => ({
        ...badge,
        url: this.generateBadgeUrl(badge)
      })),
      generatedAt: new Date().toISOString(),
      format: 'json'
    };

    return JSON.stringify(output, null, 2);
  }

  /**
   * Generate a badge URL from badge config
   */
  private generateBadgeUrl(badge: BadgeConfig): string {
    const baseUrl = 'https://img.shields.io/badge';
    const encodedLabel = encodeURIComponent(badge.label).replace(/-/g, '--');
    const encodedMessage = encodeURIComponent(badge.message).replace(/-/g, '--');
    
    const color = badge.messageColor.replace('#', '') || 'blue';
    let url = `${baseUrl}/${encodedLabel}-${encodedMessage}-${color}`;
    
    if (badge.style && badge.style !== 'flat') {
      url += `?style=${badge.style}`;
    }
    
    if (badge.labelColor && badge.labelColor !== '#555') {
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}labelColor=${badge.labelColor.replace('#', '')}`;
    }

    return url;
  }

  /**
   * Generate a basic README template
   */
  private generateBasicReadmeTemplate(project: ProjectConfig): string {
    return `
# ${project.name}

${project.description ? `${project.description}\n\n` : ''}
## Installation

\`\`\`bash
# Installation instructions here
\`\`\`

## Usage

\`\`\`bash
# Usage examples here
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

${project.language ? `## Technology Stack\n\n- **Language**: ${project.language}\n` : ''}${project.framework ? `- **Framework**: ${project.framework}\n\n` : ''}
## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [License Name] - see the LICENSE file for details.
`.trim();
  }

  /**
   * Import projects from CSV data
   */
  importFromCsv(csvData: string): { success: number; errors: string[] } {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    let success = 0;
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(',').map(v => v.trim());
        const projectData: Record<string, string> = {};
        
        headers.forEach((header, index) => {
          projectData[header] = values[index] || '';
        });

        const project: ProjectConfig = {
          id: projectData.id || `project-${Date.now()}-${i}`,
          name: projectData.name || `Project ${i}`,
          description: projectData.description,
          repository: projectData.repository,
          language: projectData.language,
          framework: projectData.framework,
          badges: this.parseBadgesFromCsv(projectData.badges || ''),
          outputFormat: (projectData.outputformat as 'markdown' | 'html' | 'json') || 'markdown',
          includeReadme: projectData.includereadme === 'true'
        };

        this.addProject(project);
        success++;
      } catch (error) {
        errors.push(`Line ${i + 1}: ${error instanceof Error ? error.message : 'Parse error'}`);
      }
    }

    return { success, errors };
  }

  /**
   * Parse badges from CSV badge string
   */
  private parseBadgesFromCsv(badgeString: string): BadgeConfig[] {
    if (!badgeString) return [];

    try {
      // Expect format: "label1:message1:color1;label2:message2:color2"
      return badgeString.split(';').map(badgeStr => {
        const [label, message, color] = badgeStr.split(':');
        return {
          style: 'flat' as const,
          label: label || 'Badge',
          message: message || 'Value',
          messageColor: color || '#007ec6',
          labelColor: '#555'
        };
      });
    } catch {
      return [];
    }
  }

  /**
   * Export to ZIP file (returns blob)
   */
  async exportToZip(results: BatchResult[]): Promise<Blob> {
    // This would typically use a library like JSZip
    // For now, we'll create a simple implementation
    const files: { [key: string]: string } = {};

    results.forEach(result => {
      if (result.success) {
        const extension = result.project.outputFormat === 'markdown' ? 'md' : 
                         result.project.outputFormat === 'html' ? 'html' : 'json';
        const filename = `${result.project.name.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`;
        files[filename] = result.output;
      }
    });

    // Create a simple text representation of the "zip" content
    let zipContent = '# Batch Badge Generation Results\n\n';
    
    Object.entries(files).forEach(([filename, content]) => {
      zipContent += `## File: ${filename}\n\n`;
      zipContent += '```\n';
      zipContent += content;
      zipContent += '\n```\n\n';
    });

    return new Blob([zipContent], { type: 'text/plain' });
  }

  /**
   * Get project statistics
   */
  getStatistics() {
    const projects = this.getProjects();
    
    const languageCount = new Map<string, number>();
    const frameworkCount = new Map<string, number>();
    let totalBadges = 0;

    projects.forEach(project => {
      if (project.language) {
        languageCount.set(project.language, (languageCount.get(project.language) || 0) + 1);
      }
      if (project.framework) {
        frameworkCount.set(project.framework, (frameworkCount.get(project.framework) || 0) + 1);
      }
      totalBadges += project.badges.length;
    });

    return {
      totalProjects: projects.length,
      totalBadges,
      averageBadgesPerProject: projects.length ? totalBadges / projects.length : 0,
      languages: Array.from(languageCount.entries()).sort((a, b) => b[1] - a[1]),
      frameworks: Array.from(frameworkCount.entries()).sort((a, b) => b[1] - a[1])
    };
  }
}

/**
 * Get popular project templates
 */
export function getProjectTemplates(): ProjectTemplate[] {
  return [
    {
      id: 'modern-web-app',
      name: 'Modern Web Application',
      description: 'React/Next.js web application with modern tooling',
      category: 'Frontend',
      icon: '🌐',
      defaultConfig: {
        language: 'TypeScript',
        framework: 'React',
        outputFormat: 'markdown',
        includeReadme: true
      },
      suggestedBadges: ['build-status', 'version', 'license', 'dependencies'],
      collectionIds: ['modern-react-app', 'frontend-essentials']
    },
    {
      id: 'nodejs-api',
      name: 'Node.js API Server',
      description: 'Backend API server built with Node.js',
      category: 'Backend',
      icon: '🔧',
      defaultConfig: {
        language: 'JavaScript',
        framework: 'Express',
        outputFormat: 'markdown',
        includeReadme: true
      },
      suggestedBadges: ['build-status', 'coverage', 'security', 'api-docs'],
      collectionIds: ['api-essentials', 'nodejs-complete']
    },
    {
      id: 'python-ml',
      name: 'Python ML Project',
      description: 'Machine learning project with Python',
      category: 'Data Science',
      icon: '🤖',
      defaultConfig: {
        language: 'Python',
        framework: 'TensorFlow',
        outputFormat: 'markdown',
        includeReadme: true
      },
      suggestedBadges: ['python-version', 'jupyter', 'ai-model', 'dataset'],
      collectionIds: ['machine-learning', 'data-science']
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      description: 'Cross-platform mobile application',
      category: 'Mobile',
      icon: '📱',
      defaultConfig: {
        language: 'Dart',
        framework: 'Flutter',
        outputFormat: 'markdown',
        includeReadme: true
      },
      suggestedBadges: ['platform', 'version', 'downloads', 'rating'],
      collectionIds: ['mobile-complete']
    },
    {
      id: 'open-source-lib',
      name: 'Open Source Library',
      description: 'Reusable library or package',
      category: 'Library',
      icon: '📦',
      defaultConfig: {
        outputFormat: 'markdown',
        includeReadme: true
      },
      suggestedBadges: ['npm-version', 'downloads', 'license', 'contributors'],
      collectionIds: ['library-essentials', 'community-driven']
    },
    {
      id: 'devops-project',
      name: 'DevOps Project',
      description: 'Infrastructure and deployment automation',
      category: 'DevOps',
      icon: '⚙️',
      defaultConfig: {
        outputFormat: 'markdown',
        includeReadme: true
      },
      suggestedBadges: ['docker', 'kubernetes', 'ci-cd', 'monitoring'],
      collectionIds: ['devops-complete', 'infrastructure']
    },
    {
      id: 'documentation',
      name: 'Documentation Site',
      description: 'Project documentation or knowledge base',
      category: 'Docs',
      icon: '📚',
      defaultConfig: {
        outputFormat: 'markdown',
        includeReadme: true
      },
      suggestedBadges: ['docs-status', 'last-update', 'contributors', 'license']
    },
    {
      id: 'game-project',
      name: 'Game Project',
      description: 'Video game or interactive entertainment',
      category: 'Gaming',
      icon: '🎮',
      defaultConfig: {
        outputFormat: 'markdown',
        includeReadme: true
      },
      suggestedBadges: ['platform', 'engine', 'version', 'players']
    }
  ];
}

/**
 * Get template by ID
 */
export function getProjectTemplate(templateId: string): ProjectTemplate | undefined {
  return getProjectTemplates().find(template => template.id === templateId);
}

/**
 * Apply template to a project config
 */
export function applyTemplate(template: ProjectTemplate, projectName: string): ProjectConfig {
  return {
    id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: projectName,
    outputFormat: 'markdown' as const,
    ...template.defaultConfig,
    badges: template.suggestedBadges.map(badgeId => ({
      style: 'flat' as const,
      label: badgeId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      message: 'auto',
      messageColor: '#007ec6',
      labelColor: '#555'
    }))
  };
}

export const batchBadgeGenerator = new BatchBadgeGenerator();