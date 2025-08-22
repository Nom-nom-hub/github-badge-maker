"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BadgeConfig, DEFAULT_BADGE_CONFIG } from '@/lib/types';
import { BadgeForm } from '@/components/badge-form';
import { BadgePreview } from '@/components/badge-preview';
import { BadgeExport } from '@/components/badge-export';
import { BadgeTemplates } from '@/components/badge-templates';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Github, Zap, Palette } from 'lucide-react';

export function BadgeMaker() {
  const [badgeConfig, setBadgeConfig] = useState<BadgeConfig>(DEFAULT_BADGE_CONFIG);
  const [activeTab, setActiveTab] = useState('create');

  const handleConfigChange = (newConfig: Partial<BadgeConfig>) => {
    setBadgeConfig(prev => ({ ...prev, ...newConfig }));
  };

  const handleTemplateSelect = (templateConfig: Partial<BadgeConfig>) => {
    setBadgeConfig(prev => ({ ...prev, ...templateConfig }));
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
        <div className="text-center mb-12 animate-slide-in-down">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Create 
            <span className="gradient-text"> Beautiful </span>
            Badges
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Design stunning, customizable badges for your GitHub repositories with real-time preview. 
            Choose from professional templates or create your own unique badges.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              30+ Templates
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Live Preview
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Palette className="h-3 w-3" />
              Full Customization
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Configuration */}
          <div className="space-y-6 animate-slide-in-up">
            <Card className="glass shadow-enhanced-lg hover-glow transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      Badge Configuration
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Customize your badge appearance and content
                    </CardDescription>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Palette className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                    <TabsTrigger 
                      value="create" 
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Create Badge
                    </TabsTrigger>
                    <TabsTrigger 
                      value="templates"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Templates
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="create" className="mt-6 animate-scale-in">
                    <BadgeForm 
                      config={badgeConfig}
                      onChange={handleConfigChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="templates" className="mt-6 animate-scale-in">
                    <BadgeTemplates onTemplateSelect={handleTemplateSelect} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Preview and Export */}
          <div className="space-y-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="glass shadow-enhanced-lg hover-glow transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      Live Preview
                    </CardTitle>
                    <CardDescription className="mt-1">
                      See how your badge will look in real-time
                    </CardDescription>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <BadgePreview config={badgeConfig} />
              </CardContent>
            </Card>

            <Card className="glass shadow-enhanced-lg hover-glow transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                      Export Options
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Get your badge in different formats
                    </CardDescription>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Github className="h-4 w-4 text-secondary-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
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