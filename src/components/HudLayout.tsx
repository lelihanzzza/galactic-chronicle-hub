import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';

interface HudLayoutProps {
  children: React.ReactNode;
}

export const HudLayout = ({ children }: HudLayoutProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMouseMoving(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // Calculate parallax offset based on mouse position
  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background grid */}
      <div 
        className="fixed inset-0 opacity-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
          backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Scanning line effect */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan opacity-30" />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-40"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${parallaxX * (i + 1)}px, ${parallaxY * (i + 1)}px)`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <main 
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`
          }}
        >
          {children}
        </main>
      </div>

      {/* Cursor glow effect */}
      {isMouseMoving && (
        <div
          className="fixed pointer-events-none z-50 w-32 h-32 rounded-full"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* HUD frame corners */}
      <div className="fixed top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary opacity-60" />
      <div className="fixed top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary opacity-60" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary opacity-60" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary opacity-60" />
    </div>
  );
};