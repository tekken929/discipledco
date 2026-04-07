import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  duration: number | null;
  audio_url: string;
  order_index: number;
}

export function HallowedMusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const { data, error } = await supabase
      .from('hallowed_tracks')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching tracks:', error);
      return;
    }

    if (data) {
      setTracks(data);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setIsPlaying(false);
        setCurrentTrackIndex(0);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, tracks.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current && tracks.length > 0) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, tracks]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      setCurrentTrackIndex(currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex(currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (tracks.length === 0) {
    return null;
  }

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="hallowed-music-player">
      <audio ref={audioRef} src={currentTrack?.audio_url} />

      <div className="player-track-info">
        <div className="track-title">{currentTrack?.title || 'No Track'}</div>
        <div className="track-artist">{currentTrack?.artist || 'Unknown Artist'}</div>
        {currentTrack?.album && <div className="track-album">{currentTrack.album}</div>}
      </div>

      <div className="player-progress">
        <span className="time-display">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="progress-bar"
        />
        <span className="time-display">{formatTime(duration)}</span>
      </div>

      <div className="player-controls">
        <button onClick={handlePrevious} className="control-btn" aria-label="Previous track">
          <SkipBack className="w-5 h-5" />
        </button>

        <button onClick={togglePlay} className="control-btn play-btn" aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <button onClick={handleNext} className="control-btn" aria-label="Next track">
          <SkipForward className="w-5 h-5" />
        </button>

        <div className="volume-control">
          <button onClick={toggleMute} className="control-btn" aria-label={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>

      <div className="player-playlist">
        <div className="playlist-title">Playlist ({tracks.length} tracks)</div>
        <div className="playlist-tracks">
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => setCurrentTrackIndex(index)}
              className={`playlist-track ${index === currentTrackIndex ? 'active' : ''}`}
            >
              <span className="track-number">{index + 1}</span>
              <span className="track-name">{track.title}</span>
              {track.duration && <span className="track-duration">{formatTime(track.duration)}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
