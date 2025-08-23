/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Settings, 
  FileText, 
  Package, 
  Zap,
  CheckCircle,
  XCircle,
  Eye,
  Edit3,
  Copy,
  BarChart3,
  Layers,
  Rocket
} from 'lucide-react'
import { 
  batchBadgeGenerator, 
  ProjectConfig, 
  BatchResult, 
  getProjectTemplates, 
  getProjectTemplate,
  applyTemplate,
  ProjectTemplate
} from '@/lib/batch-generator'
import { BadgeConfig } from '@/lib/types'
import { BADGE_COLLECTIONS } from '@/lib/badge-collections'

interface BatchGeneratorProps {
  initialBadges?: BadgeConfig[];
}

export function BatchGenerator({ initialBadges = [] }: BatchGeneratorProps) {
  const [projects, setProjects] = useState<ProjectConfig[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [newProjectName, setNewProjectName] = useState('')
  const [csvInput, setCsvInput] = useState('')
  const [batchResults, setBatchResults] = useState<BatchResult[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  // Form states for manual project creation
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    repository: '',
    language: '',
    framework: '',
    outputFormat: 'markdown' as 'markdown' | 'html' | 'json',
    includeReadme: true
  })

  const templates = getProjectTemplates()
  const collections = BADGE_COLLECTIONS

  const handleAddProject = () => {
    if (!formData.name.trim()) return

    const newProject: ProjectConfig = {
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...formData,
      badges: initialBadges
    }

    batchBadgeGenerator.addProject(newProject)
    setProjects([...projects, newProject])
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      repository: '',
      language: '',
      framework: '',
      outputFormat: 'markdown',
      includeReadme: true
    })
  }

  const handleApplyTemplate = () => {
    if (!selectedTemplate || !newProjectName.trim()) return

    const template = getProjectTemplate(selectedTemplate)
    if (!template) return

    const newProject = applyTemplate(template, newProjectName)
    batchBadgeGenerator.addProject(newProject)
    setProjects([...projects, newProject])

    setNewProjectName('')
    setSelectedTemplate('')
  }

  const handleImportCsv = () => {
    if (!csvInput.trim()) return

    const result = batchBadgeGenerator.importFromCsv(csvInput)
    setProjects(batchBadgeGenerator.getProjects())

    if (result.errors.length > 0) {
      alert(`Imported ${result.success} projects with ${result.errors.length} errors:\n${result.errors.join('\n')}`)
    } else {
      alert(`Successfully imported ${result.success} projects`)
    }

    setCsvInput('')
  }

  const handleRemoveProject = (projectId: string) => {
    batchBadgeGenerator.removeProject(projectId)
    setProjects(batchBadgeGenerator.getProjects())
  }

  const handleGenerateBatch = async () => {
    setIsGenerating(true)
    try {
      const results = await batchBadgeGenerator.generateBatch()
      setBatchResults(results)
    } catch (error) {
      alert('Batch generation failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadResult = (result: BatchResult) => {
    const extension = result.project.outputFormat === 'markdown' ? 'md' : 
                     result.project.outputFormat === 'html' ? 'html' : 'json'
    const filename = `${result.project.name.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`
    
    const blob = new Blob([result.output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadAll = async () => {
    if (batchResults.length === 0) return

    try {
      const zipBlob = await batchBadgeGenerator.exportToZip(batchResults)
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'badge-batch-results.txt'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      alert('Export failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleClearAll = () => {
    batchBadgeGenerator.clearProjects()
    setProjects([])
    setBatchResults([])
    setSelectedProject(null)
  }

  const stats = batchBadgeGenerator.getStatistics()

  const csvTemplate = `name,description,repository,language,framework,badges,outputformat,includereadme
Example Project,A sample project,https://github.com/user/repo,JavaScript,React,Build:Passing:green;Version:1.0.0:blue,markdown,true
Another Project,Another example,https://github.com/user/repo2,Python,Django,Tests:Passing:green;Python:3.9:blue,html,false`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Batch Badge Generator</h2>
          <p className="text-muted-foreground">Create badges for multiple projects at once</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleClearAll} disabled={projects.length === 0}>
            Clear All
          </Button>
          <Button 
            onClick={handleGenerateBatch} 
            disabled={projects.length === 0 || isGenerating}
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Generate Batch
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Statistics */}
      {projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Batch Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalProjects}</div>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalBadges}</div>
                <p className="text-sm text-muted-foreground">Total Badges</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.averageBadgesPerProject.toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Avg per Project</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.languages.length}</div>
                <p className="text-sm text-muted-foreground">Languages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        {/* Create Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Manual Creation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Project Manually
                </CardTitle>
                <CardDescription>
                  Create a new project configuration with custom settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Name *</label>
                  <Input
                    placeholder="My Awesome Project"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Brief project description..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Language</label>
                    <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                        <SelectItem value="TypeScript">TypeScript</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="Java">Java</SelectItem>
                        <SelectItem value="Go">Go</SelectItem>
                        <SelectItem value="Rust">Rust</SelectItem>
                        <SelectItem value="C++">C++</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Framework</label>
                    <Select value={formData.framework} onValueChange={(value) => setFormData(prev => ({ ...prev, framework: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="React">React</SelectItem>
                        <SelectItem value="Vue.js">Vue.js</SelectItem>
                        <SelectItem value="Angular">Angular</SelectItem>
                        <SelectItem value="Next.js">Next.js</SelectItem>
                        <SelectItem value="Express">Express</SelectItem>
                        <SelectItem value="Django">Django</SelectItem>
                        <SelectItem value="Spring">Spring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Repository URL</label>
                  <Input
                    placeholder="https://github.com/user/repo"
                    value={formData.repository}
                    onChange={(e) => setFormData(prev => ({ ...prev, repository: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Output Format</label>
                    <Select value={formData.outputFormat} onValueChange={(value: 'markdown' | 'html' | 'json') => setFormData(prev => ({ ...prev, outputFormat: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="markdown">Markdown</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="include-readme"
                      checked={formData.includeReadme}
                      onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, includeReadme: checked }))}
                    />
                    <label htmlFor="include-readme" className="text-sm font-medium">
                      Include README
                    </label>
                  </div>
                </div>

                <Button onClick={handleAddProject} disabled={!formData.name.trim()} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </CardContent>
            </Card>

            {/* Bulk Import */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Bulk Import from CSV
                </CardTitle>
                <CardDescription>
                  Import multiple projects from CSV data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">CSV Data</label>
                  <Textarea
                    placeholder="Paste CSV data here or use the template below..."
                    value={csvInput}
                    onChange={(e) => setCsvInput(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCsvInput(csvTemplate)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    CSV should include: name, description, repository, language, framework, badges, outputformat, includereadme
                  </div>
                </div>

                <Button onClick={handleImportCsv} disabled={!csvInput.trim()} className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Projects
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Project Templates
              </CardTitle>
              <CardDescription>
                Quick start with pre-configured project types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex items-center gap-2">
                          <span>{template.icon}</span>
                          {template.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleApplyTemplate} 
                  disabled={!selectedTemplate || !newProjectName.trim()}
                >
                  Apply
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(template => (
                  <Card key={template.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedTemplate(template.id)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{template.icon}</span>
                        <div>
                          <CardTitle className="text-sm">{template.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="space-y-2">
                        <div className="text-xs">
                          <strong>Includes:</strong> {template.suggestedBadges.length} badges
                        </div>
                        {template.collectionIds && (
                          <div className="text-xs">
                            <strong>Collections:</strong> {template.collectionIds.length}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Tab */}
        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Project Management
              </CardTitle>
              <CardDescription>
                View and manage your batch projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Projects Added</h3>
                  <p className="text-muted-foreground mb-4">
                    Add projects using the Create tab to get started with batch generation
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map(project => (
                    <Card key={project.id} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            {project.description && (
                              <CardDescription className="mt-1">
                                {project.description}
                              </CardDescription>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {project.language && (
                            <div>
                              <div className="text-sm font-medium">Language</div>
                              <Badge variant="outline">{project.language}</Badge>
                            </div>
                          )}
                          {project.framework && (
                            <div>
                              <div className="text-sm font-medium">Framework</div>
                              <Badge variant="outline">{project.framework}</Badge>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium">Output</div>
                            <Badge variant="outline">{project.outputFormat}</Badge>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Badges</div>
                            <Badge variant="outline">{project.badges.length}</Badge>
                          </div>
                        </div>

                        {selectedProject === project.id && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-2">Badges ({project.badges.length})</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {project.badges.map((badge, index) => (
                                <Badge key={index} variant="secondary" className="justify-center">
                                  {badge.label}: {badge.message}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Generation Results
                  </CardTitle>
                  <CardDescription>
                    Download and review generated badge outputs
                  </CardDescription>
                </div>
                {batchResults.length > 0 && (
                  <Button onClick={handleDownloadAll}>
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {batchResults.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Results Generated</h3>
                  <p className="text-muted-foreground mb-4">
                    Run batch generation to see results here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {batchResults.filter(r => r.success).length} successful, {batchResults.filter(r => !r.success).length} failed
                    </div>
                    <Progress 
                      value={(batchResults.filter(r => r.success).length / batchResults.length) * 100} 
                      className="w-32"
                    />
                  </div>

                  {batchResults.map((result, index) => (
                    <Card key={index} className={`border ${result.success ? 'border-green-200' : 'border-red-200'}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {result.success ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <div>
                              <CardTitle className="text-sm">{result.project.name}</CardTitle>
                              <CardDescription>
                                {result.success ? 'Generated successfully' : `Error: ${result.error}`}
                              </CardDescription>
                            </div>
                          </div>
                          {result.success && (
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedProject(selectedProject === `result-${index}` ? null : `result-${index}`)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadResult(result)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      {result.success && selectedProject === `result-${index}` && (
                        <CardContent>
                          <div className="bg-muted p-4 rounded text-sm font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                            {result.output}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}