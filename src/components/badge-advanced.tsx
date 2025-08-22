'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Sparkles, 
  Palette, 
  Zap, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Wand2,
  Layers,
  Brush
} from 'lucide-react';
import { 
  AdvancedBadgeConfig, 
  ANIMATION_PRESETS, 
  GRADIENT_PRESETS, 
  SHADOW_PRESETS,
  DEFAULT_ADVANCED_CONFIG,
  generateAdvancedBadgeCSS,
  applyAdvancedStyles
} from '@/lib/badge-advanced';
import { BadgeConfig } from '@/lib/types';

interface BadgeAdvancedProps {
  config: BadgeConfig;
  onChange: (config: Partial<AdvancedBadgeConfig>) => void;
}

export function BadgeAdvanced({ config, onChange }: BadgeAdvancedProps) {
  const [advancedConfig, setAdvancedConfig] = useState<AdvancedBadgeConfig>({
    ...config,
    ...DEFAULT_ADVANCED_CONFIG
  } as AdvancedBadgeConfig);
  const [previewElement, setPreviewElement] = useState<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (previewElement && advancedConfig) {
      applyAdvancedStyles(previewElement, advancedConfig);
    }
  }, [advancedConfig, previewElement]);

  const handleAdvancedChange = (key: keyof AdvancedBadgeConfig, value: any) => {
    const newConfig = { ...advancedConfig, [key]: value };
    setAdvancedConfig(newConfig);
    onChange(newConfig);
  };

  const handleGradientPreset = (presetName: string) => {
    const colors = GRADIENT_PRESETS[presetName as keyof typeof GRADIENT_PRESETS];
    if (colors) {
      handleAdvancedChange('gradientColors', colors);
      handleAdvancedChange('useGradient', true);
    }
  };

  const resetToDefault = () => {
    const defaultConfig = { ...config, ...DEFAULT_ADVANCED_CONFIG } as AdvancedBadgeConfig;
    setAdvancedConfig(defaultConfig);
    onChange(defaultConfig);
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    if (previewElement) {
      if (isAnimating) {
        previewElement.style.animationPlayState = 'paused';
      } else {
        previewElement.style.animationPlayState = 'running';
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              Advanced Styling
            </CardTitle>
            <CardDescription>
              Add animations, gradients, and advanced effects
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={toggleAnimation}>
              {isAnimating ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
            <Button size="sm" variant="outline" onClick={resetToDefault}>
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="animation" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="animation" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Motion
            </TabsTrigger>
            <TabsTrigger value="gradient" className="text-xs">
              <Palette className="h-3 w-3 mr-1" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="effects" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Effects
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="animation" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="animation">Animation Type</Label>
                <Select 
                  value={advancedConfig.animation} 
                  onValueChange={(value) => handleAdvancedChange('animation', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="pulse">Pulse</SelectItem>
                    <SelectItem value="bounce">Bounce</SelectItem>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="slide">Slide</SelectItem>
                    <SelectItem value="glow">Glow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {advancedConfig.animation !== 'none' && (
                <>
                  <div>
                    <Label>Animation Duration: {advancedConfig.animationDuration}s</Label>
                    <Slider
                      value={[advancedConfig.animationDuration || 2]}
                      onValueChange={([value]) => handleAdvancedChange('animationDuration', value)}
                      max={10}
                      min={0.5}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Animation Delay: {advancedConfig.animationDelay}s</Label>
                    <Slider
                      value={[advancedConfig.animationDelay || 0]}
                      onValueChange={([value]) => handleAdvancedChange('animationDelay', value)}
                      max={5}
                      min={0}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gradient" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="useGradient"
                  checked={advancedConfig.useGradient || false}
                  onCheckedChange={(checked: boolean) => handleAdvancedChange('useGradient', checked)}
                />
                <Label htmlFor="useGradient">Enable Gradient</Label>
              </div>

              {advancedConfig.useGradient && (
                <>
                  <div>
                    <Label>Gradient Direction</Label>
                    <Select 
                      value={advancedConfig.gradientDirection} 
                      onValueChange={(value) => handleAdvancedChange('gradientDirection', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="horizontal">Horizontal</SelectItem>
                        <SelectItem value="vertical">Vertical</SelectItem>
                        <SelectItem value="diagonal">Diagonal</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Gradient Colors</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <Label className="text-xs">Start</Label>
                        <Input
                          type="color"
                          value={advancedConfig.gradientColors?.[0] || '#ff7e5f'}
                          onChange={(e) => {
                            const colors = advancedConfig.gradientColors || ['#ff7e5f', '#feb47b'];
                            handleAdvancedChange('gradientColors', [e.target.value, colors[1]]);
                          }}
                          className="h-8 p-1 border-2"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">End</Label>
                        <Input
                          type="color"
                          value={advancedConfig.gradientColors?.[1] || '#feb47b'}
                          onChange={(e) => {
                            const colors = advancedConfig.gradientColors || ['#ff7e5f', '#feb47b'];
                            handleAdvancedChange('gradientColors', [colors[0], e.target.value]);
                          }}
                          className="h-8 p-1 border-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Gradient Presets</Label>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {Object.entries(GRADIENT_PRESETS).map(([name, colors]) => (
                        <Button
                          key={name}
                          variant="outline"
                          size="sm"
                          className="h-8 p-1"
                          style={{
                            background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`
                          }}
                          onClick={() => handleGradientPreset(name)}
                          title={name}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label>Shadow Effect</Label>
                <Select 
                  value={advancedConfig.shadow} 
                  onValueChange={(value) => handleAdvancedChange('shadow', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                    <SelectItem value="glow">Glow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {advancedConfig.shadow === 'glow' && (
                <div>
                  <Label>Glow Color</Label>
                  <Input
                    type="color"
                    value={advancedConfig.shadowColor || '#3b82f6'}
                    onChange={(e) => handleAdvancedChange('shadowColor', e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="textShadow"
                    checked={advancedConfig.textShadow || false}
                    onCheckedChange={(checked: boolean) => handleAdvancedChange('textShadow', checked)}
                  />
                  <Label htmlFor="textShadow">Text Shadow</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="textGlow"
                    checked={advancedConfig.textGlow || false}
                    onCheckedChange={(checked: boolean) => handleAdvancedChange('textGlow', checked)}
                  />
                  <Label htmlFor="textGlow">Text Glow</Label>
                </div>
              </div>

              <div>
                <Label>Font Weight</Label>
                <Select 
                  value={advancedConfig.fontWeight} 
                  onValueChange={(value) => handleAdvancedChange('fontWeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="semibold">Semibold</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label>Border Radius: {advancedConfig.borderRadius}px</Label>
                <Slider
                  value={[advancedConfig.borderRadius || 3]}
                  onValueChange={([value]) => handleAdvancedChange('borderRadius', value)}
                  max={20}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Border Width: {advancedConfig.borderWidth}px</Label>
                <Slider
                  value={[advancedConfig.borderWidth || 0]}
                  onValueChange={([value]) => handleAdvancedChange('borderWidth', value)}
                  max={5}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>

              {(advancedConfig.borderWidth || 0) > 0 && (
                <div>
                  <Label>Border Color</Label>
                  <Input
                    type="color"
                    value={advancedConfig.borderColor || '#000000'}
                    onChange={(e) => handleAdvancedChange('borderColor', e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
              )}

              <Separator />

              <div className="flex items-center space-x-2">
                <Switch
                  id="responsive"
                  checked={advancedConfig.responsive || false}
                  onCheckedChange={(checked: boolean) => handleAdvancedChange('responsive', checked)}
                />
                <Label htmlFor="responsive">Responsive Design</Label>
              </div>

              {advancedConfig.responsive && (
                <div>
                  <Label>Mobile Scale: {Math.round((advancedConfig.mobileScale || 0.9) * 100)}%</Label>
                  <Slider
                    value={[advancedConfig.mobileScale || 0.9]}
                    onValueChange={([value]) => handleAdvancedChange('mobileScale', value)}
                    max={1.2}
                    min={0.5}
                    step={0.05}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}