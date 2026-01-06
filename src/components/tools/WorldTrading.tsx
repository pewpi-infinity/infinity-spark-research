import { useState } from 'react'
import { ToolComponent, Website } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Repeat, ArrowsLeftRight, CheckCircle } from '@phosphor-icons/react'

interface WorldTradingProps {
  tool: ToolComponent
}

export function WorldTrading({ tool }: WorldTradingProps) {
  const [offerWorld, setOfferWorld] = useState('')
  const [requestWorld, setRequestWorld] = useState('')
  const [tradeStatus, setTradeStatus] = useState<'idle' | 'pending' | 'completed'>('idle')

  const handleProposeTrade = () => {
    if (offerWorld && requestWorld) {
      setTradeStatus('pending')
      setTimeout(() => setTradeStatus('completed'), 2000)
      setTimeout(() => {
        setTradeStatus('idle')
        setOfferWorld('')
        setRequestWorld('')
      }, 4000)
    }
  }

  const recentTrades = tool.config.recentTrades || []

  return (
    <Card className="cosmic-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔄 {tool.title}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Your World (Offer)</label>
            <Input
              id="offer-world"
              placeholder="World ID or name..."
              value={offerWorld}
              onChange={(e) => setOfferWorld(e.target.value)}
              className="cosmic-border"
            />
            <div className="text-xs text-muted-foreground">
              The world you're willing to trade away
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Their World (Request)</label>
            <Input
              id="request-world"
              placeholder="World ID or name..."
              value={requestWorld}
              onChange={(e) => setRequestWorld(e.target.value)}
              className="cosmic-border"
            />
            <div className="text-xs text-muted-foreground">
              The world you want in return
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleProposeTrade}
            disabled={!offerWorld || !requestWorld || tradeStatus !== 'idle'}
            className="gap-2 cosmic-glow"
            size="lg"
          >
            {tradeStatus === 'idle' && (
              <>
                <ArrowsLeftRight size={20} />
                Propose Trade
              </>
            )}
            {tradeStatus === 'pending' && (
              <>
                <Repeat size={20} className="animate-spin" />
                Processing...
              </>
            )}
            {tradeStatus === 'completed' && (
              <>
                <CheckCircle size={20} weight="fill" />
                Trade Completed!
              </>
            )}
          </Button>
        </div>

        {recentTrades.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Recent Trades</h4>
            <div className="space-y-2">
              {recentTrades.slice(0, 5).map((trade: any, index: number) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 cosmic-border rounded-lg bg-muted/20 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{trade.offered}</Badge>
                    <ArrowsLeftRight size={16} className="text-muted-foreground" />
                    <Badge variant="outline">{trade.received}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{trade.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 cosmic-border rounded-lg bg-accent/5 text-xs text-muted-foreground space-y-2">
          <div className="font-semibold">Trading Rules</div>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Both parties must own the worlds being traded</li>
            <li>World values should be within 20% of each other</li>
            <li>All tools and pages transfer with the world</li>
            <li>Trades are instant and permanent</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
