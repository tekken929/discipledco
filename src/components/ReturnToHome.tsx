import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function ReturnToHome() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 theme-card border-2 px-4 py-2 rounded-lg hover:shadow-lg transition-all text-gray-900 dark:text-white font-semibold"
        >
          <Home className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
