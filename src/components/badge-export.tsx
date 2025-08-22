"use client";

import React, { useState } from 'react';
import { BadgeConfig } from '@/lib/types';
import { generateBadgeUrl, generateMarkdown, generateHtml, generateMarkdownWithLink, generateHtmlWithLink } from '@/lib/badge-utils';
import { badgeExport, ExportOptions } from '@/lib/badge-export';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Copy, Check, ExternalLink, Code, FileText, Link, Download, Sparkles, Package, Image, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface BadgeExportProps {
  config: BadgeConfig;
  selectedBadges?: BadgeConfig[];
}

export function BadgeExport({ config, selectedBadges = [] }: BadgeExportProps) {
  const [linkUrl, setLinkUrl] = useState('https://github.com/username/repository');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [selectedFormat, setSelectedFormat] = useState<string>('markdown');
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'markdown',
    size: 'medium',
    quality: 0.9,
    includeMetadata: false
  });
  const [isExporting, setIsExporting] = useState(false);

  const availableFormats = badgeExport.getAvailableFormats();

  const handleAdvancedExport = async () => {
    setIsExporting(true);
    
    try {
      const options: ExportOptions = {
        ...exportOptions,
        linkUrl: linkUrl || undefined,
        altText: `${config.label}: ${config.message}`
      };
      
      const result = await badgeExport.exportBadge(config, options);
      
      if (result.blob && ['svg', 'png', 'pdf', 'json'].includes(options.format)) {
        // Download binary files
        badgeExport.downloadFile(result);
        toast.success(`${options.format.toUpperCase()} exported successfully!`);
      } else {
        // Copy text-based formats to clipboard
        await badgeExport.copyToClipboard(result.content);
        toast.success(`${options.format.toUpperCase()} code copied to clipboard!`);
      }
    } catch (error) {
      toast.error(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      toast.success('Copied to clipboard! ✨');
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  // Helper functions for bulk export
  const generateBulkMarkdown = (badges: BadgeConfig[]) => {
    return badges.map(badge => generateMarkdown(badge)).join(' ');
  };

  const generateBulkMarkdownWithLink = (badges: BadgeConfig[], url: string) => {
    return badges.map(badge => generateMarkdownWithLink(badge, url)).join(' ');
  };

  const generateBulkHtml = (badges: BadgeConfig[]) => {
    return badges.map(badge => generateHtml(badge)).join('\n');
  };

  const generateBulkHtmlWithLink = (badges: BadgeConfig[], url: string) => {
    return badges.map(badge => generateHtmlWithLink(badge, url)).join('\n');
  };

  const CopyButton = ({ text, id, variant = 'outline' }: { text: string; id: string; variant?: 'outline' | 'default' }) => (
    <Button
      variant={variant}
      size="sm"
      onClick={() => copyToClipboard(text, id)}
      className={`gap-2 hover-glow transition-all duration-200 ${
        copiedStates[id] ? 'bg-primary text-primary-foreground' : ''
      }`}
      disabled={!text}
    >
      {copiedStates[id] ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  );

  const exports = [
    {
      id: 'url',
      label: 'Direct URL',
      description: selectedBadges.length > 1 ? `URLs for ${selectedBadges.length} badges` : 'Direct link to the badge image',
      value: selectedBadges.length > 1 
        ? selectedBadges.map(badge => generateBadgeUrl(badge)).join('\n')
        : generateBadgeUrl(config),
      icon: Link,
      color: 'text-blue-500'
    },
    {
      id: 'markdown',
      label: 'Markdown',
      description: selectedBadges.length > 1 ? `Markdown for ${selectedBadges.length} badges` : 'For README files and documentation',
      value: selectedBadges.length > 1 
        ? generateBulkMarkdown(selectedBadges)
        : generateMarkdown(config),
      icon: FileText,
      color: 'text-green-500'
    },
    {
      id: 'markdown-link',
      label: 'Markdown with Link',
      description: selectedBadges.length > 1 ? `Clickable badges for ${selectedBadges.length} badges` : 'Clickable badge in Markdown',
      value: selectedBadges.length > 1 
        ? generateBulkMarkdownWithLink(selectedBadges, linkUrl)
        : generateMarkdownWithLink(config, linkUrl),
      icon: ExternalLink,
      color: 'text-purple-500'
    },
    {
      id: 'html',
      label: 'HTML',
      description: selectedBadges.length > 1 ? `HTML for ${selectedBadges.length} badges` : 'For web pages and HTML documents',
      value: selectedBadges.length > 1 
        ? generateBulkHtml(selectedBadges)
        : generateHtml(config),
      icon: Code,
      color: 'text-orange-500'
    },
    {
      id: 'html-link',
      label: 'HTML with Link',
      description: selectedBadges.length > 1 ? `Clickable HTML badges for ${selectedBadges.length} badges` : 'Clickable badge in HTML',
      value: selectedBadges.length > 1 
        ? generateBulkHtmlWithLink(selectedBadges, linkUrl)
        : generateHtmlWithLink(config, linkUrl),
      icon: ExternalLink,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Export (existing functionality) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Copy className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
              {selectedBadges.length > 1 ? 'Bulk Export' : 'Quick Export'}
            </h3>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <Sparkles className="h-2 w-2" />
            {selectedBadges.length > 1 ? `${selectedBadges.length} badges` : 'Ready to use'}
          </Badge>
        </div>

        {/* Link URL Configuration */}
        <div className="space-y-3 group">
          <div className="flex items-center gap-2">
            <Link className="h-4 w-4 text-primary" />
            <Label htmlFor="linkUrl" className="text-sm font-medium">
              Target URL for Clickable Badges
            </Label>
            <div className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex gap-3">
            <Input
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="flex-1 glass hover:border-primary/50 focus:border-primary transition-all duration-200 font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(linkUrl, '_blank')}
              className="px-3 hover-glow transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:shadow-md transition-all duration-200 group" onClick={() => copyToClipboard(selectedBadges.length > 1 ? generateBulkMarkdown(selectedBadges) : generateMarkdown(config), 'quick-md')}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Markdown</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedBadges.length > 1 ? `${selectedBadges.length} badges` : 'README & docs'}
                    </p>
                  </div>
                </div>
                <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-all duration-200 group" onClick={() => copyToClipboard(selectedBadges.length > 1 ? generateBulkHtml(selectedBadges) : generateHtml(config), 'quick-html')}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="font-medium text-sm">HTML</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedBadges.length > 1 ? `${selectedBadges.length} badges` : 'Web pages'}
                    </p>
                  </div>
                </div>
                <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Collection-specific exports */}
        {selectedBadges.length > 1 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Collection Formats
              </h4>
              <div className="grid grid-cols-1 gap-2">
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 group" 
                  onClick={() => {
                    const readmeSection = `## Badges\n\n${generateBulkMarkdown(selectedBadges)}\n\n---\n`;
                    copyToClipboard(readmeSection, 'readme-section');
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="font-medium text-sm">README Section</p>
                          <p className="text-xs text-muted-foreground">Complete section with header</p>
                        </div>
                      </div>
                      <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 group" 
                  onClick={() => {
                    const listFormat = selectedBadges.map((badge, index) => 
                      `${index + 1}. ![${badge.label}](${generateBadgeUrl(badge)}) - ${badge.message}`
                    ).join('\n');
                    copyToClipboard(listFormat, 'numbered-list');
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium text-sm">Numbered List</p>
                          <p className="text-xs text-muted-foreground">Organized list format</p>
                        </div>
                      </div>
                      <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      <Separator />

      {/* Advanced Export */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-accent" />
            <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
              Advanced Export
            </h3>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <Settings className="h-2 w-2" />
            Multiple formats
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Format Selection */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Export Format</Label>
              <Select 
                value={exportOptions.format} 
                onValueChange={(value) => setExportOptions(prev => ({ ...prev, format: value as any }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableFormats.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{format.category}</Badge>
                        <span>{format.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {availableFormats.find(f => f.id === exportOptions.format)?.description}
              </p>
            </div>

            {/* Size Options for Image Formats */}
            {['png', 'svg'].includes(exportOptions.format) && (
              <div>
                <Label className="text-sm font-medium">Size</Label>
                <Select 
                  value={exportOptions.size} 
                  onValueChange={(value) => setExportOptions(prev => ({ ...prev, size: value as any }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1x)</SelectItem>
                    <SelectItem value="medium">Medium (2x)</SelectItem>
                    <SelectItem value="large">Large (4x)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quality for PNG */}
            {exportOptions.format === 'png' && (
              <div>
                <Label className="text-sm font-medium">Quality: {Math.round((exportOptions.quality || 0.9) * 100)}%</Label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.1" 
                  value={exportOptions.quality || 0.9}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
                  className="w-full mt-2"
                />
              </div>
            )}

            {/* Include Metadata */}
            {['html', 'json'].includes(exportOptions.format) && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="includeMetadata"
                  checked={exportOptions.includeMetadata || false}
                  onCheckedChange={(checked: boolean) => setExportOptions(prev => ({ ...prev, includeMetadata: checked }))}
                />
                <Label htmlFor="includeMetadata" className="text-sm">Include metadata</Label>
              </div>
            )}
          </div>

          {/* Preview & Export */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Preview</Label>
              <div className="mt-2 p-4 bg-muted/30 rounded-lg border border-border/50 min-h-[100px] flex items-center justify-center">
                {['png', 'svg'].includes(exportOptions.format) ? (
                  <div className="text-center">
                    <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Image will be downloaded</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Code will be copied to clipboard</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleAdvancedExport} 
                disabled={isExporting}
                className="w-full gap-2"
                size="lg"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export {exportOptions.format.toUpperCase()}
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                {['png', 'svg', 'pdf', 'json'].includes(exportOptions.format) 
                  ? 'File will be downloaded automatically'
                  : 'Code will be copied to your clipboard'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}