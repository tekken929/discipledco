import { Play, Pause, SkipForward, SkipBack, Volume2, X, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { useNavigate } from 'react-router-dom';

export function FloatingMusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    playNext,
    playPrevious,
    setVolume,
    seek,
  } = useMusicPlayer();

  const [isMinimized, setIsMinimized] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const navigate = useNavigate();

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="theme-primary-button text-white p-3 rounded-full shadow-2xl hover:shadow-xl transition-all"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-64 md:w-72">
      <div className="theme-card border-2 rounded-xl shadow-2xl p-3 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Music JukeBox</h2>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => navigate('/music')}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              title="Go to Music page"
            >
              <Maximize2 className="w-3.5 h-3.5 text-gray-700 dark:text-gray-100" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-700 dark:text-gray-100" />
            </button>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
            {currentTrack.title}
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-200 truncate">
            {currentTrack.artist}
          </p>
        </div>

        <div className="mb-3">
          <div
            className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer group relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = x / rect.width;
              seek(percentage * duration);
            }}
          >
            <div
              className="h-full theme-primary-button rounded-full transition-all relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-200 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-700 dark:text-gray-200 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={playPrevious}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-100"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full theme-primary-button text-white hover:shadow-lg transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={playNext}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-100"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-100"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
            {showVolumeSlider && (
              <div className="absolute bottom-full right-0 mb-2 p-2 theme-card border-2 rounded-lg shadow-xl">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  style={{ writingMode: 'horizontal-tb' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
