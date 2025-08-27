import { useState, useEffect } from 'react';
import { HudButton } from '@/components/HudButton';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [timeDisplay, setTimeDisplay] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTimeDisplay(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Hero Section */}
      <div className="hud-panel p-8 text-center space-y-6">
        <div className="space-y-4">
          <h1 className="font-orbitron font-black text-5xl text-primary animate-glow">
            GALACTIC CHRONICLES
          </h1>
          <p className="font-mono text-xl text-muted-foreground max-w-2xl mx-auto">
            A futuristic blogging interface designed for space explorers, 
            chronicling adventures across the galaxy with state-of-the-art HUD technology.
          </p>
        </div>

        {/* Mission Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="hud-panel p-6 space-y-3">
            <div className="text-2xl font-orbitron font-bold text-secondary">05</div>
            <div className="font-mono text-muted-foreground">Mission Logs</div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-secondary to-secondary-glow animate-pulse w-3/4" />
            </div>
          </div>

          <div className="hud-panel p-6 space-y-3">
            <div className="text-2xl font-orbitron font-bold text-primary">12</div>
            <div className="font-mono text-muted-foreground">Archives</div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary-glow animate-pulse w-4/5" />
            </div>
          </div>

          <div className="hud-panel p-6 space-y-3">
            <div className="text-2xl font-orbitron font-bold text-accent">08</div>
            <div className="font-mono text-muted-foreground">Albums</div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary-glow animate-pulse w-2/3" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="hud-panel p-6 space-y-4 group hover:scale-105 transition-transform duration-300">
          <div className="text-3xl mb-4">📝</div>
          <h3 className="font-orbitron font-bold text-lg">Create Log Entry</h3>
          <p className="font-mono text-sm text-muted-foreground">
            Document your galactic adventures
          </p>
          <HudButton onClick={() => navigate('/post')} className="w-full">
            New Entry
          </HudButton>
        </div>

        <div className="hud-panel p-6 space-y-4 group hover:scale-105 transition-transform duration-300">
          <div className="text-3xl mb-4">📅</div>
          <h3 className="font-orbitron font-bold text-lg">Mission Archives</h3>
          <p className="font-mono text-sm text-muted-foreground">
            Browse previous expeditions
          </p>
          <HudButton onClick={() => navigate('/calendar')} className="w-full">
            View Archives
          </HudButton>
        </div>

        <div className="hud-panel p-6 space-y-4 group hover:scale-105 transition-transform duration-300">
          <div className="text-3xl mb-4">🎵</div>
          <h3 className="font-orbitron font-bold text-lg">Album Bay</h3>
          <p className="font-mono text-sm text-muted-foreground">
            Store audio-visual memories
          </p>
          <HudButton onClick={() => navigate('/album')} className="w-full">
            Enter Bay
          </HudButton>
        </div>

        <div className="hud-panel p-6 space-y-4 group hover:scale-105 transition-transform duration-300">
          <div className="text-3xl mb-4">👤</div>
          <h3 className="font-orbitron font-bold text-lg">Personnel File</h3>
          <p className="font-mono text-sm text-muted-foreground">
            Update commander profile
          </p>
          <HudButton onClick={() => navigate('/about')} className="w-full">
            Edit Profile
          </HudButton>
        </div>
      </div>

      {/* System Status */}
      <div className="hud-panel p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="font-orbitron font-bold text-lg">System Status</h3>
            <div className="font-mono text-sm text-muted-foreground">
              All systems operational • {timeDisplay}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
              <span className="font-mono text-sm">Life Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-sm">Communications</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-sm">Navigation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};