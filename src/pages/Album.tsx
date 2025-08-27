import { useState, useRef } from 'react';
import { HudButton } from '@/components/HudButton';
import { HudInput } from '@/components/HudInput';
import { toast } from 'sonner';

interface AlbumEntry {
  id: string;
  title: string;
  imageUrl: string;
  audioUrl: string;
  date: string;
  description: string;
}

export const Album = () => {
  const [albums, setAlbums] = useState<AlbumEntry[]>(() => {
    return JSON.parse(localStorage.getItem('galactic-albums') || '[]');
  });
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumEntry | null>(null);
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    description: '',
    imageFile: null as File | null,
    audioFile: null as File | null
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image file too large', {
          description: 'Please select an image under 5MB'
        });
        return;
      }
      setNewAlbum(prev => ({ ...prev, imageFile: file }));
      toast.success('Image loaded into memory banks');
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Audio file too large', {
          description: 'Please select an audio file under 10MB'
        });
        return;
      }
      setNewAlbum(prev => ({ ...prev, audioFile: file }));
      toast.success('Audio signal captured');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAlbum.title.trim() || !newAlbum.imageFile || !newAlbum.audioFile) {
      toast.error('Incomplete album data', {
        description: 'Title, image, and audio files are required'
      });
      return;
    }

    setIsUploading(true);

    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create object URLs for the files (in a real app, these would be uploaded to a server)
    const imageUrl = URL.createObjectURL(newAlbum.imageFile);
    const audioUrl = URL.createObjectURL(newAlbum.audioFile);

    const album: AlbumEntry = {
      id: Date.now().toString(),
      title: newAlbum.title.trim(),
      description: newAlbum.description.trim(),
      imageUrl,
      audioUrl,
      date: new Date().toLocaleDateString()
    };

    const updatedAlbums = [album, ...albums];
    setAlbums(updatedAlbums);
    localStorage.setItem('galactic-albums', JSON.stringify(updatedAlbums));

    toast.success('Album archived successfully', {
      description: `"${album.title}" has been stored in the album bay`
    });

    // Reset form
    setNewAlbum({
      title: '',
      description: '',
      imageFile: null,
      audioFile: null
    });
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (audioInputRef.current) audioInputRef.current.value = '';
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="hud-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-orbitron font-bold text-3xl text-primary">Album Bay</h1>
              <p className="font-mono text-muted-foreground mt-2">
                Archive your audio-visual memories from across the galaxy
              </p>
            </div>
            <div className="text-right font-mono text-sm text-muted-foreground">
              <div>STORAGE: {albums.length} Albums</div>
              <div>STATUS: Online</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="space-y-6">
            <div className="hud-panel p-6">
              <h2 className="font-orbitron font-bold text-xl text-secondary mb-6">
                New Album Entry
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <HudInput
                  label="Album Title"
                  value={newAlbum.title}
                  onChange={(e) => setNewAlbum(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter album title..."
                  required
                />

                <div className="space-y-2">
                  <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    value={newAlbum.description}
                    onChange={(e) => setNewAlbum(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this memory..."
                    rows={3}
                    className="hud-input resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide">
                      Visual Data
                    </label>
                    <div className="relative">
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <HudButton
                        type="button"
                        variant="secondary"
                        onClick={() => imageInputRef.current?.click()}
                        className="w-full"
                      >
                        {newAlbum.imageFile ? '✓ Image Loaded' : 'Upload Image'}
                      </HudButton>
                      {newAlbum.imageFile && (
                        <div className="mt-2 font-mono text-xs text-muted-foreground">
                          {newAlbum.imageFile.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide">
                      Audio Data
                    </label>
                    <div className="relative">
                      <input
                        ref={audioInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                      <HudButton
                        type="button"
                        variant="secondary"
                        onClick={() => audioInputRef.current?.click()}
                        className="w-full"
                      >
                        {newAlbum.audioFile ? '✓ Audio Loaded' : 'Upload Audio'}
                      </HudButton>
                      {newAlbum.audioFile && (
                        <div className="mt-2 font-mono text-xs text-muted-foreground">
                          {newAlbum.audioFile.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <HudButton
                  type="submit"
                  isLoading={isUploading}
                  disabled={!newAlbum.title.trim() || !newAlbum.imageFile || !newAlbum.audioFile}
                  className="w-full"
                >
                  Archive Album
                </HudButton>
              </form>
            </div>
          </div>

          {/* Album Gallery */}
          <div className="space-y-6">
            <div className="hud-panel p-6">
              <h2 className="font-orbitron font-bold text-xl text-secondary mb-6">
                Archived Albums
              </h2>
              
              {albums.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4 opacity-50">🎵</div>
                  <p className="font-mono text-muted-foreground">
                    No albums archived yet. Create your first memory!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {albums.map((album) => (
                    <div
                      key={album.id}
                      className={`hud-panel p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedAlbum?.id === album.id ? 'border-secondary shadow-orange' : ''
                      }`}
                      onClick={() => setSelectedAlbum(album)}
                    >
                      <div className="aspect-square mb-3 rounded-md overflow-hidden bg-muted">
                        <img
                          src={album.imageUrl}
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-orbitron font-medium text-sm text-foreground mb-1">
                        {album.title}
                      </h3>
                      <div className="font-mono text-xs text-muted-foreground">
                        {album.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Album Player */}
        {selectedAlbum && (
          <div className="hud-panel p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-orbitron font-bold text-2xl text-primary mb-2">
                  {selectedAlbum.title}
                </h2>
                {selectedAlbum.description && (
                  <p className="font-mono text-muted-foreground">
                    {selectedAlbum.description}
                  </p>
                )}
              </div>
              <HudButton
                variant="danger"
                size="sm"
                onClick={() => setSelectedAlbum(null)}
              >
                Close
              </HudButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={selectedAlbum.imageUrl}
                    alt={selectedAlbum.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <audio
                  controls
                  className="w-full"
                  style={{
                    filter: 'hue-rotate(180deg) invert(1)',
                    borderRadius: '8px'
                  }}
                >
                  <source src={selectedAlbum.audioUrl} />
                  Your browser does not support the audio element.
                </audio>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-muted-foreground">Archive Date</span>
                    <span className="font-mono text-sm text-foreground">{selectedAlbum.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-muted-foreground">Album ID</span>
                    <span className="font-mono text-sm text-foreground">#{selectedAlbum.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-muted-foreground">Status</span>
                    <span className="font-mono text-sm text-secondary">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};