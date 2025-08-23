"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { BadgeConfig } from '@/lib/types';
import { generateMarkdown, generateHtml, generateBadgeUrl } from '@/lib/badge-utils';
import { badgeExport, ExportOptions } from '@/lib/badge-export';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Copy, ExternalLink, Code, FileText, Link, Download, Sparkles, Package, Image as ImageIcon, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface BadgeExportProps {
  config: BadgeConfig;
  selectedBadges?: BadgeConfig[];
  // onExport?: (url: string) => void; // Currently unused
}

export function BadgeExport({ config, selectedBadges = [] }: BadgeExportProps) {
  // Format and size state variables for potential future use
  // const [selectedFormat, setSelectedFormat] = useState<'svg' | 'png' | 'jpg'>('svg');
  // const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [linkUrl, setLinkUrl] = useState('https://github.com/username/repository');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'png',
    size: 'medium',
    quality: 0.9,
    includeMetadata: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const availableFormats = badgeExport.getAvailableFormats();

  // Reset preview states when config changes
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Reset states
    setPreviewLoading(false);
    setPreviewError(false);
    
    // For image formats, start loading after a brief delay to ensure component is ready
    if (['png', 'svg'].includes(exportOptions.format)) {
      // Debug log the badge URL
      console.log('Badge URL:', generateBadgeUrl(config));
      
      const timer = setTimeout(() => {
        setPreviewLoading(true);
        setPreviewError(false);
        
        // Set timeout to prevent infinite loading
        timeoutRef.current = setTimeout(() => {
          setPreviewLoading(false);
          setPreviewError(true);
          timeoutRef.current = null;
        }, 8000); // 8 second timeout
      }, 100); // Brief delay to ensure component is mounted
      
      return () => {
        clearTimeout(timer);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
    
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [config, exportOptions.format]);

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

  // Helper functions for bulk export (currently unused but kept for potential future use)
  // const generateBulkMarkdown = (badges: BadgeConfig[]) => {
  //   return badges.map(badge => generateMarkdown(badge)).join(' ');
  // };

  // const generateBulkMarkdownWithLink = (badges: BadgeConfig[], url: string) => {
  //   return badges.map(badge => generateMarkdownWithLink(badge, url)).join(' ');
  // };

  // const generateBulkHtml = (badges: BadgeConfig[]) => {
  //   return badges.map(badge => generateHtml(badge)).join('\n');
  // };

  // const generateBulkHtmlWithLink = (badges: BadgeConfig[], url: string) => {
  //   return badges.map(badge => generateHtmlWithLink(badge, url)).join('\n');
  // };

  return (
    <div className="space-y-8">
      {/* Quick Export (existing functionality) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Copy className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base uppercase tracking-wide text-foreground">
              Quick Export
            </h3>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2 text-sm px-3 py-1">
            <Sparkles className="h-3 w-3" />
            Ready to use
          </Badge>
        </div>

        {/* Link URL Configuration */}
        <div className="space-y-4 group">
          <div className="flex items-center gap-3">
            <Link className="h-5 w-5 text-primary" />
            <Label htmlFor="linkUrl" className="text-base font-medium">
              Target URL for Clickable Badges
            </Label>
            <div className="h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex gap-3">
            <Input
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="flex-1 glass hover:border-primary/50 focus:border-primary transition-all duration-200 font-mono text-sm h-12"
            />
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(linkUrl, '_blank')}
              className="px-4 hover-glow transition-all duration-200 h-12"
            >
              <ExternalLink className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Export Options */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group" onClick={() => copyToClipboard(generateMarkdown(config), 'quick-md')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-semibold text-base">Markdown</p>
                    <p className="text-sm text-muted-foreground">
                      Perfect for README & docs
                    </p>
                  </div>
                </div>
                <Copy className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group" onClick={() => copyToClipboard(generateHtml(config), 'quick-html')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Code className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="font-semibold text-base">HTML</p>
                    <p className="text-sm text-muted-foreground">
                      Great for web pages
                    </p>
                  </div>
                </div>
                <Copy className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Advanced Export */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-accent" />
            <h3 className="font-bold text-base uppercase tracking-wide text-foreground">
              Advanced Export
            </h3>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 text-sm px-3 py-1">
            <Settings className="h-3 w-3" />
            Multiple formats
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Format Selection */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Export Format</Label>
              <Select 
                value={exportOptions.format} 
                onValueChange={(value) => setExportOptions(prev => ({ ...prev, format: value as 'png' | 'svg' | 'html' | 'json' | 'pdf' }))}
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
                  onValueChange={(value) => setExportOptions(prev => ({ ...prev, size: value as 'small' | 'medium' | 'large' }))}
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
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      {previewError && (
                        <div className="text-center">
                          <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Preview unavailable</p>
                          <button 
                            onClick={() => {
                              setPreviewError(false);
                              setPreviewLoading(true);
                            }}
                            className="text-xs text-primary hover:underline mt-1"
                          >
                            Retry
                          </button>
                        </div>
                      )}
                      {!previewError && (
                        <>
                          {previewLoading && (
                            <div className="flex flex-col items-center gap-2">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                              <p className="text-sm text-muted-foreground">Loading preview...</p>
                            </div>
                          )}
                          <img 
                            key={`${config.label}-${config.message}-${config.style}-${exportOptions.format}`}
                            src={generateBadgeUrl(config)}
                            alt={`${config.label}: ${config.message}`}
                            className={`max-w-full h-auto ${previewLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
                            onLoad={() => {
                              // Clear timeout on successful load
                              if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current);
                                timeoutRef.current = null;
                              }
                              setPreviewLoading(false);
                              setPreviewError(false);
                            }}
                            onError={() => {
                              // Clear timeout on error
                              if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current);
                                timeoutRef.current = null;
                              }
                              setPreviewLoading(false);
                              setPreviewError(true);
                            }}
                            onLoadStart={() => {
                              setPreviewLoading(true);
                              setPreviewError(false);
                            }}
                          />
                        </>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Image will be downloaded</p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="bg-background/50 rounded border p-3 font-mono text-sm max-w-full overflow-auto">
                      {exportOptions.format === 'html' && (
                        <code className="text-xs break-all">{generateHtml(config)}</code>
                      )}
                      {exportOptions.format === 'markdown' && (
                        <code className="text-xs break-all">{generateMarkdown(config)}</code>
                      )}
                      {!['html', 'markdown'].includes(exportOptions.format) && (
                        <div className="text-center">
                          <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">{exportOptions.format.toUpperCase()} format</p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Code will be copied to clipboard</p>
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