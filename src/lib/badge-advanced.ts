import { BadgeConfig } from './types';

export interface AdvancedBadgeConfig extends BadgeConfig {
  // Animation options
  animation?: 'none' | 'pulse' | 'bounce' | 'fade' | 'slide' | 'glow';
  animationDuration?: number; // in seconds
  animationDelay?: number; // in seconds
  
  // Gradient options
  useGradient?: boolean;
  gradientDirection?: 'horizontal' | 'vertical' | 'diagonal' | 'radial';
  gradientColors?: [string, string]; // [start, end]
  
  // Advanced styling
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'glow';
  shadowColor?: string;
  
  // Text effects
  textShadow?: boolean;
  textGlow?: boolean;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  
  // Icon options
  iconSize?: number;
  iconPosition?: 'left' | 'right';
  
  // Responsive options
  responsive?: boolean;
  mobileScale?: number;
}

export const ANIMATION_PRESETS = {
  pulse: {
    keyframes: '0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); }',
    duration: 2,
    timing: 'ease-in-out',
    iteration: 'infinite'
  },
  bounce: {
    keyframes: '0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); }',
    duration: 2,
    timing: 'ease-in-out',
    iteration: 'infinite'
  },
  fade: {
    keyframes: '0% { opacity: 0.7; } 50% { opacity: 1; } 100% { opacity: 0.7; }',
    duration: 3,
    timing: 'ease-in-out',
    iteration: 'infinite'
  },
  slide: {
    keyframes: '0% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 100% { transform: translateX(-5px); }',
    duration: 4,
    timing: 'ease-in-out',
    iteration: 'infinite'
  },
  glow: {
    keyframes: '0% { box-shadow: 0 0 5px rgba(var(--primary), 0.5); } 50% { box-shadow: 0 0 20px rgba(var(--primary), 0.8); } 100% { box-shadow: 0 0 5px rgba(var(--primary), 0.5); }',
    duration: 2,
    timing: 'ease-in-out',
    iteration: 'infinite'
  }
};

export const GRADIENT_PRESETS = {
  sunset: ['#ff7e5f', '#feb47b'],
  ocean: ['#00c6ff', '#0072ff'],
  forest: ['#56ab2f', '#a8e6cf'],
  purple: ['#667eea', '#764ba2'],
  fire: ['#f12711', '#f5af19'],
  ice: ['#a8edea', '#fed6e3'],
  gold: ['#d4af37', '#ffd700'],
  silver: ['#c0c0c0', '#e5e5e5'],
  neon: ['#ff006e', '#8338ec'],
  rainbow: ['#ff0080', '#7928ca']
};

export const SHADOW_PRESETS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  glow: '0 0 15px rgba(var(--primary), 0.5)'
};

export function generateAdvancedBadgeCSS(config: AdvancedBadgeConfig): string {
  let css = '';
  
  // Base styles
  css += `.advanced-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: ${config.fontWeight || 'medium'};
    text-decoration: none;
    white-space: nowrap;
    vertical-align: baseline;
  `;
  
  // Border radius
  if (config.borderRadius !== undefined) {
    css += `border-radius: ${config.borderRadius}px;`;
  }
  
  // Border
  if (config.borderWidth && config.borderColor) {
    css += `border: ${config.borderWidth}px solid ${config.borderColor};`;
  }
  
  // Background (gradient or solid)
  if (config.useGradient && config.gradientColors) {
    const [start, end] = config.gradientColors;
    let gradientCSS = '';
    
    switch (config.gradientDirection) {
      case 'vertical':
        gradientCSS = `linear-gradient(to bottom, ${start}, ${end})`;
        break;
      case 'diagonal':
        gradientCSS = `linear-gradient(45deg, ${start}, ${end})`;
        break;
      case 'radial':
        gradientCSS = `radial-gradient(circle, ${start}, ${end})`;
        break;
      default:
        gradientCSS = `linear-gradient(to right, ${start}, ${end})`;
    }
    
    css += `background: ${gradientCSS};`;
  } else if (config.messageColor) {
    css += `background-color: ${config.messageColor};`;
  }
  
  // Shadow
  if (config.shadow && config.shadow !== 'none') {
    if (config.shadow === 'glow' && config.shadowColor) {
      css += `box-shadow: 0 0 15px ${config.shadowColor};`;
    } else {
      css += `box-shadow: ${SHADOW_PRESETS[config.shadow]};`;
    }
  }
  
  // Text effects
  if (config.textShadow) {
    css += `text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);`;
  }
  
  if (config.textGlow && config.messageColor) {
    css += `text-shadow: 0 0 10px ${config.messageColor};`;
  }
  
  css += '}';
  
  // Animation
  if (config.animation && config.animation !== 'none') {
    const preset = ANIMATION_PRESETS[config.animation];
    if (preset) {
      css += `
      @keyframes badge-${config.animation} {
        ${preset.keyframes}
      }
      
      .advanced-badge {
        animation: badge-${config.animation} ${config.animationDuration || preset.duration}s ${preset.timing} ${preset.iteration};
        animation-delay: ${config.animationDelay || 0}s;
      }`;
    }
  }
  
  // Responsive styles
  if (config.responsive) {
    css += `
    @media (max-width: 768px) {
      .advanced-badge {
        transform: scale(${config.mobileScale || 0.9});
      }
    }`;
  }
  
  return css;
}

