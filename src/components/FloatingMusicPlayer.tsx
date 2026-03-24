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
          className="theme-primary-button text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96">
      <div className="theme-card border-2 rounded-2xl shadow-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate('/music')}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Go to Music page"
          >
            <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="mb-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
            {currentTrack.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {currentTrack.artist}
          </p>
        </div>

        <div className="mb-3">
          <div
            className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = x / rect.width;
              seek(percentage * duration);
            }}
          >
            <div
              className="h-full theme-primary-button rounded-full transition-all group-hover:h-2"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={playPrevious}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlayPause}
              className="p-2.5 rounded-full theme-primary-button text-white hover:shadow-lg transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={playNext}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            {showVolumeSlider && (
              <div className="absolute bottom-full right-0 mb-2 p-3 theme-card border rounded-lg shadow-xl">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
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
