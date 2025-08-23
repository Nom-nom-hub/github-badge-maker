"use client";

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BadgeConfig, BADGE_STYLES, COMMON_COLORS } from '@/lib/types';
import { Palette, RotateCcw, Sparkles, Type, Zap, Image as ImageIcon, ChevronDown, Settings2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BadgeAdvanced } from '@/components/badge-advanced';
import { AdvancedBadgeConfig } from '@/lib/badge-advanced';

interface BadgeFormProps {
  config: BadgeConfig;
  onChange: (config: Partial<BadgeConfig>) => void;
}

export function BadgeForm({ config, onChange }: BadgeFormProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const handleInputChange = (field: keyof BadgeConfig, value: string | number | undefined) => {
    onChange({ [field]: value });
  };

  const handleAdvancedChange = (advancedConfig: Partial<AdvancedBadgeConfig>) => {
    onChange(advancedConfig);
  };

  const resetToDefaults = () => {
    onChange({
      label: 'build',
      message: 'passing',
      labelColor: '#555',
      messageColor: '#4c1',
      style: 'flat',
      logoSvg: undefined,
      logoColor: undefined,
      logoWidth: undefined
    });
  };

  return (
    <div className="space-y-8">
      {/* Basic Configuration */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Type className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
            Text Content
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 group">
            <Label htmlFor="label" className="text-sm font-medium flex items-center gap-2">
              Label
              <div className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Label>
            <Input
              id="label"
              value={config.label}
              onChange={(e) => handleInputChange('label', e.target.value)}
              placeholder="e.g., build, version, license"
              className="font-mono transition-all duration-200 hover:border-primary/50 focus:border-primary glass"
            />
          </div>
          
          <div className="space-y-3 group">
            <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
              Message
              <div className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Label>
            <Input
              id="message"
              value={config.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="e.g., passing, v1.0.0, MIT"
              className="font-mono transition-all duration-200 hover:border-primary/50 focus:border-primary glass"
            />
          </div>
        </div>

        <div className="space-y-3 group">
          <Label htmlFor="style" className="text-sm font-medium flex items-center gap-2">
            Badge Style
            <Sparkles className="h-3 w-3 text-accent" />
          </Label>
          <Select value={config.style} onValueChange={(value) => handleInputChange('style', value)}>
            <SelectTrigger className="glass hover:border-primary/50 transition-all duration-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass">
              {BADGE_STYLES.map(style => (
                <SelectItem key={style.value} value={style.value} className="hover:bg-accent/50">
                  <div className="py-1">
                    <div className="font-medium flex items-center gap-2">
                      <Zap className="h-3 w-3 text-primary" />
                      {style.label}
                    </div>
                    <div className="text-sm text-muted-foreground">{style.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Colors */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-4 w-4 text-accent" />
          <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
            Color Scheme
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 group">
            <Label htmlFor="labelColor" className="text-sm font-medium flex items-center gap-2">
              Label Color
              <div 
                className="h-3 w-3 rounded-full border border-border shadow-sm" 
                style={{ backgroundColor: config.labelColor }}
              />
            </Label>
            <div className="flex gap-3">
              <Input
                id="labelColor"
                value={config.labelColor}
                onChange={(e) => handleInputChange('labelColor', e.target.value)}
                placeholder="#555555"
                className="font-mono flex-1 glass hover:border-primary/50 focus:border-primary transition-all duration-200"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="px-3 glass hover-glow transition-all duration-200"
                  >
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 glass animate-scale-in">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Choose a color</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {COMMON_COLORS.map(color => (
                        <button
                          key={color.value}
                          className="group relative w-10 h-10 rounded-lg border border-border hover:border-primary transition-all duration-200 hover:scale-110 interactive"
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleInputChange('labelColor', color.value)}
                          title={color.name}
                        >
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-3 group">
            <Label htmlFor="messageColor" className="text-sm font-medium flex items-center gap-2">
              Message Color
              <div 
                className="h-3 w-3 rounded-full border border-border shadow-sm" 
                style={{ backgroundColor: config.messageColor }}
              />
            </Label>
            <div className="flex gap-3">
              <Input
                id="messageColor"
                value={config.messageColor}
                onChange={(e) => handleInputChange('messageColor', e.target.value)}
                placeholder="#4c1e00"
                className="font-mono flex-1 glass hover:border-primary/50 focus:border-primary transition-all duration-200"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="px-3 glass hover-glow transition-all duration-200"
                  >
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 glass animate-scale-in">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Choose a color</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {COMMON_COLORS.map(color => (
                        <button
                          key={color.value}
                          className="group relative w-10 h-10 rounded-lg border border-border hover:border-primary transition-all duration-200 hover:scale-110 interactive"
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleInputChange('messageColor', color.value)}
                          title={color.name}
                        >
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Logo Configuration */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="h-4 w-4 text-secondary" />
          <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
            Logo & Icons
            <span className="text-xs font-normal text-muted-foreground ml-2">(Optional)</span>
          </h3>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3 group">
            <Label htmlFor="logoSvg" className="text-sm font-medium flex items-center gap-2">
              Logo SVG or Icon Name
              <div className="h-1 w-1 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Label>
            <Input
              id="logoSvg"
              value={config.logoSvg || ''}
              onChange={(e) => handleInputChange('logoSvg', e.target.value)}
              placeholder="e.g., github, react, nodejs, or custom SVG"
              className="font-mono glass hover:border-primary/50 focus:border-primary transition-all duration-200"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              ✨ Use popular icon names like <code className="px-1 py-0.5 rounded bg-muted font-mono">github</code>, 
              <code className="px-1 py-0.5 rounded bg-muted font-mono">react</code>, or 
              <code className="px-1 py-0.5 rounded bg-muted font-mono">nodejs</code>
            </p>
          </div>

          {config.logoSvg && (
            <div className="animate-slide-in-up space-y-6 p-4 rounded-lg bg-muted/20 border border-border/50">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="h-3 w-3" />
                Logo Customization
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 group">
                  <Label htmlFor="logoColor" className="text-sm font-medium flex items-center gap-2">
                    Logo Color
                    {config.logoColor && (
                      <div 
                        className="h-3 w-3 rounded-full border border-border shadow-sm" 
                        style={{ backgroundColor: config.logoColor }}
                      />
                    )}
                  </Label>
                  <Input
                    id="logoColor"
                    value={config.logoColor || ''}
                    onChange={(e) => handleInputChange('logoColor', e.target.value)}
                    placeholder="#ffffff (optional)"
                    className="font-mono glass hover:border-primary/50 focus:border-primary transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-3 group">
                  <Label htmlFor="logoWidth" className="text-sm font-medium flex items-center gap-2">
                    Logo Width (px)
                    <div className="h-1 w-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Label>
                  <Input
                    id="logoWidth"
                    type="number"
                    value={config.logoWidth || ''}
                    onChange={(e) => handleInputChange('logoWidth', e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="14"
                    min="10"
                    max="30"
                    className="glass hover:border-primary/50 focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}        
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Advanced Customization */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between hover:bg-accent/50 transition-all duration-200 p-4 h-auto"
          >
            <div className="flex items-center gap-3">
              <Settings2 className="h-4 w-4 text-primary" />
              <div className="text-left">
                <h3 className="font-semibold text-sm text-foreground">
                  Advanced Customization
                </h3>
                <p className="text-xs text-muted-foreground">
                  Animations, gradients, effects & more
                </p>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
              isAdvancedOpen ? 'rotate-180' : ''
            }`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 animate-slide-in-up">
          <div className="pt-4">
            <BadgeAdvanced 
              config={config} 
              onChange={handleAdvancedChange}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="bg-border/50" />

      {/* Actions */}
      <div className="flex justify-between items-center pt-4">
        <div className="text-xs text-muted-foreground">
          ✨ Changes are applied instantly
        </div>
        <Button 
          variant="outline" 
          onClick={resetToDefaults} 
          className="gap-2 hover-glow transition-all duration-200 glass"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}