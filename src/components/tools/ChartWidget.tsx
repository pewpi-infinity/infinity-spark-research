import { useState } from 'react'
import { ToolComponent } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ChartWidgetProps {
  tool: ToolComponent
}

export function ChartWidget({ tool }: ChartWidgetProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')
  
  const data = tool.config.data || [
    { name: 'Jan', value: 400, category: 'A' },
    { name: 'Feb', value: 300, category: 'A' },
    { name: 'Mar', value: 600, category: 'A' },
    { name: 'Apr', value: 800, category: 'A' },
    { name: 'May', value: 500, category: 'A' },
    { name: 'Jun', value: 700, category: 'A' }
  ]

  return (
    <Card className="cosmic-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 {tool.title}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={chartType} onValueChange={(v) => setChartType(v as 'line' | 'bar')}>
          <TabsList className="w-full max-w-xs">
            <TabsTrigger value="line" className="flex-1">Line</TabsTrigger>
            <TabsTrigger value="bar" className="flex-1">Bar</TabsTrigger>
          </TabsList>

          <TabsContent value="line" className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.04 270)" />
                <XAxis dataKey="name" stroke="oklch(0.65 0 0)" />
                <YAxis stroke="oklch(0.65 0 0)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.18 0.02 260)', 
                    border: '1px solid oklch(0.25 0.04 270)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="oklch(0.75 0.15 85)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="bar" className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.04 270)" />
                <XAxis dataKey="name" stroke="oklch(0.65 0 0)" />
                <YAxis stroke="oklch(0.65 0 0)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.18 0.02 260)', 
                    border: '1px solid oklch(0.25 0.04 270)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="oklch(0.75 0.15 85)" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>

        {tool.config.insight && (
          <div className="text-sm text-muted-foreground p-3 cosmic-border rounded-lg bg-muted/20">
            💡 {tool.config.insight}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
