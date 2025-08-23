'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Sparkles, TrendingUp, Zap, Brain, Rocket } from 'lucide-react';
import { badgeSuggestionEngine, ProjectContext, SuggestionGroup } from '@/lib/badge-suggestions';
import { BadgeTemplate } from '@/lib/types';
import { toast } from 'sonner';

interface BadgeSuggestionsProps {
  onSelectTemplate: (template: BadgeTemplate) => void;
  onSelectMultiple: (templates: BadgeTemplate[]) => void;
}

export function BadgeSuggestions({ onSelectTemplate, onSelectMultiple }: BadgeSuggestionsProps) {
  const [context, setContext] = useState<ProjectContext>({});
  const [suggestions, setSuggestions] = useState<SuggestionGroup[]>([]);
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('smart');

  useEffect(() => {
    const newSuggestions = badgeSuggestionEngine.getSuggestions(context);
    setSuggestions(newSuggestions);
  }, [context]);

  const handleContextChange = (key: keyof ProjectContext, value: unknown) => {
    setContext(prev => ({ ...prev, [key]: value }));
  };

  const handleTemplateSelect = (template: BadgeTemplate) => {
    if (selectedTemplates.has(template.id)) {
      setSelectedTemplates(prev => {
        const next = new Set(prev);
        next.delete(template.id);
        return next;
      });
    } else {
      setSelectedTemplates(prev => new Set([...prev, template.id]));
    }
  };

  const handleAddSelected = () => {
    const templates = suggestions
      .flatMap(group => group.templates)
      .filter(template => selectedTemplates.has(template.id));
    
    if (templates.length > 0) {
      onSelectMultiple(templates);
      setSelectedTemplates(new Set());
      toast.success(`Added ${templates.length} badge${templates.length > 1 ? 's' : ''} to your collection!`);
    }
  };

  const handleQuickAdd = (template: BadgeTemplate) => {
    onSelectTemplate(template);
    toast.success(`Added ${template.name} badge!`);
  };

  const trendingCombos = badgeSuggestionEngine.getTrendingCombinations();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Smart Badge Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="smart" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              Smart
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="context" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Setup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="context" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="language">Programming Language</Label>
                <Select onValueChange={(value) => handleContextChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="framework">Framework</Label>
                <Select onValueChange={(value) => handleContextChange('framework', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="nextjs">Next.js</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                    <SelectItem value="django">Django</SelectItem>
                    <SelectItem value="flask">Flask</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="fastapi">FastAPI</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Project Type</Label>
                <Select onValueChange={(value) => handleContextChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Application</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="api">API/Service</SelectItem>
                    <SelectItem value="library">Library</SelectItem>
                    <SelectItem value="game">Game</SelectItem>
                    <SelectItem value="ai">AI/ML</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="hasTests"
                  checked={context.hasTests || false}
                  onCheckedChange={(checked) => handleContextChange('hasTests', checked)}
                />
                <Label htmlFor="hasTests">Has Tests</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="hasCI"
                  checked={context.hasCI || false}
                  onCheckedChange={(checked) => handleContextChange('hasCI', checked)}
                />
                <Label htmlFor="hasCI">Has CI/CD</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isOpenSource"
                  checked={context.isOpenSource || false}
                  onCheckedChange={(checked) => handleContextChange('isOpenSource', checked)}
                />
                <Label htmlFor="isOpenSource">Open Source</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="smart" className="space-y-4 mt-4">
            {suggestions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Configure your project details to get smart suggestions!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedTemplates.size > 0 && (
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm font-medium">
                      {selectedTemplates.size} badge{selectedTemplates.size > 1 ? 's' : ''} selected
                    </span>
                    <Button size="sm" onClick={handleAddSelected}>
                      <Rocket className="h-3 w-3 mr-1" />
                      Add Selected
                    </Button>
                  </div>
                )}
                
                {suggestions.map((group) => (
                  <div key={group.category} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{group.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {group.templates.length}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{group.description}</p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {group.templates.map((template) => (
                        <div
                          key={template.id}
                          className={`flex items-center justify-between p-2 rounded-md border cursor-pointer transition-colors ${
                            selectedTemplates.has(template.id)
                              ? 'bg-primary/10 border-primary'
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-xs font-medium truncate">{template.name}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickAdd(template);
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending" className="space-y-4 mt-4">
            <div className="space-y-4">
              {trendingCombos.map((combo, index) => (
                <Card key={index} className="border-dashed">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        <CardTitle className="text-sm">{combo.name}</CardTitle>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          const templates = suggestions
                            .flatMap(group => group.templates)
                            .filter(template => combo.badges.includes(template.id));
                          onSelectMultiple(templates);
                          toast.success(`Added ${combo.name} combo!`);
                        }}
                      >
                        Add All
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{combo.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {combo.badges.map((badgeId) => (
                        <Badge key={badgeId} variant="secondary" className="text-xs">
                          {badgeId}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}