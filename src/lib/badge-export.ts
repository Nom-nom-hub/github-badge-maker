import { BadgeConfig } from './types';
import { generateBadgeUrl, generateMarkdown, generateHtml, generateMarkdownWithLink, generateHtmlWithLink } from './badge-utils';

export interface ExportOptions {
  format: 'markdown' | 'html' | 'svg' | 'png' | 'pdf' | 'json' | 'rst' | 'textile' | 'bbcode';
  linkUrl?: string;
  altText?: string;
  size?: 'small' | 'medium' | 'large';
  quality?: number; // For PNG export
  includeMetadata?: boolean;
}

export interface ExportResult {
  content: string;
  filename: string;
  mimeType: string;
  blob?: Blob;
}

class BadgeExportService {
  private canvas: HTMLCanvasElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.canvas = document.createElement('canvas');
    }
  }

  async exportBadge(config: BadgeConfig, options: ExportOptions): Promise<ExportResult> {
    const badgeUrl = generateBadgeUrl(config);
    const timestamp = new Date().toISOString().split('T')[0];
    const basename = `${config.label}-${config.message}`.replace(/[^a-z0-9]/gi, '-').toLowerCase();

    switch (options.format) {
      case 'markdown':
        return this.exportMarkdown(config, options, basename);
      
      case 'html':
        return this.exportHtml(config, options, basename);
      
      case 'svg':
        return this.exportSvg(config, options, basename);
      
      case 'png':
        return await this.exportPng(config, options, basename);
      
      case 'pdf':
        return await this.exportPdf(config, options, basename);
      
      case 'json':
        return this.exportJson(config, options, basename);
      
      case 'rst':
        return this.exportRestructuredText(config, options, basename);
      
      case 'textile':
        return this.exportTextile(config, options, basename);
      
      case 'bbcode':
        return this.exportBBCode(config, options, basename);
      
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  private exportMarkdown(config: BadgeConfig, options: ExportOptions, basename: string): ExportResult {
    const content = options.linkUrl 
      ? generateMarkdownWithLink(config, options.linkUrl, options.altText)
      : generateMarkdown(config, options.altText);
    
    return {
      content,
      filename: `${basename}.md`,
      mimeType: 'text/markdown',
      blob: new Blob([content], { type: 'text/markdown' })
    };
  }

  private exportHtml(config: BadgeConfig, options: ExportOptions, basename: string): ExportResult {
    let content = options.linkUrl 
      ? generateHtmlWithLink(config, options.linkUrl, options.altText)
      : generateHtml(config, options.altText);
    
    // Create a complete HTML document if needed
    if (options.includeMetadata) {
      content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Badge: ${config.label} - ${config.message}</title>
</head>
<body>
  ${content}
</body>
</html>`;
    }
    
    return {
      content,
      filename: `${basename}.html`,
      mimeType: 'text/html',
      blob: new Blob([content], { type: 'text/html' })
    };
  }

  private async exportSvg(config: BadgeConfig, options: ExportOptions, basename: string): Promise<ExportResult> {
    try {
      const badgeUrl = generateBadgeUrl(config);
      const response = await fetch(badgeUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch SVG');
      }
      
      const svgContent = await response.text();
      
      return {
        content: svgContent,
        filename: `${basename}.svg`,
        mimeType: 'image/svg+xml',
        blob: new Blob([svgContent], { type: 'image/svg+xml' })
      };
    } catch (error) {
      throw new Error(`Failed to export SVG: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async exportPng(config: BadgeConfig, options: ExportOptions, basename: string): Promise<ExportResult> {
    if (!this.canvas) {
      throw new Error('Canvas not available');
    }

    try {
      const badgeUrl = generateBadgeUrl(config);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = this.canvas!;
          const ctx = canvas.getContext('2d')!;
          
          // Determine size based on options
          let scale = 1;
          switch (options.size) {
            case 'small':
              scale = 1;
              break;
            case 'medium':
              scale = 2;
              break;
            case 'large':
              scale = 4;
              break;
            default:
              scale = 2;
          }
          
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          
          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // Draw the badge
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to create PNG blob'));
                return;
              }
              
              resolve({
                content: '', // Not applicable for binary format
                filename: `${basename}.png`,
                mimeType: 'image/png',
                blob
              });
            },
            'image/png',
            options.quality || 0.9
          );
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load badge image for PNG export'));
        };
        
        img.src = badgeUrl;
      });
    } catch (error) {
      throw new Error(`Failed to export PNG: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async exportPdf(config: BadgeConfig, options: ExportOptions, basename: string): Promise<ExportResult> {
    try {
      // For PDF export, we'll create a simple PDF with the badge
      // This is a simplified implementation - in production you might want to use a library like jsPDF
      const badgeUrl = generateBadgeUrl(config);
      
      // Create a simple HTML page for PDF conversion
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Badge: ${config.label} - ${config.message}</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .badge-container {
      text-align: center;
      padding: 40px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .badge {
      margin: 20px 0;
    }
    .metadata {
      margin-top: 20px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="badge-container">
    <h1>Badge Export</h1>
    <div class="badge">
      <img src="${badgeUrl}" alt="${config.label}: ${config.message}" />
    </div>
    <div class="metadata">
      <p><strong>Label:</strong> ${config.label}</p>
      <p><strong>Message:</strong> ${config.message}</p>
      <p><strong>Style:</strong> ${config.style}</p>
      <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>`;
      
      return {
        content: htmlContent,
        filename: `${basename}.html`,
        mimeType: 'text/html',
        blob: new Blob([htmlContent], { type: 'text/html' })
      };
    } catch (error) {
      throw new Error(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private exportJson(config: BadgeConfig, options: ExportOptions, basename: string): ExportResult {
    const jsonData = {
      badge: {
        label: config.label,
        message: config.message,
        labelColor: config.labelColor,
        messageColor: config.messageColor,
        style: config.style,
        logoSvg: config.logoSvg,
        logoColor: config.logoColor,
        logoWidth: config.logoWidth
      },
      metadata: {
        exportedAt: new Date().toISOString(),
        format: 'json',
        url: generateBadgeUrl(config),
        ...(options.linkUrl && { linkUrl: options.linkUrl }),
        ...(options.altText && { altText: options.altText })
      }
    };
    
    const content = JSON.stringify(jsonData, null, 2);
    
    return {
      content,
      filename: `${basename}.json`,
      mimeType: 'application/json',
      blob: new Blob([content], { type: 'application/json' })
    };
  }

  private exportRestructuredText(config: BadgeConfig, options: ExportOptions, basename: string): ExportResult {
    const badgeUrl = generateBadgeUrl(config);
    const altText = options.altText || `${config.label}: ${config.message}`;
    
    let content: string;
    if (options.linkUrl) {
      content = `.. image:: ${badgeUrl}
   :alt: ${altText}
   :target: ${options.linkUrl}`;
    } else {
      content = `.. image:: ${badgeUrl}
   :alt: ${altText}`;
    }
    
    return {
      content,
      filename: `${basename}.rst`,
      mimeType: 'text/x-rst',
      blob: new Blob([content], { type: 'text/plain' })
    };
  }

  private exportTextile(config: BadgeConfig, options: ExportOptions, basename: string): ExportResult {
    const badgeUrl = generateBadgeUrl(config);
    const altText = options.altText || `${config.label}: ${config.message}`;
    
    let content: string;
    if (options.linkUrl) {
      content = `"!${badgeUrl}(${altText})!":${options.linkUrl}`;
    } else {
      content = `!${badgeUrl}(${altText})!`;
    }
    
    return {
      content,
      filename: `${basename}.textile`,
      mimeType: 'text/plain',
      blob: new Blob([content], { type: 'text/plain' })
    };
  }

  private exportBBCode(config: BadgeConfig, options: ExportOptions, basename: string): ExportResult {
    const badgeUrl = generateBadgeUrl(config);
    
    let content: string;
    if (options.linkUrl) {
      content = `[url=${options.linkUrl}][img]${badgeUrl}[/img][/url]`;
    } else {
      content = `[img]${badgeUrl}[/img]`;
    }
    
    return {
      content,
      filename: `${basename}.bb`,
      mimeType: 'text/plain',
      blob: new Blob([content], { type: 'text/plain' })
    };
  }

  downloadFile(result: ExportResult): void {
    if (!result.blob) {
      throw new Error('No blob available for download');
    }

    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  copyToClipboard(content: string): Promise<void> {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve();
    }

    return navigator.clipboard.writeText(content);
  }

  getAvailableFormats(): Array<{ id: string; label: string; description: string; category: string }> {
    return [
      {
        id: 'markdown',
        label: 'Markdown',
        description: 'For README files and documentation',
        category: 'Code'
      },
      {
        id: 'html',
        label: 'HTML',
        description: 'For web pages and HTML documents',
        category: 'Code'
      },
      {
        id: 'svg',
        label: 'SVG',
        description: 'Vector format, scalable',
        category: 'Image'
      },
      {
        id: 'png',
        label: 'PNG',
        description: 'Raster image, high quality',
        category: 'Image'
      },
      {
        id: 'json',
        label: 'JSON',
        description: 'Configuration data',
        category: 'Data'
      },
      {
        id: 'rst',
        label: 'reStructuredText',
        description: 'For Sphinx documentation',
        category: 'Code'
      },
      {
        id: 'textile',
        label: 'Textile',
        description: 'Textile markup language',
        category: 'Code'
      },
      {
        id: 'bbcode',
        label: 'BBCode',
        description: 'For forums and bulletin boards',
        category: 'Code'
      }
    ];
  }
}

// Export singleton instance
export const badgeExport = new BadgeExportService();