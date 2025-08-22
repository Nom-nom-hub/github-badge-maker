import { NextRequest, NextResponse } from 'next/server';
import { BadgeConfig } from '@/lib/types';
import { generateBadgeUrl, generateMarkdown, generateHtml } from '@/lib/badge-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { config, format = 'url' }: { config: BadgeConfig; format?: string } = body;

    if (!config || !config.label || !config.message) {
      return NextResponse.json(
        { error: 'Invalid badge configuration. Label and message are required.' },
        { status: 400 }
      );
    }

    let result: string;

    switch (format) {
      case 'url':
        result = generateBadgeUrl(config);
        break;
      case 'markdown':
        result = generateMarkdown(config);
        break;
      case 'html':
        result = generateHtml(config);
        break;
      default:
        result = generateBadgeUrl(config);
    }

    return NextResponse.json({ result, format });
  } catch (error) {
    console.error('Error generating badge:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const label = searchParams.get('label') || 'label';
  const message = searchParams.get('message') || 'message';
  const labelColor = searchParams.get('labelColor') || '#555';
  const messageColor = searchParams.get('messageColor') || '#4c1';
  const style = (searchParams.get('style') || 'flat') as BadgeConfig['style'];
  const format = searchParams.get('format') || 'url';

  const config: BadgeConfig = {
    label,
    message,
    labelColor,
    messageColor,
    style
  };

  let result: string;

  switch (format) {
    case 'url':
      result = generateBadgeUrl(config);
      break;
    case 'markdown':
      result = generateMarkdown(config);
      break;
    case 'html':
      result = generateHtml(config);
      break;
    default:
      result = generateBadgeUrl(config);
  }

  return NextResponse.json({ result, format, config });
}