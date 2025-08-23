"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Zap, 
  Settings, 
  Palette, 
  Download, 
  Copy, 
  Sparkles, 
  Brain, 
  Layers, 
  Paintbrush,
  ArrowRight,
  CheckCircle,
  Play,
  Eye,
  Code,
  FileText,
  Link as LinkIcon,
  Type,
  Wand2,
  Star,
  Github,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

const tutorialSteps = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of creating your first badge",
    icon: Play,
    color: "text-blue-500"
  },
  {
    id: "customization",
    title: "Customization",
    description: "Explore colors, styles, and text options",
    icon: Settings,
    color: "text-purple-500"
  },
  {
    id: "advanced",
    title: "Advanced Features",
    description: "AI suggestions, templates, and batch creation",
    icon: Wand2,
    color: "text-orange-500"
  },
  {
    id: "export",
    title: "Export & Share",
    description: "Get badges in multiple formats",
    icon: Download,
    color: "text-green-500"
  }
];

const quickExamples = [
  {
    title: "Build Status",
    badges: [
      "https://img.shields.io/badge/Build-Passing-brightgreen",
      "https://img.shields.io/badge/Tests-95%25-success",
      "https://img.shields.io/badge/Coverage-90%25-green"
    ]
  },
  {
    title: "Technologies",
    badges: [
      "https://img.shields.io/badge/React-19-61dafb?logo=react",
      "https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript", 
      "https://img.shields.io/badge/Node.js-18+-339933?logo=node.js"
    ]
  },
  {
    title: "Project Info",
    badges: [
      "https://img.shields.io/badge/License-MIT-blue",
      "https://img.shields.io/badge/Version-v2.1.0-orange",
      "https://img.shields.io/badge/Status-Active-success"
    ]
  }
];

