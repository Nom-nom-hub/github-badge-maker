export interface BadgeConfig {
  label: string;
  message: string;
  labelColor: string;
  messageColor: string;
  logoSvg?: string;
  logoColor?: string;
  style: BadgeStyle;
  logoWidth?: number;
  isCustom?: boolean;
}

export type BadgeStyle = 'flat' | 'flat-square' | 'for-the-badge' | 'plastic' | 'social';

export interface BadgeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  config: Partial<BadgeConfig>;
}

export interface ExportFormat {
  type: 'svg' | 'markdown' | 'html' | 'url';
  label: string;
  description: string;
}

export const DEFAULT_BADGE_CONFIG: BadgeConfig = {
  label: 'build',
  message: 'passing',
  labelColor: '#555',
  messageColor: '#4c1',
  style: 'flat'
};

export const BADGE_STYLES: { value: BadgeStyle; label: string; description: string }[] = [
  { value: 'flat', label: 'Flat', description: 'Modern flat design (default)' },
  { value: 'flat-square', label: 'Flat Square', description: 'Flat with square corners' },
  { value: 'for-the-badge', label: 'For the Badge', description: 'Large rectangular badges' },
  { value: 'plastic', label: 'Plastic', description: 'Glossy plastic appearance' },
  { value: 'social', label: 'Social', description: 'Social media style' }
];

export const COMMON_COLORS = [
  { name: 'Bright Green', value: '#4c1' },
  { name: 'Green', value: '#97ca00' },
  { name: 'Yellow Green', value: '#a4a61d' },
  { name: 'Yellow', value: '#dfb317' },
  { name: 'Orange', value: '#fe7d37' },
  { name: 'Red', value: '#e05d44' },
  { name: 'Blue', value: '#007ec6' },
  { name: 'Light Blue', value: '#00b4d8' },
  { name: 'Dark Blue', value: '#023047' },
  { name: 'Purple', value: '#6f42c1' },
  { name: 'Pink', value: '#e91e63' },
  { name: 'Light Grey', value: '#9f9f9f' },
  { name: 'Grey', value: '#555' },
  { name: 'Dark Grey', value: '#333' },
  { name: 'Black', value: '#000' },
  { name: 'White', value: '#fff' }
];