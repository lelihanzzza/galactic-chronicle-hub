import { Navbar } from './Navbar';

interface HudLayoutProps {
  children: React.ReactNode;
}

export const HudLayout = ({ children }: HudLayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Retro HUD Background Grid */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--retro-green) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--retro-green) / 0.3) 1px, transparent 1px),
            linear-gradient(hsl(var(--retro-green) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--retro-green) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px'
        }}
      />

      {/* Radar Sweep Effect */}
      <div className="fixed top-4 right-4 w-32 h-32 rounded-full border border-retro-green/30 animate-radar-sweep">
        <div className="absolute inset-2 rounded-full border border-retro-green/20" />
        <div className="absolute inset-4 rounded-full border border-retro-green/10" />
        <div className="absolute top-1/2 left-1/2 w-1 h-16 bg-retro-green/50 origin-bottom animate-radar-line" />
      </div>

      {/* System Status Panel */}
      <div className="fixed top-4 left-4 p-4 bg-background/80 border border-retro-green/40 rounded font-mono text-xs text-retro-green">
        <div className="mb-2 text-retro-orange">SYSTEM STATUS</div>
        <div>PWR: [████████] 100%</div>
        <div>SHD: [██████  ] 75%</div>
        <div>ENG: [████████] 100%</div>
        <div className="mt-2 text-retro-orange animate-pulse">READY</div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-background/80 border-t border-retro-green/40 flex items-center px-4 font-mono text-sm text-retro-green">
        <div className="flex-1">IMPERIAL NETWORK: SECURE</div>
        <div>CHRONO: {new Date().toLocaleTimeString()}</div>
        <div className="ml-4">COORD: 12°23'N 142°18'E</div>
      </div>

      {/* Data Streams */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-2 font-mono text-xs text-retro-green/60">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-data-stream" style={{ animationDelay: `${i * 0.3}s` }}>
            {Math.random().toString(36).substring(2, 15).toUpperCase()}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <main className="pb-12">
          {children}
        </main>
      </div>

      {/* HUD Corner Brackets */}
      <div className="fixed top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-retro-orange opacity-80" />
      <div className="fixed top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-retro-orange opacity-80" />
      <div className="fixed bottom-16 left-4 w-12 h-12 border-l-2 border-b-2 border-retro-orange opacity-80" />
      <div className="fixed bottom-16 right-4 w-12 h-12 border-r-2 border-b-2 border-retro-orange opacity-80" />
    </div>
  );
};