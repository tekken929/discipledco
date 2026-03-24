import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Trash2, Music as MusicIcon, Upload } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  file_path: string;
  file_url: string;
  duration: number;
  play_count: number;
  uploaded_at: string;
}

export function Music() {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [uploading, setUploading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const loadTracks = async () => {
    const { data, error } = await supabase
      .from('music_tracks')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (!error && data) {
      setTracks(data);
    }
  };


  const playTrack = (track: MusicTrack) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);

      supabase
        .from('music_tracks')
        .update({ play_count: track.play_count + 1 })
        .eq('id', track.id)
        .then(() => loadTracks());
    }
  };

  const deleteTrack = async (track: MusicTrack) => {
    if (!confirm(`Delete "${track.title}"?`)) return;

    await supabase.storage.from('music').remove([track.file_path]);
    await supabase.from('music_tracks').delete().eq('id', track.id);

    if (currentTrack?.id === track.id) {
      setCurrentTrack(null);
      setIsPlaying(false);
    }

    loadTracks();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('audio/')) continue;

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `music/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('music')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('music')
        .getPublicUrl(filePath);

      const audio = new Audio();
      audio.src = urlData.publicUrl;

      audio.addEventListener('loadedmetadata', async () => {
        const trackName = file.name.replace(/\.[^/.]+$/, '');

        await supabase.from('music_tracks').insert({
          title: trackName,
          artist: 'Unknown Artist',
          file_path: filePath,
          file_url: urlData.publicUrl,
          duration: Math.floor(audio.duration),
          play_count: 0
        });

        loadTracks();
      });
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const playNext = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    if (currentIndex < tracks.length - 1) {
      playTrack(tracks[currentIndex + 1]);
    }
  };

  const playPrevious = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    if (currentIndex > 0) {
      playTrack(tracks[currentIndex - 1]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.file_url;
      audioRef.current.play();
    }
  }, [currentTrack]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">Music Jukebox</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Worship songs and Christian music</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Playlist</h2>
          {tracks.length === 0 ? (
            <div className="text-center py-12">
              <MusicIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">No songs yet. Upload some music to get started!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    currentTrack?.id === track.id
                      ? 'theme-primary-button text-white'
                      : 'theme-card hover:shadow-md cursor-pointer'
                  }`}
                >
                  <button
                    onClick={() => playTrack(track)}
                    className="flex-shrink-0"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0" onClick={() => playTrack(track)}>
                    <h3 className="font-semibold truncate">{track.title}</h3>
                    <p className={`text-sm truncate ${
                      currentTrack?.id === track.id ? 'text-white opacity-90' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {track.artist} • {formatTime(track.duration)} • {track.play_count} plays
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTrack(track)}
                    className={`flex-shrink-0 p-2 rounded-lg transition-all ${
                      currentTrack?.id === track.id
                        ? 'hover:bg-white hover:bg-opacity-20'
                        : 'hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400'
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative mt-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="music-upload"
            />
            <label
              htmlFor="music-upload"
              className={`absolute bottom-0 right-0 p-2 rounded-lg transition-all cursor-pointer
                ${uploading ? 'opacity-50 cursor-not-allowed' : 'opacity-20 hover:opacity-40'}
                text-gray-400 dark:text-gray-600`}
              title="Upload music"
            >
              <Upload className="w-4 h-4" />
            </label>
          </div>
        </div>

        {currentTrack && (
          <div className="theme-card border-2 rounded-2xl p-6 shadow-lg sticky bottom-4">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{currentTrack.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{currentTrack.artist}</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  const time = parseFloat(e.target.value);
                  setCurrentTime(time);
                  if (audioRef.current) {
                    audioRef.current.currentTime = time;
                  }
                }}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={playPrevious}
                className="p-3 rounded-full theme-card border-2 hover:shadow-md transition-all"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={() => currentTrack && playTrack(currentTrack)}
                className="p-4 rounded-full theme-primary-button text-white hover:shadow-lg transition-all"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </button>
              <button
                onClick={playNext}
                className="p-3 rounded-full theme-card border-2 hover:shadow-md transition-all"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        <audio
          ref={audioRef}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
          onEnded={playNext}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </main>
  );
}
