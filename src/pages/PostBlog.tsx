import { useState } from 'react';
import { HudInput } from '@/components/HudInput';
import { HudButton } from '@/components/HudButton';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  subject: string;
  content: string;
  date: string;
  time: string;
}

export const PostBlog = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !content.trim()) {
      toast.error('Mission parameters incomplete', {
        description: 'Both subject and content are required for log entry.'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newPost: BlogPost = {
      id: Date.now().toString(),
      subject: subject.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    // Save to localStorage for now
    const existingPosts = JSON.parse(localStorage.getItem('galactic-blogs') || '[]');
    localStorage.setItem('galactic-blogs', JSON.stringify([newPost, ...existingPosts]));

    toast.success('Mission log transmitted', {
      description: `Entry "${subject}" has been recorded in the galactic archives.`
    });

    setSubject('');
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="hud-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-orbitron font-bold text-3xl text-primary">Mission Log Entry</h1>
              <p className="font-mono text-muted-foreground mt-2">
                Document your galactic discoveries and adventures
              </p>
            </div>
            <div className="text-right font-mono text-sm text-muted-foreground">
              <div>STARDATE: {new Date().toLocaleDateString()}</div>
              <div>TIME: {new Date().toLocaleTimeString('en-US', { hour12: false })}</div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="hud-panel p-8 space-y-6">
            <HudInput
              label="Mission Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter the subject of your galactic log..."
              maxLength={100}
              required
            />

            <div className="space-y-2">
              <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide">
                Mission Report
              </label>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe your adventure across the stars..."
                  rows={12}
                  className="w-full px-4 py-3 rounded-md font-mono bg-input border border-border text-foreground resize-none transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  required
                />
                <div className="absolute bottom-2 right-2 font-mono text-xs text-muted-foreground">
                  {content.length} characters
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <span className="font-mono text-sm text-muted-foreground">Auto-save enabled</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <HudButton
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setSubject('');
                    setContent('');
                    toast.info('Log entry cleared');
                  }}
                >
                  Clear Log
                </HudButton>
                <HudButton
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={!subject.trim() || !content.trim()}
                >
                  Transmit Entry
                </HudButton>
              </div>
            </div>
          </div>
        </form>

        {/* Quick Tips */}
        <div className="hud-panel p-6">
          <h3 className="font-orbitron font-bold text-lg mb-4 text-primary">Commander's Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-mono text-sm font-medium text-secondary">✦ Format Guidelines</div>
              <ul className="font-mono text-xs text-muted-foreground space-y-1">
                <li>• Use clear, descriptive subjects</li>
                <li>• Include location coordinates when possible</li>
                <li>• Note any alien encounters or phenomena</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-sm font-medium text-secondary">✦ Archive Organization</div>
              <ul className="font-mono text-xs text-muted-foreground space-y-1">
                <li>• Entries are auto-timestamped</li>
                <li>• Use consistent terminology</li>
                <li>• Include mission difficulty ratings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};