export default function TutorialPage() {
  const [activeStep, setActiveStep] = useState("getting-started");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const markComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      toast.success("Step completed! 🎉");
    }
  };

  const copyCode = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 glass backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">Badge Maker Tutorial</h1>
                <p className="text-sm text-muted-foreground">Complete guide to creating professional badges</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Star className="h-3 w-3" />
                Complete Guide
              </Badge>
              <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Try the App
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Master 
            <span className="gradient-text"> Badge Creation </span>
            in Minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn everything about creating beautiful, professional badges for your GitHub repositories and projects.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => setActiveStep("getting-started")} className="gap-2">
              <Play className="h-4 w-4" />
              Start Tutorial
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <a href="#examples">
                <Eye className="h-4 w-4" />
                See Examples
              </a>
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Tutorial Progress</h3>
            <Badge variant="outline">{completedSteps.length} / {tutorialSteps.length} completed</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tutorialSteps.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              const isActive = activeStep === step.id;
              const Icon = step.icon;
              
              return (
                <Card 
                  key={step.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isActive ? 'ring-2 ring-primary' : ''
                  } ${isCompleted ? 'bg-primary/5' : ''}`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-muted/50 ${step.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <h4 className="font-medium mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tutorial Content */}
        <Tabs value={activeStep} onValueChange={setActiveStep} className="space-y-6">
          <TabsList className="hidden" />
          
          <TabsContent value="getting-started">
            <Card className="glass shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Play className="h-6 w-6 text-blue-500" />
                  Getting Started - Your First Badge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        1. Enter Your Text
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Label:</strong> Left part (e.g., &quot;Build&quot;)</li>
                        <li>• <strong>Message:</strong> Right part (e.g., &quot;Passing&quot;)</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        2. Choose Colors
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use color picker for quick selection</li>
                        <li>• Or enter hex codes manually</li>
                        <li>• NEW: Custom text colors available!</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        3. Preview & Export
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• See real-time preview</li>
                        <li>• Copy Markdown, HTML, or URL</li>
                        <li>• Paste into your README!</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Example</h3>
                    <div className="p-6 bg-muted/20 rounded-lg border-2 border-dashed text-center">
                      <Image
                        src="https://img.shields.io/badge/Tutorial-Getting_Started-blue"
                        alt="Tutorial Badge"
                        width={160}
                        height={32}
                        className="mx-auto mb-4"
                        unoptimized
                      />
                      <p className="text-sm text-muted-foreground mb-4">
                        This badge was created with:<br />
                        Label: &quot;Tutorial&quot; | Message: &quot;Getting Started&quot;
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyCode('![Tutorial](https://img.shields.io/badge/Tutorial-Getting_Started-blue)')}
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copy Markdown
                      </Button>
                    </div>
                    
                    <Button 
                      onClick={() => markComplete("getting-started")}
                      className="w-full gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Complete Step 1
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization">
            <Card className="glass shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Settings className="h-6 w-6 text-purple-500" />
                  Customization Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Badge Styles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: "Flat", url: "https://img.shields.io/badge/Style-Flat-blue?style=flat" },
                      { name: "Flat Square", url: "https://img.shields.io/badge/Style-Square-blue?style=flat-square" },
                      { name: "For the Badge", url: "https://img.shields.io/badge/Style-Badge-blue?style=for-the-badge" }
                    ].map((style) => (
                      <div key={style.name} className="text-center p-4 bg-muted/20 rounded-lg">
                        <Image src={style.url} alt={style.name} width={140} height={28} className="mx-auto mb-2" unoptimized />
                        <p className="text-sm font-medium">{style.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">NEW: Text Color Control</h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                      🎉 <strong>New Feature!</strong> You can now customize text colors!
                    </p>
                    <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                      <li>• Set different colors for label and message text</li>
                      <li>• Creates custom SVG badges with full control</li>
                      <li>• Leave empty for automatic contrast</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Popular Icons</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "GitHub", url: "https://img.shields.io/badge/GitHub-Repo-black?logo=github" },
                      { name: "React", url: "https://img.shields.io/badge/React-App-61dafb?logo=react" },
                      { name: "Node.js", url: "https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js" },
                      { name: "TypeScript", url: "https://img.shields.io/badge/TypeScript-Lang-3178c6?logo=typescript" }
                    ].map((tech) => (
                      <div key={tech.name} className="text-center p-3 bg-muted/20 rounded-lg">
                        <Image src={tech.url} alt={tech.name} width={120} height={20} className="mx-auto mb-2" unoptimized />
                        <p className="text-xs font-medium">{tech.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={() => markComplete("customization")} className="w-full gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Complete Step 2
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card className="glass shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Wand2 className="h-6 w-6 text-orange-500" />
                  Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-4">
                    <Brain className="h-8 w-8 text-blue-500 mb-3" />
                    <h4 className="font-medium mb-2">Smart AI Suggestions</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Analyze your repository and get badge suggestions automatically.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Detects technologies</li>
                      <li>• Suggests relevant badges</li>
                      <li>• One-click application</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <Sparkles className="h-8 w-8 text-purple-500 mb-3" />
                    <h4 className="font-medium mb-2">200+ Templates</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Professional templates for every use case and technology.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Development badges</li>
                      <li>• Language badges</li>
                      <li>• Platform badges</li>
                    </ul>
                  </Card>

                  <Card className="p-4">
                    <Layers className="h-8 w-8 text-green-500 mb-3" />
                    <h4 className="font-medium mb-2">Batch Creation</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create multiple badges at once for maximum efficiency.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Technology stacks</li>
                      <li>• Project dashboards</li>
                      <li>• Export all together</li>
                    </ul>
                  </Card>
                </div>

                <Button onClick={() => markComplete("advanced")} className="w-full gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Complete Step 3
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card className="glass shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Download className="h-6 w-6 text-green-500" />
                  Export & Share
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Markdown",
                      icon: FileText,
                      description: "For GitHub README",
                      example: "![Badge](url)"
                    },
                    {
                      title: "HTML",
                      icon: Code,
                      description: "For websites",
                      example: "<img src='url' />"
                    },
                    {
                      title: "URL",
                      icon: LinkIcon,
                      description: "Direct image link",
                      example: "https://img.shields.io/..."
                    },
                    {
                      title: "Custom SVG",
                      icon: Paintbrush,
                      description: "With text colors",
                      example: "data:image/svg+xml..."
                    }
                  ].map((format) => (
                    <Card key={format.title} className="p-4 text-center">
                      <format.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <h4 className="font-medium mb-1">{format.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{format.description}</p>
                      <code className="text-xs bg-muted p-1 rounded">{format.example}</code>
                    </Card>
                  ))}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Integration Example</h3>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium mb-2">GitHub README.md</h4>
                    <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
{`# My Awesome Project

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-v2.1.0-orange)

This project is amazing!`}
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 gap-2"
                      onClick={() => copyCode(`# My Awesome Project

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-v2.1.0-orange)

This project is amazing!`)}
                    >
                      <Copy className="h-3 w-3" />
                      Copy Example
                    </Button>
                  </div>
                </div>

                <Button onClick={() => markComplete("export")} className="w-full gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Complete Step 4
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Examples */}
        <div id="examples" className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Quick Examples</h2>
            <p className="text-muted-foreground">See badges in action</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickExamples.map((example, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-4 text-center">{example.title}</h3>
                <div className="space-y-3">
                  {example.badges.map((badge, i) => (
                    <div key={i} className="text-center">
                      <Image src={badge} alt="" width={150} height={20} className="mx-auto" unoptimized />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-primary/5 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Amazing Badges?</h2>
          <p className="text-muted-foreground mb-6">
            Start creating professional badges for your projects now!
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild className="gap-2">
              <Link href="/">
                <Zap className="h-4 w-4" />
                Start Creating
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <a href="https://github.com" target="_blank">
                <Github className="h-4 w-4" />
                View on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}