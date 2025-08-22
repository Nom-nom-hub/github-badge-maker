"use client";

import React, { useState } from 'react';
import { BadgeConfig } from '@/lib/types';
import { generateBadgeUrl, generateMarkdown, generateHtml, generateMarkdownWithLink, generateHtmlWithLink } from '@/lib/badge-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, ExternalLink, Code, FileText, Link, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface BadgeExportProps {
  config: BadgeConfig;
}

export function BadgeExport({ config }: BadgeExportProps) {
  const [linkUrl, setLinkUrl] = useState('https://github.com/username/repository');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

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

  const exports = [
    {
      id: 'url',
      label: 'Direct URL',
      description: 'Direct link to the badge image',
      value: generateBadgeUrl(config),
      icon: Link,
      color: 'text-blue-500'
    },
    {
      id: 'markdown',
      label: 'Markdown',
      description: 'For README files and documentation',
      value: generateMarkdown(config),
      icon: FileText,
      color: 'text-green-500'
    },
    {
      id: 'markdown-link',
      label: 'Markdown with Link',
      description: 'Clickable badge in Markdown',
      value: generateMarkdownWithLink(config, linkUrl),
      icon: ExternalLink,
      color: 'text-purple-500'
    },
    {
      id: 'html',
      label: 'HTML',
      description: 'For web pages and HTML documents',
      value: generateHtml(config),
      icon: Code,
      color: 'text-orange-500'
    },
    {
      id: 'html-link',
      label: 'HTML with Link',
      description: 'Clickable badge in HTML',
      value: generateHtmlWithLink(config, linkUrl),
      icon: ExternalLink,
      color: 'text-red-500'
    }
  ];

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

  return (
    <div className="space-y-6">
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
        <p className="text-xs text-muted-foreground leading-relaxed">
          🔗 This URL will be used when creating clickable badges (Markdown/HTML with links)
        </p>
      </div>

      {/* Export Formats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-accent" />
            <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
              Export Formats
            </h3>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <Sparkles className="h-2 w-2" />
            {exports.length} formats
          </Badge>
        </div>

        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-3 h-auto bg-muted/50">
            {exports.slice(0, 3).map(exportItem => {
              const Icon = exportItem.icon;
              return (
                <TabsTrigger 
                  key={exportItem.id} 
                  value={exportItem.id} 
                  className="text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200 flex items-center gap-1"
                >
                  <Icon className="h-3 w-3" />
                  {exportItem.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {exports.slice(0, 3).map(exportItem => {
            const Icon = exportItem.icon;
            return (
              <TabsContent key={exportItem.id} value={exportItem.id} className="mt-6 animate-scale-in">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg glass border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center`}>
                        <Icon className={`h-4 w-4 ${exportItem.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{exportItem.label}</h4>
                        <p className="text-xs text-muted-foreground">{exportItem.description}</p>
                      </div>
                    </div>
                    <CopyButton text={exportItem.value} id={exportItem.id} />
                  </div>
                  
                  <div className="relative">
                    <Textarea
                      value={exportItem.value}
                      readOnly
                      className="font-mono text-xs resize-none glass min-h-[80px] focus:ring-2 focus:ring-primary/20"
                      rows={exportItem.value.includes('\n') ? 4 : 3}
                    />
                    <div className="absolute top-2 right-2">
                      <CopyButton text={exportItem.value} id={`${exportItem.id}-textarea`} variant="outline" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Additional formats */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Code className="h-3 w-3" />
            Additional Formats
          </div>
          
          {exports.slice(3).map(exportItem => {
            const Icon = exportItem.icon;
            return (
              <details key={exportItem.id} className="group animate-slide-in-up">
                <summary className="flex items-center justify-between cursor-pointer p-4 glass rounded-lg hover:bg-accent/30 transition-all duration-200 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded flex items-center justify-center bg-muted/50`}>
                      <Icon className={`h-3 w-3 ${exportItem.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{exportItem.label}</h4>
                      <p className="text-xs text-muted-foreground">{exportItem.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CopyButton text={exportItem.value} id={exportItem.id} />
                    <div className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform duration-200">
                      ▼
                    </div>
                  </div>
                </summary>
                <div className="mt-3 p-4 rounded-lg bg-muted/20 border border-border/30">
                  <div className="relative">
                    <Textarea
                      value={exportItem.value}
                      readOnly
                      className="font-mono text-xs resize-none bg-background/50 min-h-[60px]"
                      rows={exportItem.value.includes('\n') ? 3 : 2}
                    />
                    <div className="absolute top-2 right-2">
                      <CopyButton text={exportItem.value} id={`${exportItem.id}-details`} variant="outline" />
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-muted-foreground">
            ⚡ Quick Actions
          </div>
          <div className="text-xs text-muted-foreground">
            One-click copy for common formats
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(generateBadgeUrl(config), 'quick-url')}
            className="gap-2 hover-glow transition-all duration-200"
          >
            <Link className="h-3 w-3" />
            Copy URL
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(generateMarkdown(config), 'quick-markdown')}
            className="gap-2 hover-glow transition-all duration-200"
          >
            <FileText className="h-3 w-3" />
            Copy Markdown
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(generateHtml(config), 'quick-html')}
            className="gap-2 hover-glow transition-all duration-200"
          >
            <Code className="h-3 w-3" />
            Copy HTML
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(generateBadgeUrl(config), '_blank')}
            className="gap-2 hover-glow transition-all duration-200"
          >
            <ExternalLink className="h-3 w-3" />
            Open Badge
          </Button>
        </div>
      </div>
    </div>
  );
}