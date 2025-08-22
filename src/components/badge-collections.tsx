'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Package, Star, Crown, Zap, Plus, Check } from 'lucide-react';
import { 
  BADGE_COLLECTIONS, 
  getCollectionsByCategory, 
  getPopularCollections, 
  getPremiumCollections, 
  getCollectionBadges, 
  getAllCategories, 
  searchCollections,
  BadgeCollection 
} from '@/lib/badge-collections';
import { BadgeTemplate } from '@/lib/types';
import { toast } from 'sonner';

interface BadgeCollectionsProps {
  onSelectCollection: (templates: BadgeTemplate[]) => void;
  onSelectTemplate: (template: BadgeTemplate) => void;
}

export function BadgeCollections({ onSelectCollection, onSelectTemplate }: BadgeCollectionsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());

  const categories = getAllCategories();
  const popularCollections = getPopularCollections();
  const premiumCollections = getPremiumCollections();

  const filteredCollections = useMemo(() => {
    let collections = BADGE_COLLECTIONS;

    // Apply search filter
    if (searchQuery.trim()) {
      collections = searchCollections(searchQuery.trim());
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      collections = collections.filter(c => c.category === selectedCategory);
    }

    return collections;
  }, [searchQuery, selectedCategory]);

  const handleCollectionSelect = (collection: BadgeCollection) => {
    const templates = getCollectionBadges(collection.id);
    onSelectCollection(templates);
    toast.success(`Added ${collection.name} collection! (${templates.length} badges)`);
  };

  const handleCollectionToggle = (collectionId: string) => {
    setSelectedCollections(prev => {
      const next = new Set(prev);
      if (next.has(collectionId)) {
        next.delete(collectionId);
      } else {
        next.add(collectionId);
      }
      return next;
    });
  };

  const handleAddSelectedCollections = () => {
    const allTemplates: BadgeTemplate[] = [];
    const collectionNames: string[] = [];
    
    selectedCollections.forEach(collectionId => {
      const collection = BADGE_COLLECTIONS.find(c => c.id === collectionId);
      if (collection) {
        const templates = getCollectionBadges(collectionId);
        allTemplates.push(...templates);
        collectionNames.push(collection.name);
      }
    });

    if (allTemplates.length > 0) {
      onSelectCollection(allTemplates);
      setSelectedCollections(new Set());
      toast.success(`Added ${collectionNames.length} collection${collectionNames.length > 1 ? 's' : ''} (${allTemplates.length} badges total)`);
    }
  };

  const CollectionCard = ({ collection, isSelected = false }: { collection: BadgeCollection; isSelected?: boolean }) => {
    const templates = getCollectionBadges(collection.id);
    
    return (
      <Card className={`group cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:border-primary/50'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                style={{ backgroundColor: collection.color }}
              >
                {collection.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium truncate">{collection.name}</CardTitle>
                  {collection.isPopular && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5 flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      Popular
                    </Badge>
                  )}
                  {collection.isPremium && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 flex items-center gap-1 border-yellow-500 text-yellow-600">
                      <Crown className="h-2.5 w-2.5 fill-current" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-xs mt-1 line-clamp-2">
                  {collection.description}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                {templates.length} badges
              </span>
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                {collection.category}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {templates.slice(0, 6).map((template) => (
                <Badge 
                  key={template.id} 
                  variant="secondary" 
                  className="text-xs px-1.5 py-0.5"
                >
                  {template.name}
                </Badge>
              ))}
              {templates.length > 6 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  +{templates.length - 6} more
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                className="flex-1 h-7 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCollectionSelect(collection);
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add All
              </Button>
              <Button 
                size="sm" 
                variant={isSelected ? "default" : "outline"}
                className="h-7 px-3"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCollectionToggle(collection.id);
                }}
              >
                {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Batch Selection */}
      {selectedCollections.size > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {selectedCollections.size} collection{selectedCollections.size > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setSelectedCollections(new Set())}
                >
                  Clear
                </Button>
                <Button size="sm" onClick={handleAddSelectedCollections}>
                  <Zap className="h-3 w-3 mr-1" />
                  Add All Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Collections Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="popular" className="flex items-center gap-2">
            <Star className="h-3 w-3" />
            Popular
          </TabsTrigger>
          <TabsTrigger value="premium" className="flex items-center gap-2">
            <Crown className="h-3 w-3" />
            Premium
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Package className="h-3 w-3" />
            All
          </TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularCollections.map(collection => (
              <CollectionCard 
                key={collection.id} 
                collection={collection} 
                isSelected={selectedCollections.has(collection.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="premium" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumCollections.map(collection => (
              <CollectionCard 
                key={collection.id} 
                collection={collection} 
                isSelected={selectedCollections.has(collection.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          {filteredCollections.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No collections found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCollections.map(collection => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  isSelected={selectedCollections.has(collection.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}