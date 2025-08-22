"use client";

import React, { useState, useEffect } from 'react';
import { BadgeConfig } from '@/lib/types';
import { generateBadgeUrl } from '@/lib/badge-utils';
import { badgeAnalytics } from '@/lib/badge-analytics';
import { customBadgeGenerator } from '@/lib/custom-badge-generator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Eye, Sparkles, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface BadgePreviewProps {
  config: BadgeConfig;
}

export function BadgePreview({ config }: BadgePreviewProps) {
  const [badgeUrl, setBadgeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previewMode, setPreviewMode] = useState<'badge' | 'readme' | 'docs'>('badge');

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true);
      setError(null);
      setImageLoaded(false);

      try {
        // Validate required fields
        if (!config.label || !config.message) {
          throw new Error('Label and message are required');
        }

        let url: string;
        
        if (config.isCustom) {
          // Generate custom SVG badge
          url = customBadgeGenerator.generateDataUrl({
            label: config.label,
            message: config.message,
            labelColor: config.labelColor,
            messageColor: config.messageColor,
            style: config.style
          });
        } else {
          // Generate standard Shields.io badge
          url = generateBadgeUrl(config);
        }
        
        setBadgeUrl(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate badge');
      } finally {
        setIsLoading(false);
      }
    };

    generatePreview();
  }, [config]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    
    // Track badge usage for analytics
    try {
      const templateId = `custom-${config.label}-${config.message}`;
      const category = 'Custom';
      badgeAnalytics.trackBadgeUsage(templateId, `${config.label}: ${config.message}`, category, config);
    } catch (error) {
      console.warn('Failed to track badge usage:', error);
    }
  };

  const handleImageError = () => {
    setError('Failed to load badge image');
    setImageLoaded(false);
  };

  const handleRefresh = () => {
    setImageLoaded(false);
    setError(null);
    // Force reload by adding timestamp
    const url = new URL(badgeUrl);
    url.searchParams.set('_t', Date.now().toString());
    setBadgeUrl(url.toString());
  };

  const copyBadgeUrl = async () => {
    try {
      await navigator.clipboard.writeText(badgeUrl);
      toast.success('Badge URL copied to clipboard!');
    } catch {
      toast.error('Failed to copy badge URL');
    }
  };

  const openBadge = () => {
    if (badgeUrl) {
      window.open(badgeUrl, '_blank');
    }
  };

  if (error) {
    return (
      <div className="space-y-4 animate-slide-in-up">
        <Alert variant="destructive" className="glass border-destructive/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            size="sm" 
            className="gap-2 hover-glow transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const previewModes = [
    { id: 'badge', label: 'Badge', icon: Eye },
    { id: 'readme', label: 'README', icon: Sparkles },
    { id: 'docs', label: 'Docs', icon: ExternalLink }
  ];

  return (
    <div className="space-y-6">
      {/* Preview Mode Selector */}
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium text-muted-foreground">Preview as:</div>
        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {previewModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setPreviewMode(mode.id as 'badge' | 'readme' | 'docs')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1 ${
                  previewMode === mode.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon className="h-3 w-3" />
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Badge Display */}
      <div className="text-center space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <div className="text-sm font-medium text-foreground">Live Preview</div>
          </div>
          
          <div className="relative flex items-center justify-center min-h-[60px] p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
            {(isLoading || !imageLoaded) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-6 w-32 rounded animate-pulse" />
              </div>
            )}
            
            {badgeUrl && (
              <div className="relative group">
                <img
                  src={badgeUrl}
                  alt={`${config.label}: ${config.message}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`transition-all duration-300 hover:scale-110 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                  style={{ minHeight: '20px' }}
                />
                
                {/* Quick Actions Overlay */}
                {imageLoaded && (
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-6 w-6 p-0 rounded-full glass"
                      onClick={copyBadgeUrl}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-6 w-6 p-0 rounded-full glass"
                      onClick={openBadge}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline" className="text-xs">
              {config.style} style
            </Badge>
            <Badge variant="outline" className="text-xs">
              {config.label} • {config.message}
            </Badge>
            {config.logoSvg && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Sparkles className="h-2 w-2" />
                with logo
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Context Previews */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          Context Examples
        </div>
        
        {previewMode === 'readme' && (
          <div className="space-y-3 animate-slide-in-up">
            <div className="p-4 rounded-lg glass border border-border/50">
              <div className="text-xs text-muted-foreground mb-2">GitHub README.md:</div>
              <div className="font-mono text-sm bg-muted/30 p-3 rounded border">
                <div className="text-muted-foreground"># My Awesome Project</div>
                <div className="mt-1 flex items-center gap-2">
                  {badgeUrl && imageLoaded && (
                    <img
                      src={badgeUrl}
                      alt={`${config.label}: ${config.message}`}
                      className="inline-block"
                    />
                  )}
                  <span className="text-foreground">[![Build Status](...</span>
                </div>
                <div className="mt-1 text-muted-foreground">Description of your project...</div>
              </div>
            </div>
          </div>
        )}

        {previewMode === 'docs' && (
          <div className="space-y-3 animate-slide-in-up">
            <div className="p-4 rounded-lg glass border border-border/50">
              <div className="text-xs text-muted-foreground mb-2">Documentation page:</div>
              <div className="bg-muted/30 p-4 rounded border space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    Project Status
                  </h3>
                  {badgeUrl && imageLoaded && (
                    <img
                      src={badgeUrl}
                      alt={`${config.label}: ${config.message}`}
                      className="inline-block"
                    />
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This project is actively maintained and continuously improved. 
                  Check the badge above for the current status.
                </p>
              </div>
            </div>
          </div>
        )}

        {previewMode === 'badge' && (
          <div className="animate-slide-in-up">
            <div className="p-4 rounded-lg glass border border-border/50">
              <div className="text-xs text-muted-foreground mb-3">Badge URL:</div>
              {badgeUrl && (
                <div className="relative">
                  <code className="block text-xs font-mono bg-muted/30 p-3 rounded border break-all text-muted-foreground leading-relaxed">
                    {badgeUrl}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-6 px-2"
                    onClick={copyBadgeUrl}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
        <Button
          variant="outline"
          size="sm"
          onClick={copyBadgeUrl}
          className="gap-2 hover-glow transition-all duration-200"
          disabled={!badgeUrl}
        >
          <Copy className="h-3 w-3" />
          Copy URL
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={openBadge}
          className="gap-2 hover-glow transition-all duration-200"
          disabled={!badgeUrl}
        >
          <ExternalLink className="h-3 w-3" />
          Open Badge
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="gap-2 hover-glow transition-all duration-200"
          disabled={!badgeUrl}
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </Button>
      </div>
    </div>
  );
}