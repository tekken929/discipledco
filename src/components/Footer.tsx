import { Link } from 'react-router-dom';
import { BookOpen, Users, FolderOpen } from 'lucide-react';

export function Footer() {
  const footerLinks = [
    {
      to: '/resources',
      icon: BookOpen,
      title: 'Bible Versions',
      description: 'Which one should I use?'
    },
    {
      to: '/studyguides',
      icon: FolderOpen,
      title: 'Religions',
      description: 'How the early Churches split into different groups.'
    },
    {
      to: '/faqs',
      icon: Users,
      title: 'FAQs',
      description: 'Some of your common questions answered.'
    }
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 print:hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {footerLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-bold text-blue-900 dark:text-blue-100">{link.title}</div>
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">{link.description}</div>
              </Link>
            );
          })}
        </div>

        <div className="text-center text-gray-600 dark:text-gray-300 text-sm pt-6 border-t border-gray-200 dark:border-gray-700">
          <p>© 2026 Discipled Co. | Clear, structured overviews of the Bible and how to break free from this world.</p>
        </div>
      </div>
    </footer>
  );
}
