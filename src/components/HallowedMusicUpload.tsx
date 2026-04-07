import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HallowedMusicUploadProps {
  onUploadComplete: () => void;
}

const ADMIN_PASSWORD = 'hallowed2026';

export function HallowedMusicUpload({ onUploadComplete }: HallowedMusicUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('Hallowed');
  const [album, setAlbum] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('audio/')) {
        setError('Please select an audio file');
        return;
      }
      setFile(selectedFile);
      setError('');
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title) {
      setError('Please provide a title and select a file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('hallowed-music')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('hallowed-music')
        .getPublicUrl(filePath);

      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener('loadedmetadata', async () => {
        const duration = Math.floor(audio.duration);

        const { error: insertError } = await supabase
          .from('hallowed_tracks')
          .insert({
            title,
            artist: artist || 'Hallowed',
            album: album || null,
            duration,
            audio_url: publicUrl,
          });

        if (insertError) throw insertError;

        setTitle('');
        setArtist('Hallowed');
        setAlbum('');
        setFile(null);
        setIsOpen(false);
        setIsAuthenticated(false);
        setUploading(false);
        onUploadComplete();
      });
    } catch (err) {
      console.error('Error uploading:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload track');
      setUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hallowed-upload-trigger"
        aria-label="Admin upload"
      >
        <Upload className="w-5 h-5" />
        <span>Admin</span>
      </button>

      {isOpen && (
        <div className="hallowed-upload-modal">
          <div className="hallowed-upload-backdrop" onClick={() => {
            if (!uploading) {
              setIsOpen(false);
              setIsAuthenticated(false);
              setPassword('');
              setError('');
            }
          }} />
          <div className="hallowed-upload-content">
            <div className="hallowed-upload-header">
              <h2>{isAuthenticated ? 'Upload Track' : 'Admin Access'}</h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsAuthenticated(false);
                  setPassword('');
                  setError('');
                }}
                disabled={uploading}
                className="hallowed-upload-close"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isAuthenticated ? (
              <form onSubmit={handlePasswordSubmit} className="hallowed-upload-form">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="hallowed-upload-submit">
                  Enter
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="hallowed-upload-form">
              <div className="form-group">
                <label htmlFor="file">Audio File</label>
                <input
                  id="file"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  required
                />
                {file && <p className="file-name">{file.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={uploading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="artist">Artist</label>
                <input
                  id="artist"
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  disabled={uploading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="album">Album (optional)</label>
                <input
                  id="album"
                  type="text"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  disabled={uploading}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                disabled={uploading || !file || !title}
                className="hallowed-upload-submit"
              >
                {uploading ? 'Uploading...' : 'Upload Track'}
              </button>
            </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
