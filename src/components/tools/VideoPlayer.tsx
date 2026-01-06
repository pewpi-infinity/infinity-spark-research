import { useState, useEffect } from 'react'
import { ToolComponent } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, SkipForward, SkipBack } from '@phosphor-icons/react'

interface VideoPlayerProps {
  tool: ToolComponent
}

export function VideoPlayer({ tool }: VideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const playlist = tool.config.playlist || []
  const currentVideo = playlist[currentVideoIndex] || {
    title: '1970s Film Collection',
    embedUrl: 'https://archive.org/embed/TheIrishInUs1935',
    description: 'Public domain films from Internet Archive'
  }

  const handleNext = () => {
    if (currentVideoIndex < playlist.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1)
      setIsPlaying(false)
    }
  }

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1)
      setIsPlaying(false)
    }
  }

  return (
    <Card className="cosmic-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎬 {tool.title}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full cosmic-border rounded-lg overflow-hidden bg-black">
          {currentVideo.embedUrl ? (
            <iframe
              src={currentVideo.embedUrl}
              className="w-full h-full"
              allowFullScreen
              title={currentVideo.title}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Play size={48} className="mx-auto mb-2" />
                <p>Video Player Ready</p>
                <p className="text-sm">Add videos from Internet Archive public domain</p>
              </div>
            </div>
          )}
        </div>

        {playlist.length > 1 && (
          <div className="flex items-center gap-2 justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentVideoIndex === 0}
            >
              <SkipBack size={16} />
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {currentVideoIndex + 1} / {playlist.length}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentVideoIndex === playlist.length - 1}
            >
              <SkipForward size={16} />
            </Button>
          </div>
        )}

        {currentVideo.title && (
          <div className="space-y-1">
            <h4 className="font-semibold">{currentVideo.title}</h4>
            {currentVideo.description && (
              <p className="text-sm text-muted-foreground">{currentVideo.description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
