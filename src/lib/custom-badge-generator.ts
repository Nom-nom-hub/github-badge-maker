import { BadgeConfig } from './types';

export interface CustomBadgeConfig extends BadgeConfig {
  // Custom styling options
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  
  // Advanced styling
  gradient?: {
    enabled: boolean;
    direction?: 'horizontal' | 'vertical' | 'diagonal';
    colors?: [string, string];
  };
  shadow?: {
    enabled: boolean;
    blur?: number;
    offsetX?: number;
    offsetY?: number;
    color?: string;
  };
  
  // Animations
  animation?: {
    type?: 'none' | 'pulse' | 'glow' | 'shake' | 'bounce';
    duration?: number;
  };
  
  // Custom dimensions
  height?: number;
  padding?: {
    horizontal: number;
    vertical: number;
  };
}

export interface CustomBadgeTheme {
  id: string;
  name: string;
  description: string;
  config: Partial<CustomBadgeConfig>;
}

// Predefined custom themes
export const CUSTOM_BADGE_THEMES: CustomBadgeTheme[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with subtle shadows',
    config: {
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 'medium',
      shadow: {
        enabled: true,
        blur: 4,
        offsetX: 0,
        offsetY: 2,
        color: 'rgba(0, 0, 0, 0.1)'
      },
      padding: { horizontal: 12, vertical: 6 }
    }
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Eye-catching gradient backgrounds',
    config: {
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 'semibold',
      gradient: {
        enabled: true,
        direction: 'horizontal',
        colors: ['#667eea', '#764ba2']
      },
      padding: { horizontal: 10, vertical: 5 }
    }
  },
  {
    id: 'glassmorphism',
    name: 'Glass',
    description: 'Glass morphism effect with backdrop blur',
    config: {
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 'medium',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      shadow: {
        enabled: true,
        blur: 20,
        offsetX: 0,
        offsetY: 8,
        color: 'rgba(0, 0, 0, 0.1)'
      },
      padding: { horizontal: 14, vertical: 7 }
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Glowing neon effect with animations',
    config: {
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      animation: {
        type: 'glow',
        duration: 2
      },
      shadow: {
        enabled: true,
        blur: 10,
        offsetX: 0,
        offsetY: 0,
        color: '#00ff88'
      },
      padding: { horizontal: 12, vertical: 6 }
    }
  },
  {
    id: 'retro',
    name: 'Retro',
    description: 'Vintage pixelated design',
    config: {
      borderRadius: 0,
      fontSize: 10,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      textTransform: 'uppercase',
      borderWidth: 2,
      borderColor: '#000',
      padding: { horizontal: 8, vertical: 4 }
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean minimalist design',
    config: {
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 'medium',
      borderWidth: 1,
      borderColor: '#e5e7eb',
      padding: { horizontal: 16, vertical: 6 }
    }
  }
];

class CustomBadgeGenerator {
  
  /**
   * Generate a custom SVG badge
   */
  generateCustomBadge(config: CustomBadgeConfig): string {
    const {
      label,
      message,
      labelColor = '#555555',
      messageColor = '#007ec6',
      borderRadius = 4,
      borderWidth = 0,
      borderColor = 'transparent',
      fontSize = 11,
      fontFamily = 'Verdana, Geneva, DejaVu Sans, sans-serif',
      fontWeight = 'normal',
      textTransform = 'none',
      height = 20,
      padding = { horizontal: 10, vertical: 4 },
      gradient,
      shadow,
      animation
    } = config;

    // Calculate text widths (approximate)
    const labelWidth = this.calculateTextWidth(label, fontSize);
    const messageWidth = this.calculateTextWidth(message, fontSize);
    
    // Calculate badge dimensions
    const labelBoxWidth = labelWidth + (padding.horizontal * 2);
    const messageBoxWidth = messageWidth + (padding.horizontal * 2);
    const totalWidth = labelBoxWidth + messageBoxWidth;
    const badgeHeight = height;

    // Generate unique IDs for gradients and filters
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
    const shadowId = `shadow-${Math.random().toString(36).substr(2, 9)}`;

    // Start building SVG
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${badgeHeight}" viewBox="0 0 ${totalWidth} ${badgeHeight}">`;
    
    // Add definitions for gradients, shadows, and animations
    svg += '<defs>';
    
    // Gradient definitions
    if (gradient?.enabled && gradient.colors) {
      const [color1, color2] = gradient.colors;
      const direction = gradient.direction || 'horizontal';
      
      const x1 = '0%', y1 = '0%';
      let x2 = '100%', y2 = '0%';
      if (direction === 'vertical') {
        x2 = '0%'; y2 = '100%';
      } else if (direction === 'diagonal') {
        x2 = '100%'; y2 = '100%';
      }
      
      svg += `
        <linearGradient id="${gradientId}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
      `;
    }
    
    // Shadow filter
    if (shadow?.enabled) {
      svg += `
        <filter id="${shadowId}" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="${shadow.offsetX || 0}" dy="${shadow.offsetY || 2}" 
                       stdDeviation="${(shadow.blur || 4) / 2}" 
                       flood-color="${shadow.color || 'rgba(0,0,0,0.1)'}" />
        </filter>
      `;
    }
    
    // Animation styles
    if (animation?.type && animation.type !== 'none') {
      svg += this.generateAnimationCSS(animation.type, animation.duration || 2);
    }
    
    svg += '</defs>';

    // Background rect (full badge)
    const bgFill = gradient?.enabled ? `url(#${gradientId})` : messageColor;
    svg += `
      <rect width="${totalWidth}" height="${badgeHeight}" 
            rx="${borderRadius}" ry="${borderRadius}" 
            fill="${bgFill}"
            stroke="${borderColor}" stroke-width="${borderWidth}"
            ${shadow?.enabled ? `filter="url(#${shadowId})"` : ''}
            ${animation?.type && animation.type !== 'none' ? `class="animated-${animation.type}"` : ''} />
    `;

    // Label background
    svg += `
      <rect width="${labelBoxWidth}" height="${badgeHeight}" 
            rx="${borderRadius}" ry="${borderRadius}" 
            fill="${labelColor}" />
    `;

    // Text styles
    const textStyle = `
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      text-transform: ${textTransform};
      text-anchor: middle;
      dominant-baseline: central;
      fill: white;
    `;

    // Label text
    svg += `
      <text x="${labelBoxWidth / 2}" y="${badgeHeight / 2}" style="${textStyle}">
        ${this.escapeXml(label)}
      </text>
    `;

    // Message text
    svg += `
      <text x="${labelBoxWidth + (messageBoxWidth / 2)}" y="${badgeHeight / 2}" style="${textStyle}">
        ${this.escapeXml(message)}
      </text>
    `;

    svg += '</svg>';

    return svg;
  }

  /**
   * Generate animation CSS for SVG
   */
  private generateAnimationCSS(type: string, duration: number): string {
    let keyframes = '';
    let animationClass = '';

    switch (type) {
      case 'pulse':
        keyframes = `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `;
        animationClass = `animation: pulse ${duration}s ease-in-out infinite;`;
        break;
        
      case 'glow':
        keyframes = `
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
            50% { filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 30px currentColor); }
          }
        `;
        animationClass = `animation: glow ${duration}s ease-in-out infinite;`;
        break;
        
      case 'shake':
        keyframes = `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
          }
        `;
        animationClass = `animation: shake ${duration}s ease-in-out infinite;`;
        break;
        
      case 'bounce':
        keyframes = `
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
        `;
        animationClass = `animation: bounce ${duration}s ease-in-out infinite;`;
        break;
    }

    return `
      <style>
        ${keyframes}
        .animated-${type} { ${animationClass} }
      </style>
    `;
  }

  /**
   * Approximate text width calculation
   */
  private calculateTextWidth(text: string, fontSize: number): number {
    // Rough approximation: most characters are about 0.6 * fontSize wide
    return text.length * fontSize * 0.6;
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Convert SVG to data URL for use in img tags
   */
  generateDataUrl(config: CustomBadgeConfig): string {
    const svg = this.generateCustomBadge(config);
    const encodedSvg = encodeURIComponent(svg);
    return `data:image/svg+xml,${encodedSvg}`;
  }

  /**
   * Get available themes
   */
  getThemes(): CustomBadgeTheme[] {
    return CUSTOM_BADGE_THEMES;
  }

  /**
   * Apply theme to config
   */
  applyTheme(config: CustomBadgeConfig, themeId: string): CustomBadgeConfig {
    const theme = CUSTOM_BADGE_THEMES.find(t => t.id === themeId);
    if (!theme) return config;

    return {
      ...config,
      ...theme.config
    };
  }
}

export const customBadgeGenerator = new CustomBadgeGenerator();