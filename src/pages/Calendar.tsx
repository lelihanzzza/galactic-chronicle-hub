import { useState, useEffect } from 'react';
import { HudButton } from '@/components/HudButton';

interface BlogPost {
  id: string;
  subject: string;
  content: string;
  date: string;
  time: string;
}

export const Calendar = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent' | 'archived'>('all');

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('galactic-blogs') || '[]');
    setPosts(savedPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    if (filter === 'recent') {
      const postDate = new Date(post.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return postDate >= weekAgo;
    }
    return true;
  });

  const groupedPosts = filteredPosts.reduce((groups, post) => {
    const date = post.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(post);
    return groups;
  }, {} as Record<string, BlogPost[]>);

  const sortedDates = Object.keys(groupedPosts).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="hud-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-orbitron font-bold text-3xl text-primary">Mission Archives</h1>
              <p className="font-mono text-muted-foreground mt-2">
                Historical log entries from galactic expeditions
              </p>
            </div>
            <div className="flex space-x-2">
              {(['all', 'recent', 'archived'] as const).map((filterType) => (
                <HudButton
                  key={filterType}
                  variant={filter === filterType ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </HudButton>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {sortedDates.length === 0 ? (
              <div className="hud-panel p-8 text-center">
                <div className="text-6xl mb-4 opacity-50">📡</div>
                <h3 className="font-orbitron font-bold text-xl text-muted-foreground mb-2">
                  No Mission Logs Found
                </h3>
                <p className="font-mono text-sm text-muted-foreground mb-6">
                  Start documenting your galactic adventures to see them archived here.
                </p>
                <HudButton onClick={() => window.location.href = '/post'}>
                  Create First Entry
                </HudButton>
              </div>
            ) : (
              sortedDates.map((date) => (
                <div key={date} className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="font-orbitron font-bold text-lg text-primary">
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent" />
                  </div>
                  
                  <div className="space-y-3">
                    {groupedPosts[date].map((post) => (
                      <div
                        key={post.id}
                        className={`hud-panel p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                          selectedPost?.id === post.id ? 'border-secondary shadow-orange' : ''
                        }`}
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-orbitron font-medium text-lg text-foreground mb-2">
                              {post.subject}
                            </h3>
                            <p className="font-mono text-sm text-muted-foreground line-clamp-2">
                              {post.content}
                            </p>
                          </div>
                          <div className="ml-4 text-right">
                            <div className="font-mono text-xs text-muted-foreground">
                              {post.time}
                            </div>
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {selectedPost ? (
              <div className="hud-panel p-6 space-y-6 sticky top-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-orbitron font-bold text-lg text-primary">Log Details</h3>
                  <HudButton
                    variant="danger"
                    size="sm"
                    onClick={() => setSelectedPost(null)}
                  >
                    Close
                  </HudButton>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                      Mission Subject
                    </label>
                    <div className="font-orbitron font-medium text-foreground mt-1">
                      {selectedPost.subject}
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                      Stardate & Time
                    </label>
                    <div className="font-mono text-sm text-foreground mt-1">
                      {selectedPost.date} • {selectedPost.time}
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                      Mission Report
                    </label>
                    <div className="font-mono text-sm text-foreground mt-2 leading-relaxed whitespace-pre-wrap">
                      {selectedPost.content}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-muted-foreground">
                      Log Entry Verified
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hud-panel p-6 text-center">
                <div className="text-4xl mb-4 opacity-50">🎯</div>
                <h3 className="font-orbitron font-bold text-lg text-muted-foreground mb-2">
                  Select Mission Log
                </h3>
                <p className="font-mono text-sm text-muted-foreground">
                  Click on any log entry to view detailed mission report.
                </p>
              </div>
            )}

            {/* Archive Stats */}
            <div className="hud-panel p-6 space-y-4">
              <h3 className="font-orbitron font-bold text-lg text-primary">Archive Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-muted-foreground">Total Logs</span>
                  <span className="font-mono text-sm text-foreground font-bold">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-muted-foreground">Active Days</span>
                  <span className="font-mono text-sm text-foreground font-bold">{sortedDates.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-muted-foreground">Recent Activity</span>
                  <span className="font-mono text-sm text-foreground font-bold">
                    {posts.filter(post => {
                      const postDate = new Date(post.date);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return postDate >= weekAgo;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};