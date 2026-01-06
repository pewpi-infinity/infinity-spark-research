import { useState } from 'react'
import { ToolComponent } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { ClockClockwise, ArrowLeft, ArrowRight } from '@phosphor-icons/react'

interface TimeTravelProps {
  tool: ToolComponent
}

export function TimeTravel({ tool }: TimeTravelProps) {
  const startYear = tool.config.startYear || 1970
  const endYear = tool.config.endYear || 2024
  const [currentYear, setCurrentYear] = useState(startYear)
  
  const events = tool.config.events || []
  const currentEvent = events.find((e: any) => e.year === currentYear)

  const handleYearChange = (value: number[]) => {
    setCurrentYear(value[0])
  }

  const jumpYears = (delta: number) => {
    const newYear = Math.max(startYear, Math.min(endYear, currentYear + delta))
    setCurrentYear(newYear)
  }

  return (
    <Card className="cosmic-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ⏰ {tool.title}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => jumpYears(-10)}
            disabled={currentYear <= startYear}
          >
            <ArrowLeft size={16} />
          </Button>
          
          <div className="flex-1 text-center">
            <div className="text-4xl font-bold text-accent">{currentYear}</div>
            <div className="text-sm text-muted-foreground">Time Travel Year</div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => jumpYears(10)}
            disabled={currentYear >= endYear}
          >
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentYear]}
            onValueChange={handleYearChange}
            min={startYear}
            max={endYear}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{startYear}</span>
            <span>{endYear}</span>
          </div>
        </div>

        {currentEvent ? (
          <div className="space-y-3 p-4 cosmic-border rounded-lg bg-accent/5">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{currentEvent.category}</Badge>
              <span className="text-lg font-semibold">{currentEvent.title}</span>
            </div>
            <p className="text-sm text-muted-foreground">{currentEvent.description}</p>
            {currentEvent.significance && (
              <div className="text-xs text-muted-foreground italic">
                💡 {currentEvent.significance}
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground cosmic-border rounded-lg">
            <ClockClockwise size={48} className="mx-auto mb-2 opacity-50" />
            <p>No recorded events for {currentYear}</p>
            <p className="text-xs mt-1">Continue time traveling to discover more</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentYear(startYear)}
          >
            Start
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentYear(Math.floor((startYear + endYear) / 2))}
          >
            Middle
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentYear(endYear)}
          >
            End
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
