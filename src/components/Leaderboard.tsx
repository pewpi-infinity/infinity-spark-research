import { Website } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Crown, Medal } from '@phosphor-icons/react'
import { formatValue } from '@/lib/generators'

interface LeaderboardProps {
  websites: Website[]
  onSelectWebsite: (websiteId: string) => void
}

export function Leaderboard({ websites, onSelectWebsite }: LeaderboardProps) {
  const sortedByValue = [...websites]
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown size={24} weight="fill" className="text-yellow-400" />
      case 1:
        return <Medal size={24} weight="fill" className="text-gray-300" />
      case 2:
        return <Medal size={24} weight="fill" className="text-amber-600" />
      default:
        return <Trophy size={24} className="text-muted-foreground" />
    }
  }

  return (
    <Card className="cosmic-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy size={24} className="text-accent" />
          Top Value Worlds
        </CardTitle>
        <CardDescription>
          Highest value websites created by the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedByValue.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy size={48} className="mx-auto mb-2 opacity-30" />
              <p>No worlds created yet</p>
              <p className="text-sm">Be the first to create a world!</p>
            </div>
          ) : (
            sortedByValue.map((website, index) => (
              <div
                key={website.id}
                className="flex items-center gap-3 p-3 cosmic-border rounded-lg cursor-pointer hover:bg-accent/10 transition-all"
                onClick={() => onSelectWebsite(website.id)}
              >
                <div className="flex-shrink-0">
                  {getIcon(index)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-muted-foreground font-mono text-sm">
                      #{index + 1}
                    </span>
                    <h4 className="font-semibold truncate">{website.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{website.tools.length} tools</span>
                    <span>•</span>
                    <span>{website.pages?.length || 0} pages</span>
                    {website.worldArchetype && (
                      <>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs py-0">
                          {website.worldArchetype}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0 text-right">
                  <div className="text-lg font-bold text-accent">
                    {formatValue(website.value)}
                  </div>
                  {website.rarityMultiplier && website.rarityMultiplier > 1 && (
                    <div className="text-xs text-muted-foreground">
                      {website.rarityMultiplier}x rarity
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
