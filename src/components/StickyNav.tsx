import { ArrowLeft, Home, Download, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CollectedMessagesDropdown from './CollectedMessagesDropdown';

export function StickyNav() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }

    setDeferredPrompt(null);
  };

  const handleHardRefresh = async () => {
    setRefreshing(true);
    try {
      // Clear all service worker caches
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
      // Update the service worker so the new version activates immediately
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((reg) => reg.update()));
      }
    } finally {
      // Force a true network reload, bypassing the browser's HTTP cache
      window.location.reload();
    }
  };

  return (
    <>
      <div className="sticky top-0 z-40 theme-card border-b-2 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 theme-primary-button text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 theme-card border-2 text-gray-900 dark:text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:scale-105 hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to previous page</span>
            </button>
            <button
              onClick={handleHardRefresh}
              disabled={refreshing}
              title="Clear cache and reload latest version"
              className="inline-flex items-center gap-2 px-4 py-2 theme-card border-2 text-gray-900 dark:text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            {showInstallButton && (
              <button
                onClick={handleInstall}
                className="inline-flex items-center gap-2 px-4 py-2 theme-primary-button text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Install App</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <CollectedMessagesDropdown />
    </>
  );
}