export function generateAdvancedBadgeSVG(config: AdvancedBadgeConfig): string {
  const labelWidth = (config.label.length * 6) + 12;
  const messageWidth = (config.message.length * 6) + 12;
  const totalWidth = labelWidth + messageWidth;
  const height = 20;
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}">`;
  
  // Define gradients if needed
  if (config.useGradient && config.gradientColors) {
    const [start, end] = config.gradientColors;
    svg += `
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${end};stop-opacity:1" />
    </linearGradient>
  </defs>`;
  }
  
  // Background rectangles
  const bgColor = config.useGradient ? 'url(#gradient)' : (config.messageColor || '#4c1');
  const labelBgColor = config.labelColor || '#555';
  
  svg += `
  <rect x="0" y="0" width="${labelWidth}" height="${height}" fill="${labelBgColor}" rx="${config.borderRadius || 3}"/>
  <rect x="${labelWidth}" y="0" width="${messageWidth}" height="${height}" fill="${bgColor}" rx="${config.borderRadius || 3}"/>`;
  
  // Text
  const textY = height / 2 + 4; // Center vertically
  const labelX = labelWidth / 2;
  const messageX = labelWidth + (messageWidth / 2);
  
  svg += `
  <text x="${labelX}" y="${textY}" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11" font-weight="${config.fontWeight || 'bold'}" fill="white">${config.label}</text>
  <text x="${messageX}" y="${textY}" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11" font-weight="${config.fontWeight || 'bold'}" fill="white">${config.message}</text>`;
  
  // Add logo/icon if present
  if (config.logoSvg) {
    const iconSize = config.iconSize || 14;
    const iconY = (height - iconSize) / 2;
    let iconX = 4;
    
    if (config.iconPosition === 'right') {
      iconX = totalWidth - iconSize - 4;
    }
    
    // This is a simplified approach - in a real implementation,
    // you'd need to properly embed or reference the SVG icon
    svg += `
  <rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" fill="currentColor" opacity="0.8" rx="2"/>`;
  }
  
  svg += '</svg>';
  return svg;
}

export function applyAdvancedStyles(element: HTMLElement, config: AdvancedBadgeConfig): void {
  if (!element) return;
  
  // Apply CSS classes
  element.className = 'advanced-badge ' + (element.className || '');
  
  // Apply inline styles for immediate effect
  if (config.borderRadius !== undefined) {
    element.style.borderRadius = `${config.borderRadius}px`;
  }
  
  if (config.useGradient && config.gradientColors) {
    const [start, end] = config.gradientColors;
    let gradient = '';
    
    switch (config.gradientDirection) {
      case 'vertical':
        gradient = `linear-gradient(to bottom, ${start}, ${end})`;
        break;
      case 'diagonal':
        gradient = `linear-gradient(45deg, ${start}, ${end})`;
        break;
      case 'radial':
        gradient = `radial-gradient(circle, ${start}, ${end})`;
        break;
      default:
        gradient = `linear-gradient(to right, ${start}, ${end})`;
    }
    
    element.style.background = gradient;
  }
  
  if (config.shadow && config.shadow !== 'none') {
    if (config.shadow === 'glow' && config.shadowColor) {
      element.style.boxShadow = `0 0 15px ${config.shadowColor}`;
    } else {
      element.style.boxShadow = SHADOW_PRESETS[config.shadow];
    }
  }
  
  if (config.animation && config.animation !== 'none') {
    const preset = ANIMATION_PRESETS[config.animation];
    if (preset) {
      element.style.animation = `badge-${config.animation} ${config.animationDuration || preset.duration}s ${preset.timing} infinite`;
      if (config.animationDelay) {
        element.style.animationDelay = `${config.animationDelay}s`;
      }
    }
  }
}

export const DEFAULT_ADVANCED_CONFIG: Partial<AdvancedBadgeConfig> = {
  animation: 'none',
  animationDuration: 2,
  animationDelay: 0,
  useGradient: false,
  gradientDirection: 'horizontal',
  borderRadius: 3,
  borderWidth: 0,
  shadow: 'none',
  textShadow: false,
  textGlow: false,
  fontWeight: 'medium',
  iconSize: 14,
  iconPosition: 'left',
  responsive: false,
  mobileScale: 0.9
};