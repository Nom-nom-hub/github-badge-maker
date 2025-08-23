'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, 
  Wand2, 
  Download, 
  Copy, 
  Sparkles, 
  Zap,
  Paintbrush,
  Settings,
  Check
} from 'lucide-react'
import { customBadgeGenerator, CustomBadgeConfig, CUSTOM_BADGE_THEMES } from '@/lib/custom-badge-generator'
import { BadgeConfig } from '@/lib/types'
import { toast } from 'sonner'

interface CustomBadgeDesignerProps {
  initialConfig?: BadgeConfig;
  onApplyCustom?: (config: BadgeConfig & { isCustom: boolean }) => void;
}

export function CustomBadgeDesigner({ initialConfig, onApplyCustom }: CustomBadgeDesignerProps) {
  const [customConfig, setCustomConfig] = useState<CustomBadgeConfig>({
    label: initialConfig?.label || 'custom',
    message: initialConfig?.message || 'badge',
    labelColor: initialConfig?.labelColor || '#555555',
    messageColor: initialConfig?.messageColor || '#007ec6',
    style: 'flat',
    
    // Custom properties
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    fontSize: 11,
    fontFamily: 'Verdana, Geneva, DejaVu Sans, sans-serif',
    fontWeight: 'normal',
    textTransform: 'none',
    height: 20,
    padding: { horizontal: 10, vertical: 4 },
    
    gradient: {
      enabled: false,
      direction: 'horizontal',
      colors: ['#667eea', '#764ba2']
    },
    shadow: {
      enabled: false,
      blur: 4,
      offsetX: 0,
      offsetY: 2,
      color: 'rgba(0, 0, 0, 0.1)'
    },
    animation: {
      type: 'none',
      duration: 2
    }
  })

  const [previewUrl, setPreviewUrl] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('')
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  // Update preview when config changes
  useEffect(() => {
    try {
      const dataUrl = customBadgeGenerator.generateDataUrl(customConfig)
      setPreviewUrl(dataUrl)
    } catch (_error) {
      console.error('Failed to generate preview:', _error)
    }
  }, [customConfig])

  const handleConfigChange = (updates: Partial<CustomBadgeConfig>) => {
    setCustomConfig(prev => ({ ...prev, ...updates }))
  }

  const handleGradientChange = (updates: Partial<CustomBadgeConfig['gradient']>) => {
    setCustomConfig(prev => ({
      ...prev,
      gradient: { ...prev.gradient!, ...updates }
    }))
  }

  const handleShadowChange = (updates: Partial<CustomBadgeConfig['shadow']>) => {
    setCustomConfig(prev => ({
      ...prev,
      shadow: { ...prev.shadow!, ...updates }
    }))
  }

  const handleAnimationChange = (updates: Partial<CustomBadgeConfig['animation']>) => {
    setCustomConfig(prev => ({
      ...prev,
      animation: { ...prev.animation!, ...updates }
    }))
  }

  const applyTheme = (themeId: string) => {
    const newConfig = customBadgeGenerator.applyTheme(customConfig, themeId)
    setCustomConfig(newConfig)
    setSelectedTheme(themeId)
    toast.success(`Applied ${CUSTOM_BADGE_THEMES.find(t => t.id === themeId)?.name} theme!`)
  }

  const handleApply = () => {
    if (onApplyCustom) {
      const configWithCustomFlag: BadgeConfig & { isCustom: boolean } = {
        ...customConfig,
        isCustom: true
      }
      onApplyCustom(configWithCustomFlag)
      toast.success('✨ Applied custom badge design!')
    }
  }

  const copyToClipboard = async (content: string, key: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedStates(prev => ({ ...prev, [key]: true }))
      toast.success('Copied to clipboard!')
      
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  const downloadSvg = () => {
    try {
      const svg = customBadgeGenerator.generateCustomBadge(customConfig)
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `${customConfig.label}-${customConfig.message}-custom-badge.svg`
      a.click()
      
      URL.revokeObjectURL(url)
      toast.success('SVG downloaded!')
    } catch (error) {
      console.error('Failed to download SVG:', error);
      toast.error('Failed to download SVG')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
          <Paintbrush className="h-5 w-5 text-primary" />
          Custom Badge Designer
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create unique badges with full design control
        </p>
        
        {/* Live Preview */}
        <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-border/50">
          {previewUrl ? (
            <Image 
              src={previewUrl} 
              alt="Custom badge preview" 
              width={200}
              height={40}
              className="max-w-full h-auto"
              unoptimized
            />
          ) : (
            <div className="text-muted-foreground">Generating preview...</div>
          )}
        </div>
      </div>

      {/* Quick Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wand2 className="h-4 w-4" />
            Quick Themes
          </CardTitle>
          <CardDescription>Start with a pre-designed theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CUSTOM_BADGE_THEMES.map(theme => (
              <Button
                key={theme.id}
                variant={selectedTheme === theme.id ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-start gap-1"
                onClick={() => applyTheme(theme.id)}
              >
                <div className="font-medium text-sm">{theme.name}</div>
                <div className="text-xs text-muted-foreground text-left">
                  {theme.description}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Tabs */}
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="basic">
            <Settings className="h-4 w-4 mr-1" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="styling">
            <Palette className="h-4 w-4 mr-1" />
            Style
          </TabsTrigger>
          <TabsTrigger value="effects">
            <Sparkles className="h-4 w-4 mr-1" />
            Effects
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="h-4 w-4 mr-1" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Badge Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="custom-label">Label</Label>
                  <Input
                    id="custom-label"
                    value={customConfig.label}
                    onChange={(e) => handleConfigChange({ label: e.target.value })}
                    placeholder="Label text"
                  />
                </div>
                <div>
                  <Label htmlFor="custom-message">Message</Label>
                  <Input
                    id="custom-message"
                    value={customConfig.message}
                    onChange={(e) => handleConfigChange({ message: e.target.value })}
                    placeholder="Message text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="custom-label-color">Label Color</Label>
                  <Input
                    id="custom-label-color"
                    type="color"
                    value={customConfig.labelColor}
                    onChange={(e) => handleConfigChange({ labelColor: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="custom-message-color">Message Color</Label>
                  <Input
                    id="custom-message-color"
                    type="color"
                    value={customConfig.messageColor}
                    onChange={(e) => handleConfigChange({ messageColor: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="styling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Typography & Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Font Size: {customConfig.fontSize}px</Label>
                  <Slider
                    value={[customConfig.fontSize || 11]}
                    onValueChange={([value]) => handleConfigChange({ fontSize: value })}
                    min={8}
                    max={20}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Height: {customConfig.height}px</Label>
                  <Slider
                    value={[customConfig.height || 20]}
                    onValueChange={([value]) => handleConfigChange({ height: value })}
                    min={16}
                    max={40}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Font Weight</Label>
                  <Select 
                    value={customConfig.fontWeight} 
                    onValueChange={(value: 'normal' | 'medium' | 'semibold' | 'bold') => handleConfigChange({ fontWeight: value })}
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
                <div>
                  <Label>Text Transform</Label>
                  <Select 
                    value={customConfig.textTransform} 
                    onValueChange={(value: 'none' | 'uppercase' | 'lowercase' | 'capitalize') => handleConfigChange({ textTransform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="uppercase">UPPERCASE</SelectItem>
                      <SelectItem value="lowercase">lowercase</SelectItem>
                      <SelectItem value="capitalize">Capitalize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Border Radius: {customConfig.borderRadius}px</Label>
                <Slider
                  value={[customConfig.borderRadius || 4]}
                  onValueChange={([value]) => handleConfigChange({ borderRadius: value })}
                  min={0}
                  max={20}
                  step={1}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gradient */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Gradient Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={customConfig.gradient?.enabled}
                    onCheckedChange={(checked) => handleGradientChange({ enabled: checked })}
                  />
                  <Label>Enable Gradient</Label>
                </div>
                
                {customConfig.gradient?.enabled && (
                  <>
                    <div>
                      <Label>Direction</Label>
                      <Select 
                        value={customConfig.gradient.direction} 
                        onValueChange={(value: 'horizontal' | 'vertical' | 'diagonal') => handleGradientChange({ direction: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="horizontal">Horizontal</SelectItem>
                          <SelectItem value="vertical">Vertical</SelectItem>
                          <SelectItem value="diagonal">Diagonal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Start Color</Label>
                        <Input
                          type="color"
                          value={customConfig.gradient.colors?.[0]}
                          onChange={(e) => {
                            const newColors: [string, string] = [e.target.value, customConfig.gradient?.colors?.[1] || '#764ba2']
                            handleGradientChange({ colors: newColors })
                          }}
                        />
                      </div>
                      <div>
                        <Label>End Color</Label>
                        <Input
                          type="color"
                          value={customConfig.gradient.colors?.[1]}
                          onChange={(e) => {
                            const newColors: [string, string] = [customConfig.gradient?.colors?.[0] || '#667eea', e.target.value]
                            handleGradientChange({ colors: newColors })
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Shadow */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Drop Shadow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={customConfig.shadow?.enabled}
                    onCheckedChange={(checked) => handleShadowChange({ enabled: checked })}
                  />
                  <Label>Enable Shadow</Label>
                </div>
                
                {customConfig.shadow?.enabled && (
                  <>
                    <div>
                      <Label>Blur: {customConfig.shadow.blur}px</Label>
                      <Slider
                        value={[customConfig.shadow.blur || 4]}
                        onValueChange={([value]) => handleShadowChange({ blur: value })}
                        min={0}
                        max={20}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Offset X: {customConfig.shadow.offsetX}px</Label>
                        <Slider
                          value={[customConfig.shadow.offsetX || 0]}
                          onValueChange={([value]) => handleShadowChange({ offsetX: value })}
                          min={-10}
                          max={10}
                          step={1}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Offset Y: {customConfig.shadow.offsetY}px</Label>
                        <Slider
                          value={[customConfig.shadow.offsetY || 2]}
                          onValueChange={([value]) => handleShadowChange({ offsetY: value })}
                          min={-10}
                          max={10}
                          step={1}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Animation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Animation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Animation Type</Label>
                  <Select 
                    value={customConfig.animation?.type} 
                    onValueChange={(value: 'none' | 'pulse' | 'glow' | 'shake' | 'bounce') => handleAnimationChange({ type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="glow">Glow</SelectItem>
                      <SelectItem value="shake">Shake</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration: {customConfig.animation?.duration}s</Label>
                  <Slider
                    value={[customConfig.animation?.duration || 2]}
                    onValueChange={([value]) => handleAnimationChange({ duration: value })}
                    min={0.5}
                    max={5}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Export & Use</CardTitle>
              <CardDescription>
                Get your custom badge in different formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(customBadgeGenerator.generateDataUrl(customConfig), 'data-url')}
                  className="h-auto p-4 flex flex-col items-start gap-2"
                >
                  <div className="flex items-center gap-2 self-stretch justify-between">
                    <span className="font-medium">Data URL</span>
                    {copiedStates['data-url'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </div>
                  <span className="text-xs text-muted-foreground text-left">
                    Use directly in HTML img tags
                  </span>
                </Button>

                <Button
                  variant="outline"
                  onClick={downloadSvg}
                  className="h-auto p-4 flex flex-col items-start gap-2"
                >
                  <div className="flex items-center gap-2 self-stretch justify-between">
                    <span className="font-medium">Download SVG</span>
                    <Download className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-muted-foreground text-left">
                    Get the SVG file for editing
                  </span>
                </Button>
              </div>

              <Separator />

              <Button onClick={handleApply} className="w-full" size="lg">
                <Zap className="h-4 w-4 mr-2" />
                Apply Custom Badge
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}