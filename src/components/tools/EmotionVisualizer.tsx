import { useState } from 'react'
import { ToolComponent } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Heart, Smiley, Lightning, CloudRain } from '@phosphor-icons/react'

interface EmotionVisualizerProps {
  tool: ToolComponent
}

const emotions = [
  { name: 'Joy', color: 'oklch(0.85 0.18 90)', icon: Smiley, description: 'Happiness and delight' },
  { name: 'Love', color: 'oklch(0.65 0.20 15)', icon: Heart, description: 'Affection and care' },
  { name: 'Energy', color: 'oklch(0.75 0.22 60)', icon: Lightning, description: 'Excitement and vigor' },
  { name: 'Calm', color: 'oklch(0.70 0.15 220)', icon: CloudRain, description: 'Peace and tranquility' },
]

export function EmotionVisualizer({ tool }: EmotionVisualizerProps) {
  const [emotionValues, setEmotionValues] = useState<Record<string, number>>({
    Joy: 50,
    Love: 50,
    Energy: 50,
    Calm: 50
  })

  const handleEmotionChange = (emotion: string, value: number[]) => {
    setEmotionValues(prev => ({ ...prev, [emotion]: value[0] }))
  }

  const dominantEmotion = Object.entries(emotionValues).reduce((a, b) => 
    a[1] > b[1] ? a : b
  )[0]

  return (
    <Card className="cosmic-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💭 {tool.title}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {emotions.map(({ name, color, icon: Icon, description }) => (
            <div key={name} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon size={24} style={{ color }} />
                <div className="flex-1">
                  <div className="font-semibold">{name}</div>
                  <div className="text-xs text-muted-foreground">{description}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Slider
                  value={[emotionValues[name]]}
                  onValueChange={(value) => handleEmotionChange(name, value)}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-center text-sm font-semibold" style={{ color }}>
                  {emotionValues[name]}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 cosmic-border rounded-lg bg-accent/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Dominant Emotion</span>
            <Badge className="text-sm">{dominantEmotion}</Badge>
          </div>
          
          <div className="h-32 flex items-end justify-around gap-2">
            {emotions.map(({ name, color }) => (
              <div key={name} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t-lg transition-all duration-300"
                  style={{ 
                    height: `${emotionValues[name]}%`,
                    backgroundColor: color,
                    opacity: 0.7
                  }}
                />
                <span className="text-xs text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center italic">
          Adjust the sliders to visualize emotional states and see the dominant emotion
        </div>
      </CardContent>
    </Card>
  )
}
