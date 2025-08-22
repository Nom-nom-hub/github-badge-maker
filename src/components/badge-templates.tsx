"use client";

import React, { useState, useEffect } from 'react';
import { BadgeTemplate, BadgeConfig } from '@/lib/types';
import { getTemplatesByCategory } from '@/lib/badge-templates';
import { generateBadgeUrl } from '@/lib/badge-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Wand2, Sparkles, Zap, Filter, Star } from 'lucide-react';

interface BadgeTemplatesProps {
  onTemplateSelect: (config: Partial<BadgeTemplate['config']>) => void;
}

export function BadgeTemplates({ onTemplateSelect }: BadgeTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [templates, setTemplates] = useState<Record<string, BadgeTemplate[]>>({});
  const [loading, setLoading] = useState(true);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const templatesByCategory = getTemplatesByCategory();
        setTemplates(templatesByCategory);
      } catch (error) {
        console.error('Failed to load templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const categories = Object.keys(templates);
  
  const filteredTemplates = React.useMemo(() => {
    let allTemplates: BadgeTemplate[] = [];
    
    if (selectedCategory === 'all') {
      allTemplates = Object.values(templates).flat();
    } else {
      allTemplates = templates[selectedCategory] || [];
    }
    
    if (!searchTerm) return allTemplates;
    
    return allTemplates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [templates, searchTerm, selectedCategory]);

  const handleTemplateClick = (template: BadgeTemplate) => {
    onTemplateSelect(template.config);
  };

  const popularCategories = ['Build Status', 'Technology', 'License'];
  const totalTemplates = Object.values(templates).flat().length;

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-10 bg-muted rounded" />
        </div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 bg-muted rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
            Badge Templates
          </h3>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          <Star className="h-2 w-2" />
          {totalTemplates} templates
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="space-y-3 group">
          <Label htmlFor="template-search" className="text-sm font-medium flex items-center gap-2">
            <Search className="h-3 w-3 text-muted-foreground" />
            Search Templates
            <div className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="template-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, description, or category..."
              className="pl-10 glass hover:border-primary/50 focus:border-primary transition-all duration-200"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3 w-3 text-muted-foreground" />
            <Label className="text-sm font-medium">Filter by Category</Label>
          </div>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto bg-muted/50">
              <TabsTrigger 
                value="all" 
                className="text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200"
              >
                All ({totalTemplates})
              </TabsTrigger>
              {categories.slice(0, 3).map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className="text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-200"
                >
                  {category} ({templates[category]?.length || 0})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {categories.length > 3 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.slice(3).map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 interactive ${
                    selectedCategory === category ? 'pulse-glow' : 'hover:bg-primary/10'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({templates[category]?.length || 0})
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="space-y-4">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12 animate-slide-in-up">
            <div className="space-y-3">
              <div className="h-16 w-16 rounded-full bg-muted/50 mx-auto flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-muted-foreground">
                {searchTerm ? (
                  <>
                    No templates found matching <strong>"{searchTerm}"</strong>
                    <br />
                    <span className="text-sm">Try adjusting your search or browse by category</span>
                  </>
                ) : (
                  'No templates available in this category.'
                )}
              </div>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSearchTerm('')}
                  className="gap-2"
                >
                  <Search className="h-3 w-3" />
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredTemplates.map((template, index) => (
              <div
                key={template.id}
                className="animate-slide-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TemplateCard
                  template={template}
                  onClick={() => handleTemplateClick(template)}
                  isHovered={hoveredTemplate === template.id}
                  onHover={(hovered) => setHoveredTemplate(hovered ? template.id : null)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="pt-6 border-t border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Zap className="h-3 w-3" />
            Quick Access
          </div>
          <div className="text-xs text-muted-foreground">
            Popular categories
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {popularCategories.map(category => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setSearchTerm('');
              }}
              className="gap-2 hover-glow transition-all duration-200"
            >
              <Wand2 className="h-3 w-3" />
              {category}
              <Badge variant="secondary" className="text-xs ml-1">
                {templates[category]?.length || 0}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: BadgeTemplate;
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

function TemplateCard({ template, onClick, isHovered, onHover }: TemplateCardProps) {
  const [badgeUrl, setBadgeUrl] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const config = {
      label: template.config.label || 'label',
      message: template.config.message || 'message',
      labelColor: template.config.labelColor || '#555',
      messageColor: template.config.messageColor || '#4c1',
      style: template.config.style || 'flat'
    };
    
    setBadgeUrl(generateBadgeUrl(config as BadgeConfig));
  }, [template]);

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-enhanced-md glass border-border/50 ${
        isHovered ? 'shadow-enhanced-lg scale-[1.02] border-primary/50' : 'hover:border-primary/30'
      }`}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between group">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm truncate">{template.name}</h4>
                  <div className={`h-1.5 w-1.5 rounded-full bg-primary transition-all duration-200 ${
                    isHovered ? 'opacity-100 scale-125' : 'opacity-0'
                  }`} />
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{template.description}</p>
                <Badge 
                  variant="secondary" 
                  className={`text-xs transition-all duration-200 ${
                    isHovered ? 'bg-primary/20 text-primary' : ''
                  }`}
                >
                  {template.category}
                </Badge>
              </div>
              
              <div className="flex items-center">
                <div className={`transition-all duration-300 ${
                  isHovered ? 'scale-110' : ''
                }`}>
                  {badgeUrl && (
                    <img
                      src={badgeUrl}
                      alt={template.name}
                      onLoad={() => setImageLoaded(true)}
                      className={`transition-all duration-200 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}
                  {!imageLoaded && (
                    <div className="w-20 h-5 bg-muted rounded animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className={`ml-3 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Wand2 className="h-3 w-3 text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}