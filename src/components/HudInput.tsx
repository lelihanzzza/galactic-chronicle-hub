import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface HudInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const HudInput = forwardRef<HTMLInputElement, HudInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "hud-input",
              error && "border-destructive focus:border-destructive focus:shadow-[0_0_15px_hsl(var(--destructive)/0.3)]",
              className
            )}
            {...props}
          />
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-md border border-transparent bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none" />
        </div>
        {error && (
          <p className="text-sm text-destructive font-mono">{error}</p>
        )}
      </div>
    );
  }
);

HudInput.displayName = 'HudInput';