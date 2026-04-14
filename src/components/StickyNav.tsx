import { ArrowLeft, Home, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CollectedMessagesDropdown from './CollectedMessagesDropdown';

export function StickyNav() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

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

  return (
    <>
      <div className="sticky top-0 z-50 theme-card border-b-2 shadow-sm backdrop-blur-sm">
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
