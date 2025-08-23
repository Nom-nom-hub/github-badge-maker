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
import { Sparkles, Github, Zap, Palette, Brain, Package, BarChart3, Layers, Paintbrush } from 'lucide-react';
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
      <header className="relative z-10 border-b border-border/40 glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Github className="h-8 w-8 text-primary" />
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">
                    Badge Maker
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Create beautiful badges
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="hidden sm:flex items-center gap-1 animate-scale-in">
                <Zap className="h-3 w-3" />
                Real-time
              </Badge>
              {selectedBadges.length > 1 && (
                <Badge variant="default" className="flex items-center gap-1 animate-scale-in bg-primary">
                  <Package className="h-3 w-3" />
                  {selectedBadges.length} badges
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden md:flex">
                <Palette className="h-3 w-3 mr-1" />
                Beautiful UI
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-slide-in-down">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Create 
            <span className="gradient-text"> Beautiful </span>
            Badges
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Design stunning, customizable badges for your GitHub repositories with real-time preview.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Sparkles className="h-3 w-3" />
              200+ Templates
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Brain className="h-3 w-3" />
              Smart AI + Repository Analysis
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Package className="h-3 w-3" />
              Curated Collections
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Layers className="h-3 w-3" />
              Batch Generation
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Zap className="h-3 w-3" />
              Live Preview
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Palette className="h-3 w-3" />
              Full Customization
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Paintbrush className="h-3 w-3" />
              Custom SVG Badges
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Configuration - Takes 2/3 width on large screens */}
          <div className="xl:col-span-2 space-y-6 animate-slide-in-up">
            <Card className="glass shadow-enhanced-lg hover-glow transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      Badge Configuration
                    </CardTitle>
                    <CardDescription className="mt-2 text-base">
                      Customize your badge appearance and content
                    </CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-7 bg-muted/50 h-11">
                    <TabsTrigger 
                      value="create" 
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200 gap-2"
                    >
                      <Zap className="h-4 w-4" />
                      Create
                    </TabsTrigger>
                    <TabsTrigger 
                      value="suggestions"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200 gap-2"
                    >
                      <Brain className="h-4 w-4" />
                      Smart
                    </TabsTrigger>
                    <TabsTrigger 
                      value="collections"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200 gap-2"
                    >
                      <Package className="h-4 w-4" />
                      Sets
                    </TabsTrigger>
                    <TabsTrigger 
                      value="templates"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200 gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Browse
                    </TabsTrigger>
                    <TabsTrigger 
                      value="batch"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200 gap-2"
                    >
                      <Layers className="h-4 w-4" />
                      Batch
                    </TabsTrigger>
                    <TabsTrigger 
                      value="custom"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200 gap-2"
                    >
                      <Paintbrush className="h-4 w-4" />
                      Custom
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200 gap-2"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Stats
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="create" className="mt-8 animate-scale-in">
                    <BadgeForm 
                      config={badgeConfig}
                      onChange={handleConfigChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="suggestions" className="mt-8 animate-scale-in">
                    <div className="space-y-6">
                      <RepositoryAnalysis 
                        onBadgesGenerated={(badges) => {
                          // Set all badges as selected badges
                          setSelectedBadges(badges);
                          // Apply first badge configuration as main
                          if (badges.length > 0) {
                            setBadgeConfig(badges[0]);
                          }
                          setActiveTab('create');
                        }}
                        onCollectionSelected={() => {
                          // This will be handled by the collection selection in collections tab
                          setActiveTab('collections');
                        }}
                      />
                      <BadgeSuggestions 
                        onSelectTemplate={handleTemplateSelectFromSuggestion}
                        onSelectMultiple={handleMultipleTemplateSelect}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="collections" className="mt-8 animate-scale-in">
                    <BadgeCollections 
                      onSelectCollection={handleMultipleTemplateSelect}
                    />
                  </TabsContent>
                  
                  <TabsContent value="templates" className="mt-8 animate-scale-in">
                    <BadgeTemplates onTemplateSelect={handleTemplateSelect} />
                  </TabsContent>
                  
                  <TabsContent value="batch" className="mt-8 animate-scale-in">
                    <BatchGenerator initialBadges={[badgeConfig]} />
                  </TabsContent>
                  
                  <TabsContent value="custom" className="mt-8 animate-scale-in">
                    <CustomBadgeDesigner 
                      initialConfig={badgeConfig}
                      onApplyCustom={(customConfig) => {
                        // Apply the custom badge configuration
                        setBadgeConfig({
                          label: customConfig.label,
                          message: customConfig.message,
                          labelColor: customConfig.labelColor || '#555',
                          messageColor: customConfig.messageColor || '#007ec6',
                          style: 'flat', // Custom badges use flat style
                          isCustom: true // Mark as custom badge
                        });
                        setActiveTab('create');
                      }}
                    />
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="mt-8 animate-scale-in">
                    <BadgeAnalyticsDashboard onSelectFromHistory={handleSelectFromHistory} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Preview and Export - Takes 1/3 width on large screens */}
          <div className="space-y-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="glass shadow-enhanced-lg hover-glow transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      Live Preview
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Real-time preview
                    </CardDescription>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <BadgePreview config={badgeConfig} />
                
                {selectedBadges.length > 1 && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium">Collection Preview ({selectedBadges.length} badges)</h4>
                      <button
                        onClick={() => setSelectedBadges([])}
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedBadges.map((badge, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Image
                              src={generateBadgeUrl(badge)}
                              alt={`${badge.label}: ${badge.message}`}
                              width={100}
                              height={20}
                              className="h-5 w-auto"
                              unoptimized
                            />
                          </div>
                          <button
                            onClick={() => setBadgeConfig(badge)}
                            className="text-xs text-primary hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass shadow-enhanced-lg hover-glow transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                      Export Options
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Get your badge code
                    </CardDescription>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Github className="h-4 w-4 text-secondary-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <BadgeExport config={badgeConfig} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-2">
              Made with ❤️ using Next.js, Tailwind CSS, and shadcn/ui
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline">Open Source</Badge>
              <Badge variant="outline">MIT License</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}