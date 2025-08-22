import { NextRequest, NextResponse } from 'next/server';
import { BADGE_TEMPLATES, getTemplatesByCategory, getTemplateById } from '@/lib/badge-templates';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const id = searchParams.get('id');

  try {
    if (id) {
      const template = getTemplateById(id);
      if (!template) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ template });
    }

    if (category) {
      const templatesByCategory = getTemplatesByCategory();
      const categoryTemplates = templatesByCategory[category];
      if (!categoryTemplates) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ templates: categoryTemplates, category });
    }

    // Return all templates grouped by category
    const templatesByCategory = getTemplatesByCategory();
    const categories = Object.keys(templatesByCategory);
    
    return NextResponse.json({
      templates: BADGE_TEMPLATES,
      templatesByCategory,
      categories
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}