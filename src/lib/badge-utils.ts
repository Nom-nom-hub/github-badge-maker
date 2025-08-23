import { BadgeConfig, BadgeStyle } from './types';
import { customBadgeGenerator } from './custom-badge-generator';

export function generateBadgeUrl(config: BadgeConfig): string {
  // If it's a custom badge or has custom text colors, generate SVG data URL
  if (config.isCustom || config.labelTextColor || config.messageTextColor) {
    return customBadgeGenerator.generateDataUrl({
      label: config.label,
      message: config.message,
      labelColor: config.labelColor,
      messageColor: config.messageColor,
      labelTextColor: config.labelTextColor,
      messageTextColor: config.messageTextColor,
      style: config.style
    });
  }
  
  const { label, message, labelColor, messageColor, style, logoSvg, logoColor, logoWidth } = config;
  
  // Use shields.io service for badge generation
  const baseUrl = 'https://img.shields.io/badge';
  
  // Apply Shields.io encoding rules:
  // Space -> _
  // Underscore -> __
  // Dash -> --
  function encodeForShields(text: string): string {
    return text
      .replace(/_/g, '__')    // Underscore becomes double underscore
      .replace(/-/g, '--')    // Dash becomes double dash
      .replace(/ /g, '_')     // Space becomes underscore
      .replace(/%20/g, '_');  // %20 (encoded space) becomes underscore
  }
  
  const encodedLabel = encodeForShields(label);
  const encodedMessage = encodeForShields(message);
  
  // Get the color without # for the path
  const pathColor = messageColor?.replace('#', '') || 'blue';
  
  // Build the badge URL according to Shields.io format: /badge/label-message-color
  const url = `${baseUrl}/${encodedLabel}-${encodedMessage}-${pathColor}`;
  
  // Add query parameters
  const params = new URLSearchParams();
  
  if (labelColor && labelColor !== '#555') {
    params.set('labelColor', labelColor.replace('#', ''));
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
    params.set('logoSize', logoWidth.toString());
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
  // Apply Shields.io encoding rules:
  function encodeForShields(text: string): string {
    return text
      .replace(/_/g, '__')    // Underscore becomes double underscore
      .replace(/-/g, '--')    // Dash becomes double dash
      .replace(/ /g, '_')     // Space becomes underscore
      .replace(/%20/g, '_');  // %20 (encoded space) becomes underscore
  }
  
  const encodedLabel = encodeForShields(label);
  const encodedMessage = encodeForShields(message);
  
  let url = `https://img.shields.io/badge/${encodedLabel}-${encodedMessage}-${color.replace('#', '')}`;
  
  if (style !== 'flat') {
    url += `?style=${style}`;
  }
  
  return url;
}