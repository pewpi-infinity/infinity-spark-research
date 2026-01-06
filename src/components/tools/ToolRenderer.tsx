import { ToolComponent } from '@/lib/types'
import { VideoPlayer } from './VideoPlayer'
import { ChartWidget } from './ChartWidget'
import { TimeTravel } from './TimeTravel'
import { EmotionVisualizer } from './EmotionVisualizer'
import { WorldTrading } from './WorldTrading'

interface ToolRendererProps {
  tool: ToolComponent
}

export function ToolRenderer({ tool }: ToolRendererProps) {
  switch (tool.type) {
    case 'video-player':
      return <VideoPlayer tool={tool} />
    
    case 'chart':
      return <ChartWidget tool={tool} />
    
    case 'time-travel-lab':
      return <TimeTravel tool={tool} />
    
    case 'emotion-visualizer':
      return <EmotionVisualizer tool={tool} />
    
    case 'world-trading':
      return <WorldTrading tool={tool} />
    
    default:
      return (
        <div className="p-6 cosmic-border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
          <div className="text-xs text-muted-foreground font-mono">
            Tool Type: {tool.type}
          </div>
        </div>
      )
  }
}
