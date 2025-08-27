import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface HudButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const HudButton = ({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className, 
  children, 
  disabled,
  ...props 
}: HudButtonProps) => {
  const baseClasses = "relative overflow-hidden font-orbitron font-medium tracking-wide transition-all duration-300 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "hud-button",
    secondary: "hud-button-secondary", 
    danger: "bg-destructive text-destructive-foreground border-destructive/50 hover:shadow-[0_0_25px_hsl(var(--destructive)/0.8)]"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      
      {/* Scan line effect on hover */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </button>
  );
};