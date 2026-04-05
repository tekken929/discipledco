import { ReturnToHome } from '../components/ReturnToHome';

export function ChurchMentors() {
  return (
    <>
      <ReturnToHome />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Church Mentors</h1>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-lg">
            Connect with experienced believers who can guide you in your spiritual journey.
          </p>
          <p>
            Content coming soon...
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
