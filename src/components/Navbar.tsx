import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { id: 'home', label: 'Mission Control', path: '/' },
    { id: 'post', label: 'Post Blog', path: '/post' },
    { id: 'calendar', label: 'Archives', path: '/calendar' },
    { id: 'album', label: 'Album Bay', path: '/album' },
    { id: 'about', label: 'Personnel File', path: '/about' }
  ];

  return (
    <nav className="hud-panel m-6 p-4">
      <div className="flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center animate-glow">
            <div className="w-3 h-3 bg-primary rounded-full" />
          </div>
          <h1 className="font-orbitron font-bold text-xl text-primary tracking-wider">
            GALACTIC CHRONICLES
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`nav-link relative px-4 py-2 transition-all duration-300 ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              {item.label}
              
              {/* Hover effect */}
              {hoveredItem === item.id && (
                <div className="absolute inset-0 bg-primary/10 rounded-md animate-pulse" />
              )}
              
              {/* Active indicator */}
              {location.pathname === item.path && (
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-secondary rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Status indicators */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">ONLINE</span>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            {new Date().toLocaleTimeString('en-US', { 
              hour12: false,
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};