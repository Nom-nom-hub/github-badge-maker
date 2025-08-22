import { BadgeConfig, BadgeStyle } from './types';

export function generateBadgeUrl(config: BadgeConfig): string {
  const { label, message, labelColor, messageColor, style, logoSvg, logoColor, logoWidth } = config;
  
  // Use shields.io service for badge generation
  const baseUrl = 'https://img.shields.io/badge';
  
  // Encode label and message for URL
  const encodedLabel = encodeURIComponent(label);
  const encodedMessage = encodeURIComponent(message);
  
  // Build the basic badge URL
  const url = `${baseUrl}/${encodedLabel}-${encodedMessage}`;
  
  // Add query parameters
  const params = new URLSearchParams();
  
  if (labelColor && labelColor !== '#555') {
    params.set('labelColor', labelColor.replace('#', ''));
  }
  
  if (messageColor && messageColor !== '#4c1') {
    params.set('color', messageColor.replace('#', ''));
  }
  
  if (style && style !== 'flat') {
    params.set('style', style);
  }
  
  if (logoSvg) {
    params.set('logo', logoSvg);
  }
  
  if (logoColor) {
    params.set('logoColor', logoColor.replace('#', ''));
  }
  
  if (logoWidth) {
    params.set('logoWidth', logoWidth.toString());
  }
  
  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
}

export function generateMarkdown(config: BadgeConfig, altText?: string): string {
  const badgeUrl = generateBadgeUrl(config);
  const alt = altText || `${config.label}: ${config.message}`;
  return `![${alt}](${badgeUrl})`;
}

export function generateHtml(config: BadgeConfig, altText?: string): string {
  const badgeUrl = generateBadgeUrl(config);
  const alt = altText || `${config.label}: ${config.message}`;
  return `<img src="${badgeUrl}" alt="${alt}" />`;
}

export function generateHtmlWithLink(config: BadgeConfig, linkUrl: string, altText?: string): string {
  const badgeUrl = generateBadgeUrl(config);
  const alt = altText || `${config.label}: ${config.message}`;
  return `<a href="${linkUrl}"><img src="${badgeUrl}" alt="${alt}" /></a>`;
}

export function generateMarkdownWithLink(config: BadgeConfig, linkUrl: string, altText?: string): string {
  const badgeUrl = generateBadgeUrl(config);
  const alt = altText || `${config.label}: ${config.message}`;
  return `[![${alt}](${badgeUrl})](${linkUrl})`;
}

export function validateColor(color: string): boolean {
  // Check if it's a valid hex color
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(color)) {
    return true;
  }
  
  // Check if it's a valid named color (simplified check)
  const namedColors = [
    'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white',
    'gray', 'grey', 'lightgray', 'lightgrey', 'darkgray', 'darkgrey', 'cyan', 'magenta'
  ];
  
  return namedColors.includes(color.toLowerCase());
}

export function sanitizeText(text: string): string {
  // Remove or replace characters that might cause issues in URLs
  return text.replace(/[<>]/g, '').trim();
}

export function getContrastColor(backgroundColor: string): string {
  // Simple contrast calculation - in a real app you might want a more sophisticated approach
  const color = backgroundColor.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export function generateShieldsCompatibleUrl(
  label: string,
  message: string,
  color: string = 'brightgreen',
  style: BadgeStyle = 'flat'
): string {
  const encodedLabel = encodeURIComponent(label.replace(/-/g, '--').replace(/_/g, '__'));
  const encodedMessage = encodeURIComponent(message.replace(/-/g, '--').replace(/_/g, '__'));
  
  let url = `https://img.shields.io/badge/${encodedLabel}-${encodedMessage}-${color.replace('#', '')}`;
  
  if (style !== 'flat') {
    url += `?style=${style}`;
  }
  
  return url;
}