"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BadgeConfig, DEFAULT_BADGE_CONFIG } from '@/lib/types';
import { generateBadgeUrl } from '@/lib/badge-utils';
import { BadgeForm } from '@/components/badge-form';
import { BadgePreview } from '@/components/badge-preview';
import { BadgeExport } from '@/components/badge-export';
import { BadgeTemplates } from '@/components/badge-templates';
import { BadgeSuggestions } from '@/components/badge-suggestions';
import { BadgeCollections } from '@/components/badge-collections';
import { BadgeAnalyticsDashboard } from '@/components/badge-analytics';
import { BatchGenerator } from '@/components/batch-generator';
import { RepositoryAnalysis } from '@/components/repository-analysis';
import { CustomBadgeDesigner } from '@/components/custom-badge-designer';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateMarkdown, generateHtml } from '@/lib/badge-utils';
import { Sparkles, Github, Zap, Palette, Brain, Package, BarChart3, Layers, Paintbrush, Settings, Eye, Download, FileText, Code, Link, Copy, Image as ImageIcon, BookOpen } from 'lucide-react';
import { BadgeTemplate } from '@/lib/types';
import { toast } from 'sonner';

export function BadgeMaker() {
  const [badgeConfig, setBadgeConfig] = useState<BadgeConfig>(DEFAULT_BADGE_CONFIG);
  const [selectedBadges, setSelectedBadges] = useState<BadgeConfig[]>([]);
  const [activeTab, setActiveTab] = useState('create');

  const handleConfigChange = (newConfig: Partial<BadgeConfig>) => {
    setBadgeConfig(prev => ({ ...prev, ...newConfig }));
  };

  const handleTemplateSelect = (templateConfig: Partial<BadgeConfig>) => {
    setBadgeConfig(prev => ({ ...prev, ...templateConfig }));
    setActiveTab('create');
  };

  const handleTemplateSelectFromSuggestion = (template: BadgeTemplate) => {
    setBadgeConfig(prev => ({
      ...prev,
      label: template.config.label || prev.label,
      message: template.config.message || prev.message,
      labelColor: template.config.labelColor || prev.labelColor,
      messageColor: template.config.messageColor || prev.messageColor,
      style: template.config.style || prev.style,
      logoSvg: template.config.logoSvg || prev.logoSvg,
      logoColor: template.config.logoColor || prev.logoColor
    }));
    setActiveTab('create');
  };

  const handleMultipleTemplateSelect = (templates: BadgeTemplate[]) => {
    // Convert templates to BadgeConfig and add to selected badges
    const newBadges: BadgeConfig[] = templates.map(template => ({
      label: template.config.label || template.name,
      message: template.config.message || 'enabled',
      labelColor: template.config.labelColor || '#555',
      messageColor: template.config.messageColor || '#007ec6',
      style: template.config.style || 'flat',
      logoSvg: template.config.logoSvg,
      logoColor: template.config.logoColor,
      logoWidth: template.config.logoWidth
    }));
    
    setSelectedBadges(newBadges);
    
    // Also set the first badge as the main configuration
    if (newBadges.length > 0) {
      setBadgeConfig(newBadges[0]);
    }
    
    // Show success notification
    toast.success(`✨ Added ${newBadges.length} badge${newBadges.length > 1 ? 's' : ''} to your collection!`);
    
    setActiveTab('create');
  };

  const handleSelectFromHistory = (config: BadgeConfig) => {
    setBadgeConfig(prev => ({ ...prev, ...config }));
    setActiveTab('create');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/40 glass backdrop-blur-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Github className="h-10 w-10 text-primary" />
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-accent animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text">
                    Badge Maker
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create beautiful badges for your projects
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="hidden sm:flex items-center gap-2 px-3 py-1 animate-scale-in">
                  <Zap className="h-4 w-4" />
                  Real-time Preview
                </Badge>
                {selectedBadges.length > 1 && (
                  <Badge variant="default" className="flex items-center gap-2 px-3 py-1 animate-scale-in bg-primary">
                    <Package className="h-4 w-4" />
                    {selectedBadges.length} badges selected
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden md:flex items-center gap-2 px-3 py-1">
                <Palette className="h-4 w-4" />
                Beautiful UI
              </Badge>
              <Button variant="ghost" size="sm" asChild className="hidden lg:flex items-center gap-2">
                <a href="/tutorial">
                  <BookOpen className="h-4 w-4" />
                  Tutorial
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Create Professional 
            <span className="gradient-text">GitHub Badges</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Design beautiful, customizable badges for your repositories in seconds
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Real-time Preview
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-primary" />
              Instant Export
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              200+ Templates
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Side: Badge Creation */}
          <div className="space-y-6">
            <Card className="glass shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Settings className="h-5 w-5 text-primary" />
                  Badge Configuration
                </CardTitle>
                <CardDescription>
                  Customize your badge appearance and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BadgeForm 
                  config={badgeConfig}
                  onChange={handleConfigChange}
                />
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card className="glass shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Quick Templates
                </CardTitle>
                <CardDescription>
                  Popular badge templates to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 flex flex-col items-center gap-2"
                    onClick={() => setBadgeConfig(prev => ({ ...prev, label: 'Build', message: 'Passing', labelColor: '#555', messageColor: '#4c1', style: 'flat' }))}
                  >
                    <Image src="https://img.shields.io/badge/Build-Passing-brightgreen" alt="Build Passing" width={80} height={20} className="rounded" unoptimized />
                    <span className="text-xs">Build Status</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 flex flex-col items-center gap-2"
                    onClick={() => setBadgeConfig(prev => ({ ...prev, label: 'License', message: 'MIT', labelColor: '#555', messageColor: '#007ec6', style: 'flat' }))}
                  >
                    <Image src="https://img.shields.io/badge/License-MIT-blue" alt="License MIT" width={80} height={20} className="rounded" unoptimized />
                    <span className="text-xs">License</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 flex flex-col items-center gap-2"
                    onClick={() => setBadgeConfig(prev => ({ ...prev, label: 'Version', message: 'v1.0.0', labelColor: '#555', messageColor: '#orange', style: 'flat' }))}
                  >
                    <Image src="https://img.shields.io/badge/Version-v1.0.0-orange" alt="Version" width={80} height={20} className="rounded" unoptimized />
                    <span className="text-xs">Version</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-3 flex flex-col items-center gap-2"
                    onClick={() => setActiveTab('templates')}
                  >
                    <div className="w-20 h-5 bg-gradient-to-r from-primary/20 to-accent/20 rounded flex items-center justify-center">
                      <span className="text-xs font-medium">More...</span>
                    </div>
                    <span className="text-xs">Browse All</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Preview & Export */}
          <div className="space-y-6">
            {/* Live Preview */}
            <Card className="glass shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Eye className="h-5 w-5 text-accent" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See your badge in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                    {badgeConfig.label && badgeConfig.message ? (
                      <Image
                        src={generateBadgeUrl(badgeConfig)}
                        alt={`${badgeConfig.label}: ${badgeConfig.message}`}
                        width={200}
                        height={40}
                        className="max-w-full h-auto"
                        unoptimized
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                        <p>Configure your badge to see preview</p>
                      </div>
                    )}
                  </div>
                  
                  {badgeConfig.label && badgeConfig.message && (
                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">Badge URL:</p>
                      <div className="relative">
                        <code className="block text-xs bg-muted p-3 rounded border font-mono break-all">
                          {generateBadgeUrl(badgeConfig)}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => navigator.clipboard.writeText(generateBadgeUrl(badgeConfig))}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="glass shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Download className="h-5 w-5 text-secondary-foreground" />
                  Export Your Badge
                </CardTitle>
                <CardDescription>
                  Get the code for your badge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => {
                        navigator.clipboard.writeText(generateMarkdown(badgeConfig));
                        toast.success('Markdown copied!');
                      }}
                      disabled={!badgeConfig.label || !badgeConfig.message}
                    >
                      <FileText className="h-4 w-4" />
                      Copy Markdown
                      <Badge variant="secondary" className="ml-auto">README</Badge>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => {
                        navigator.clipboard.writeText(generateHtml(badgeConfig));
                        toast.success('HTML copied!');
                      }}
                      disabled={!badgeConfig.label || !badgeConfig.message}
                    >
                      <Code className="h-4 w-4" />
                      Copy HTML
                      <Badge variant="secondary" className="ml-auto">Website</Badge>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => {
                        navigator.clipboard.writeText(generateBadgeUrl(badgeConfig));
                        toast.success('URL copied!');
                      }}
                      disabled={!badgeConfig.label || !badgeConfig.message}
                    >
                      <Link className="h-4 w-4" />
                      Copy URL
                      <Badge variant="secondary" className="ml-auto">Direct</Badge>
                    </Button>
                  </div>
                  
                  {selectedBadges.length > 1 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium mb-3">Badge Collection ({selectedBadges.length} badges)</p>
                      <Button 
                        variant="secondary"
                        className="w-full gap-2"
                        onClick={() => {
                          const allMarkdown = selectedBadges.map(badge => generateMarkdown(badge)).join(' ');
                          navigator.clipboard.writeText(allMarkdown);
                          toast.success('All badges copied!');
                        }}
                      >
                        <Package className="h-4 w-4" />
                        Export All Badges
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Features - Collapsible */}
        <div className="mt-12 max-w-5xl mx-auto">
          <Card className="glass shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Settings className="h-5 w-5 text-primary" />
                Advanced Features
              </CardTitle>
              <CardDescription>
                Explore more powerful badge creation tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="suggestions" className="gap-2">
                    <Brain className="h-4 w-4" />
                    Smart Suggestions
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    All Templates
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="gap-2">
                    <Paintbrush className="h-4 w-4" />
                    Custom Design
                  </TabsTrigger>
                  <TabsTrigger value="batch" className="gap-2">
                    <Layers className="h-4 w-4" />
                    Batch Create
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="suggestions" className="mt-0">
                  <RepositoryAnalysis 
                    onBadgesGenerated={(badges) => {
                      setSelectedBadges(badges);
                      if (badges.length > 0) {
                        setBadgeConfig(badges[0]);
                      }
                      toast.success(`Generated ${badges.length} badges!`);
                    }}
                    onCollectionSelected={() => setActiveTab('collections')}
                  />
                </TabsContent>
                
                <TabsContent value="templates" className="mt-0">
                  <BadgeTemplates onTemplateSelect={handleTemplateSelect} />
                </TabsContent>
                
                <TabsContent value="custom" className="mt-0">
                  <CustomBadgeDesigner 
                    initialConfig={badgeConfig}
                    onApplyCustom={(customConfig) => {
                      setBadgeConfig({
                        label: customConfig.label,
                        message: customConfig.message,
                        labelColor: customConfig.labelColor || '#555',
                        messageColor: customConfig.messageColor || '#007ec6',
                        style: 'flat',
                        isCustom: true
                      });
                      toast.success('Custom badge applied!');
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="batch" className="mt-0">
                  <BatchGenerator initialBadges={[badgeConfig]} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-4 text-lg">
              Made with ❤️ using Next.js, Tailwind CSS, and shadcn/ui
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Badge variant="outline" className="px-3 py-1">Open Source</Badge>
              <Badge variant="outline" className="px-3 py-1">MIT License</Badge>
              <Badge variant="outline" className="px-3 py-1">TypeScript</Badge>
              <Badge variant="outline" className="px-3 py-1">React 19</Badge>
              <Badge variant="outline" className="px-3 py-1">Next.js 15</Badge>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}