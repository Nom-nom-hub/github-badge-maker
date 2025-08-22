"use client";

import React, { useState, useEffect } from 'react';
import { BadgeTemplate, BadgeConfig } from '@/lib/types';
import { getTemplatesByCategory } from '@/lib/badge-templates';
import { generateBadgeUrl } from '@/lib/badge-utils';
import { badgeAnalytics } from '@/lib/badge-analytics';
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
    // Track template usage for analytics
    try {
      badgeAnalytics.trackBadgeUsage(
        template.id,
        template.name,
        template.category,
        template.config
      );
    } catch (error) {
      console.warn('Failed to track template usage:', error);
    }
    
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
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex items-center justify-between pb-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              Badge Templates
            </h3>
            <p className="text-sm text-muted-foreground">
              Professional templates for every scenario
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3" />
            {totalTemplates} templates
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {categories.length} categories
          </Badge>
        </div>
      </div>

      {/* Search Bar */}
      <div className="space-y-2">
        <Label htmlFor="template-search" className="text-sm font-medium flex items-center gap-2">
          <Search className="h-3 w-3 text-muted-foreground" />
          Search Templates
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="template-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, description, or category..."
            className="pl-10 h-11 glass hover:border-primary/50 focus:border-primary transition-all duration-200"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter - Improved Layout */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Filter by Category</Label>
        </div>
        
        {/* Primary Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="justify-start gap-2 h-9"
          >
            All
            <Badge variant="secondary" className="text-xs ml-auto">
              {totalTemplates}
            </Badge>
          </Button>
          {categories.slice(0, 3).map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="justify-start gap-2 h-9 text-left"
            >
              <span className="truncate">{category}</span>
              <Badge variant="secondary" className="text-xs ml-auto">
                {templates[category]?.length || 0}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Secondary Categories - Collapsible */}
        {categories.length > 3 && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {categories.slice(3).map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="justify-between h-8 text-xs"
                >
                  <span className="truncate">{category}</span>
                  <Badge variant="secondary" className="text-xs ml-1">
                    {templates[category]?.length || 0}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Templates Grid */}
      <div className="space-y-6">
        {/* Results Header */}
        {filteredTemplates.length > 0 && (
          <div className="flex items-center justify-between pb-3 border-b border-border/20">
            <div className="text-sm text-muted-foreground">
              {searchTerm ? (
                <>
                  <span className="font-medium">{filteredTemplates.length}</span> results for 
                  <span className="font-medium text-foreground">&ldquo;{searchTerm}&rdquo;</span>
                </>
              ) : selectedCategory === 'all' ? (
                <>
                  Showing <span className="font-medium">{filteredTemplates.length}</span> templates
                </>
              ) : (
                <>
                  <span className="font-medium">{filteredTemplates.length}</span> templates in 
                  <span className="font-medium text-foreground">{selectedCategory}</span>
                </>
              )}
            </div>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="gap-2 text-xs"
              >
                ✕ Clear filters
              </Button>
            )}
          </div>
        )}

        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 animate-slide-in-up">
            <div className="space-y-4">
              <div className="h-20 w-20 rounded-2xl bg-muted/30 mx-auto flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">
                  {searchTerm ? 'No templates found' : 'No templates available'}
                </h4>
                <div className="text-sm text-muted-foreground max-w-sm mx-auto">
                  {searchTerm ? (
                    <>
                      No templates match <strong>&ldquo;{searchTerm}&rdquo;</strong>.
                      Try adjusting your search or browse by category.
                    </>
                  ) : (
                    'No templates available in this category.'
                  )}
                </div>
              </div>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSearchTerm('')}
                  className="gap-2 mt-4"
                >
                  <Search className="h-3 w-3" />
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredTemplates.map((template, index) => (
              <div
                key={template.id}
                className="animate-slide-in-up"
                style={{ animationDelay: `${Math.min(index * 0.03, 0.5)}s` }}
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
      style: template.config.style || 'flat',
      logoSvg: template.config.logoSvg
    };
    
    setBadgeUrl(generateBadgeUrl(config as BadgeConfig));
  }, [template]);

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 group glass border-border/50 ${
        isHovered ? 'shadow-enhanced-lg border-primary/50 bg-primary/5' : 'hover:border-primary/30 hover:shadow-enhanced-md'
      }`}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Header with category */}
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className={`text-xs font-medium transition-all duration-200 ${
                isHovered ? 'bg-primary/20 text-primary border-primary/30' : ''
              }`}
            >
              {template.category}
            </Badge>
            <div className={`transition-all duration-200 ${
              isHovered ? 'opacity-100 scale-110' : 'opacity-60 group-hover:opacity-80'
            }`}>
              <Wand2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Title and description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-base text-foreground line-clamp-1">
                {template.name}
              </h4>
              <div className={`h-1.5 w-1.5 rounded-full bg-primary transition-all duration-200 ${
                isHovered ? 'opacity-100 scale-125' : 'opacity-0'
              }`} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {template.description}
            </p>
          </div>

          {/* Badge preview */}
          <div className="flex items-center justify-center py-3">
            <div className={`transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}>
              {badgeUrl && (
                <img
                  src={badgeUrl}
                  alt={template.name}
                  onLoad={() => setImageLoaded(true)}
                  className={`transition-all duration-200 max-h-6 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                />
              )}
              {!imageLoaded && (
                <div className="w-24 h-5 bg-muted/50 rounded animate-pulse" />
              )}
            </div>
          </div>

          {/* Action hint */}
          <div className={`flex items-center justify-center transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}>
            <div className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
              Click to apply
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}