import { useState, useEffect } from 'react';
import { HudButton } from '@/components/HudButton';
import { HudInput } from '@/components/HudInput';
import { toast } from 'sonner';

interface PersonnelData {
  name: string;
  rank: string;
  callSign: string;
  homeworld: string;
  specialization: string;
  bio: string;
  yearsOfService: string;
  achievements: string[];
}

export const About = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [personnelData, setPersonnelData] = useState<PersonnelData>(() => {
    const saved = localStorage.getItem('galactic-personnel');
    return saved ? JSON.parse(saved) : {
      name: 'Commander Phoenix',
      rank: 'Captain',
      callSign: 'StarWalker',
      homeworld: 'Earth Prime',
      specialization: 'Deep Space Exploration',
      bio: 'A seasoned space explorer with extensive experience in galactic reconnaissance and diplomatic missions. Committed to documenting the wonders of the universe and maintaining peaceful relations with alien civilizations.',
      yearsOfService: '8',
      achievements: [
        'First Contact Protocol Certification',
        'Nebula Navigation Expert',
        'Quantum Drive Specialist',
        'Alien Linguistics Proficiency'
      ]
    };
  });

  const [editData, setEditData] = useState<PersonnelData>(personnelData);
  const [newAchievement, setNewAchievement] = useState('');

  useEffect(() => {
    localStorage.setItem('galactic-personnel', JSON.stringify(personnelData));
  }, [personnelData]);

  const handleSave = () => {
    setPersonnelData(editData);
    setIsEditing(false);
    toast.success('Personnel file updated', {
      description: 'Your commander profile has been synchronized with the galactic database.'
    });
  };

  const handleCancel = () => {
    setEditData(personnelData);
    setIsEditing(false);
    toast.info('Edit cancelled');
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setEditData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement('');
      toast.success('Achievement added');
    }
  };

  const removeAchievement = (index: number) => {
    setEditData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
    toast.info('Achievement removed');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="hud-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-orbitron font-bold text-3xl text-primary">Personnel File</h1>
              <p className="font-mono text-muted-foreground mt-2">
                Commander profile and service record
              </p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <HudButton variant="danger" onClick={handleCancel}>
                    Cancel
                  </HudButton>
                  <HudButton onClick={handleSave}>
                    Save Changes
                  </HudButton>
                </>
              ) : (
                <HudButton variant="secondary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </HudButton>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Image & Basic Info */}
          <div className="space-y-6">
            <div className="hud-panel p-6 text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-orbitron font-bold text-primary-foreground">
                {personnelData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="font-orbitron font-bold text-xl text-foreground">
                  {personnelData.name}
                </h2>
                <div className="font-mono text-sm text-primary">{personnelData.rank}</div>
                <div className="font-mono text-xs text-muted-foreground">
                  Call Sign: {personnelData.callSign}
                </div>
              </div>
            </div>

            {/* Service Stats */}
            <div className="hud-panel p-6 space-y-4">
              <h3 className="font-orbitron font-bold text-lg text-secondary">Service Record</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-muted-foreground">Years Active</span>
                  <span className="font-mono text-sm text-foreground font-bold">
                    {personnelData.yearsOfService}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-muted-foreground">Missions</span>
                  <span className="font-mono text-sm text-foreground font-bold">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-muted-foreground">Status</span>
                  <span className="font-mono text-sm text-secondary font-bold">Active Duty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="hud-panel p-6 space-y-6">
              <h3 className="font-orbitron font-bold text-lg text-secondary">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {isEditing ? (
                    <HudInput
                      label="Full Name"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <div>
                      <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide mb-2">
                        Full Name
                      </label>
                      <div className="font-mono text-foreground">{personnelData.name}</div>
                    </div>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <HudInput
                      label="Rank"
                      value={editData.rank}
                      onChange={(e) => setEditData(prev => ({ ...prev, rank: e.target.value }))}
                    />
                  ) : (
                    <div>
                      <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide mb-2">
                        Rank
                      </label>
                      <div className="font-mono text-foreground">{personnelData.rank}</div>
                    </div>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <HudInput
                      label="Call Sign"
                      value={editData.callSign}
                      onChange={(e) => setEditData(prev => ({ ...prev, callSign: e.target.value }))}
                    />
                  ) : (
                    <div>
                      <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide mb-2">
                        Call Sign
                      </label>
                      <div className="font-mono text-foreground">{personnelData.callSign}</div>
                    </div>
                  )}
                </div>

                <div>
                  {isEditing ? (
                    <HudInput
                      label="Homeworld"
                      value={editData.homeworld}
                      onChange={(e) => setEditData(prev => ({ ...prev, homeworld: e.target.value }))}
                    />
                  ) : (
                    <div>
                      <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide mb-2">
                        Homeworld
                      </label>
                      <div className="font-mono text-foreground">{personnelData.homeworld}</div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  {isEditing ? (
                    <HudInput
                      label="Specialization"
                      value={editData.specialization}
                      onChange={(e) => setEditData(prev => ({ ...prev, specialization: e.target.value }))}
                    />
                  ) : (
                    <div>
                      <label className="block font-orbitron text-sm font-medium text-foreground uppercase tracking-wide mb-2">
                        Specialization
                      </label>
                      <div className="font-mono text-foreground">{personnelData.specialization}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="hud-panel p-6 space-y-6">
              <h3 className="font-orbitron font-bold text-lg text-secondary">Biography</h3>
              
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={6}
                    className="hud-input resize-none"
                    placeholder="Enter your background and experience..."
                  />
                </div>
              ) : (
                <div className="font-mono text-sm text-foreground leading-relaxed">
                  {personnelData.bio}
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="hud-panel p-6 space-y-6">
              <h3 className="font-orbitron font-bold text-lg text-secondary">Achievements</h3>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <HudInput
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Enter new achievement..."
                    className="flex-1"
                  />
                  <HudButton onClick={addAchievement} disabled={!newAchievement.trim()}>
                    Add
                  </HudButton>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(isEditing ? editData.achievements : personnelData.achievements).map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span className="font-mono text-sm text-foreground">{achievement}</span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeAchievement(index)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};