/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  Github, 
  Search, 
  Zap, 
  Star, 
  GitFork, 
  Calendar, 
  Code, 
  Package,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  Download
} from 'lucide-react'
import { repositoryAnalyzer, AnalysisResult } from '@/lib/repository-analyzer'
import { BadgeConfig } from '@/lib/types'
import { BADGE_COLLECTIONS, getCollectionBadges } from '@/lib/badge-collections'

interface RepositoryAnalysisProps {
  onBadgesGenerated?: (badges: BadgeConfig[]) => void;
  onCollectionSelected?: (collectionId: string) => void;
}

export function RepositoryAnalysis({ onBadgesGenerated, onCollectionSelected }: RepositoryAnalysisProps) {
  const [repoUrl, setRepoUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) return

    setIsAnalyzing(true)
    setError(null)
    
    try {
      const result = await repositoryAnalyzer.analyzeRepository(repoUrl)
      setAnalysis(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
      setAnalysis(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleApplySuggestions = () => {
    if (!analysis || !onBadgesGenerated) return

    // Convert suggested badges to BadgeConfig objects
    const suggestedBadges: BadgeConfig[] = analysis.suggestions.badges.map(badgeId => ({
      style: 'flat',
      label: badgeId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      message: 'auto',
      messageColor: '#007ec6',
      labelColor: '#555'
    }))

    onBadgesGenerated(suggestedBadges)
  }

  const handleApplyCollection = (collectionId: string) => {
    if (onCollectionSelected) {
      onCollectionSelected(collectionId)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'High Confidence'
    if (confidence >= 0.6) return 'Medium Confidence'
    return 'Low Confidence'
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            Repository Analysis
          </CardTitle>
          <CardDescription>
            Enter a GitHub repository URL to automatically detect project details and get personalized badge suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://github.com/owner/repository or owner/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !repoUrl.trim()}
            >
              {isAnalyzing ? (
                <>
                  <Search className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Example URLs */}
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'facebook/react',
                'vercel/next.js',
                'microsoft/vscode',
                'tensorflow/tensorflow'
              ].map(example => (
                <Button
                  key={example}
                  variant="outline"
                  size="sm"
                  onClick={() => setRepoUrl(`https://github.com/${example}`)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Repository Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    {analysis.repository.owner}/{analysis.repository.repo}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://github.com/${analysis.repository.owner}/${analysis.repository.repo}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                  {analysis.repository.description && (
                    <CardDescription className="mt-2 max-w-2xl">
                      {analysis.repository.description}
                    </CardDescription>
                  )}
                </div>
                <div className={`text-right ${getConfidenceColor(analysis.confidence)}`}>
                  <div className="text-sm font-medium">
                    {getConfidenceText(analysis.confidence)}
                  </div>
                  <Progress 
                    value={analysis.confidence * 100} 
                    className="w-24 h-2 mt-1"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4" />
                    <span className="font-semibold">{analysis.repository.stargazersCount?.toLocaleString() || 0}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Stars</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-600">
                    <GitFork className="w-4 h-4" />
                    <span className="font-semibold">{analysis.repository.forksCount?.toLocaleString() || 0}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Forks</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <Code className="w-4 h-4" />
                    <span className="font-semibold">{analysis.repository.language || 'N/A'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Language</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">
                      {analysis.repository.updatedAt ? formatDate(analysis.repository.updatedAt) : 'N/A'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Updated</p>
                </div>
              </div>

              {analysis.repository.topics && analysis.repository.topics.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.repository.topics.map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detection Results */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="frameworks">Tech Stack</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Project Type</h4>
                      <Badge variant="outline" className="capitalize">
                        {analysis.projectContext.type || 'Unknown'}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Framework</h4>
                      <Badge variant="outline" className="capitalize">
                        {analysis.projectContext.framework || 'None detected'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Features Detected</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.projectContext.hasTests && (
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Testing
                        </Badge>
                      )}
                      {analysis.projectContext.hasCI && (
                        <Badge variant="secondary" className="text-blue-700 bg-blue-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          CI/CD
                        </Badge>
                      )}
                      {analysis.projectContext.isOpenSource && (
                        <Badge variant="secondary" className="text-purple-700 bg-purple-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Open Source
                        </Badge>
                      )}
                      {analysis.projectContext.features?.map(feature => (
                        <Badge key={feature} variant="secondary" className="capitalize">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {analysis.repository.license && (
                    <div>
                      <h4 className="font-medium mb-2">License</h4>
                      <Badge variant="outline">
                        {analysis.repository.license.name}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="frameworks" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Frameworks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysis.detectedFrameworks.length > 0 ? (
                      <div className="space-y-2">
                        {analysis.detectedFrameworks.map(framework => (
                          <div key={framework} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="font-medium">{framework}</span>
                            <Badge variant="secondary">Detected</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No frameworks detected</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Tools & Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysis.detectedTools.length > 0 ? (
                      <div className="space-y-2">
                        {analysis.detectedTools.map(tool => (
                          <div key={tool} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="font-medium">{tool}</span>
                            <Badge variant="secondary">Detected</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No specific tools detected</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Recommended Badges
                  </CardTitle>
                  <CardDescription>
                    Based on the analysis, these badges are recommended for your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.suggestions.badges.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {analysis.suggestions.badges.map(badge => (
                          <Badge key={badge} variant="outline" className="justify-center p-2">
                            {badge.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                      <Button onClick={handleApplySuggestions} className="w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Apply All Suggestions
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Info className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No specific badge suggestions available for this project type
                      </p>
                    </div>
                  )}

                  {analysis.suggestions.customizations.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium mb-3">Recommended Customizations</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.suggestions.customizations.map(customization => (
                          <Badge key={customization} variant="secondary" className="capitalize">
                            {customization.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Badge Collections</CardTitle>
                  <CardDescription>
                    Curated badge sets that match your project type and technologies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analysis.suggestions.collections.length > 0 ? (
                    <div className="space-y-3">
                      {analysis.suggestions.collections.map(collectionId => {
                        const collection = BADGE_COLLECTIONS.find(c => c.id === collectionId)
                        return collection ? (
                          <div
                            key={collectionId}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                          >
                            <div className="space-y-1">
                              <h4 className="font-medium">{collection.name}</h4>
                              <p className="text-sm text-muted-foreground">{collection.description}</p>
                              <div className="flex gap-1">
                                <Badge variant="outline" className="text-xs">{collection.category}</Badge>
                                <Badge variant="outline" className="text-xs">{collection.badges.length} badges</Badge>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApplyCollection(collectionId)}
                            >
                              Apply Collection
                            </Button>
                          </div>
                        ) : null
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No specific collections match this project
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}