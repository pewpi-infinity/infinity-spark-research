export type ToolPrimitive = 
  | 'video-player'
  | 'chart'
  | 'gallery'
  | 'timeline'
  | 'map'
  | 'dashboard'
  | 'store'
  | 'calculator'
  | 'text-editor'
  | 'calendar'
  | 'feed'
  | 'chat'
  | 'form'
  | 'table'
  | 'audio-player'
  | 'code-editor'
  | 'kanban'
  | 'search'
  | 'analytics'
  | 'content-hub'
  | 'time-travel-lab'
  | 'emotion-visualizer'
  | 'world-trading'

export interface ToolSpec {
  type: ToolPrimitive
  config: Record<string, any>
  title: string
  description: string
}

export async function classifyIntentToTools(query: string): Promise<ToolSpec[]> {
  const prompt = `Analyze this user intent and determine what functional tools should be built immediately: "${query}"

Tool primitives available:
- video-player: for video content, tutorials, media (with Internet Archive embeds for public domain)
- chart: for data visualization, stats, metrics
- gallery: for image collections, portfolios, showcases
- timeline: for history, events, roadmaps
- map: for locations, geography, travel
- dashboard: for metrics, KPIs, analytics overview
- store: for products, shopping, e-commerce
- calculator: for computations, converters, estimators
- text-editor: for writing, documentation, notes
- calendar: for events, scheduling, dates
- feed: for news, updates, social content
- chat: for messaging, support, community
- form: for data collection, surveys, contact
- table: for structured data, lists, databases
- audio-player: for music, podcasts, audio
- code-editor: for programming, snippets, technical docs
- kanban: for task management, workflows
- search: for finding, filtering, discovery
- analytics: for insights, reports, tracking
- content-hub: for articles, research, information
- time-travel-lab: for historical exploration with interactive timeline controls
- emotion-visualizer: for emotional state mapping and visualization
- world-trading: for trading entire websites between users

CRITICAL RULES FOR PRODUCTION MODE:
1. If query mentions "video", "watch", "movie", "film" → MUST include video-player with real Internet Archive embed URLs
2. If query mentions "chart", "data", "stats" → MUST include chart with sample data
3. Tools must be IMMEDIATELY FUNCTIONAL, not descriptions
4. For movies/media: use Internet Archive public domain collections
5. For charts: provide actual data arrays
6. Each tool MUST have working config with real values

Example for "1970s movies":
{
  "tools": [
    {
      "type": "video-player",
      "title": "1970s Film Collection",
      "description": "Watch public domain films from the 1970s era",
      "config": {
        "playlist": [
          {
            "title": "Classic 1970s Film",
            "embedUrl": "https://archive.org/embed/TheIrishInUs1935",
            "description": "Public domain film from Internet Archive"
          }
        ]
      }
    },
    {
      "type": "timeline",
      "title": "1970s Cinema Timeline",
      "description": "Major film releases and cultural moments",
      "config": {
        "startYear": 1970,
        "endYear": 1979,
        "events": [
          {"year": 1972, "title": "The Godfather Released", "description": "Revolutionary crime drama", "category": "Film"}
        ]
      }
    }
  ]
}

Return ONLY valid JSON with 1-3 tools that are PRODUCTION-READY. Format:
{
  "tools": [
    {
      "type": "tool-name",
      "title": "Tool Display Name",
      "description": "What this tool does",
      "config": {
        "key": "value"
      }
    }
  ]
}`

  try {
    if (!window.spark || !window.spark.llm) {
      throw new Error('Spark API not available')
    }
    const response = await window.spark.llm(prompt, 'gpt-4o', true)
    const parsed = JSON.parse(response)
    return parsed.tools || []
  } catch (error) {
    console.error('Error classifying intent:', error)
    return [{
      type: 'content-hub',
      title: 'Information Hub',
      description: 'Explore information about ' + query,
      config: { query }
    }]
  }
}

export function getToolValue(toolType: ToolPrimitive): number {
  const valueMap: Record<ToolPrimitive, number> = {
    'video-player': 500,
    'chart': 400,
    'gallery': 300,
    'timeline': 350,
    'map': 450,
    'dashboard': 600,
    'store': 700,
    'calculator': 300,
    'text-editor': 400,
    'calendar': 350,
    'feed': 400,
    'chat': 500,
    'form': 300,
    'table': 400,
    'audio-player': 450,
    'code-editor': 500,
    'kanban': 500,
    'search': 400,
    'analytics': 550,
    'content-hub': 250,
    'time-travel-lab': 800,
    'emotion-visualizer': 700,
    'world-trading': 900
  }
  return valueMap[toolType] || 300
}
