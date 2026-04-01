import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, BookOpen, Cross, Star } from 'lucide-react';
import { timelineEvents, timelineSections } from '../data/timeline';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

export function Timeline() {
  const [activeEventIndex, setActiveEventIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowCenter = window.innerHeight / 2;

      timelineEvents.forEach((_, index) => {
        const element = document.getElementById(`timeline-event-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;

          if (Math.abs(elementCenter - windowCenter) < 200) {
            setActiveEventIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'creation':
        return <Star className="w-5 h-5" />;
      case 'jewish':
        return <BookOpen className="w-5 h-5" />;
      case 'catholic':
        return <Cross className="w-5 h-5" />;
      case 'protestant':
        return <Cross className="w-5 h-5" />;
      case 'modern':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'creation':
        return 'from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-200 dark:border-yellow-700';
      case 'jewish':
        return 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700';
      case 'catholic':
        return 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-700';
      case 'protestant':
        return 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700';
      case 'modern':
        return 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-700';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 border-gray-200 dark:border-gray-700';
    }
  };

  const getCategoryTextColor = (category: string) => {
    switch (category) {
      case 'creation':
        return 'text-yellow-900 dark:text-yellow-100';
      case 'jewish':
        return 'text-blue-900 dark:text-blue-100';
      case 'catholic':
        return 'text-red-900 dark:text-red-100';
      case 'protestant':
        return 'text-green-900 dark:text-green-100';
      case 'modern':
        return 'text-purple-900 dark:text-purple-100';
      default:
        return 'text-gray-900 dark:text-gray-100';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'creation':
        return 'bg-yellow-600 text-white';
      case 'jewish':
        return 'bg-blue-600 text-white';
      case 'catholic':
        return 'bg-red-600 text-white';
      case 'protestant':
        return 'bg-green-600 text-white';
      case 'modern':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 spacing-section">
      <Link
        to="/religions"
        className="link-cinematic inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-12 transition-colors font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Religions
      </Link>

      <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors mb-16 card-cinematic">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          The Journey of Faith
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          A cinematic journey from creation through the development of Judaism, Christianity, Catholicism, and Protestantism
        </p>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            How to Edit This Timeline
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            This timeline is stored in <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">src/data/timeline.ts</code>
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Open that file to find detailed instructions on adding new events, editing existing ones, and understanding the different categories and time periods.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {timelineSections.map((section) => (
            <div
              key={section.id}
              className={`bg-gradient-to-br ${getCategoryColor(section.category)} rounded-lg p-3 border text-center`}
            >
              <div className={`font-semibold ${getCategoryTextColor(section.category)} text-sm`}>
                {section.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE PATH - CINEMATIC JOURNEY */}
      <div className="relative space-y-12 md:space-y-16">
        {/* The Path */}
        <div className="hidden md:block timeline-path" style={{ height: `${timelineEvents.length * 400}px` }}>
          <div className="timeline-dot" style={{
            top: activeEventIndex !== null ? `${(activeEventIndex / timelineEvents.length) * 100}%` : '0%'
          }} />
        </div>

        {timelineEvents.map((event, index) => {
          const isActive = activeEventIndex === index;
          const isPassed = activeEventIndex !== null && index < activeEventIndex;
          const eventClass = isActive ? 'active' : isPassed ? 'passed' : '';

          return (
            <div
              key={event.id}
              id={`timeline-event-${index}`}
              className={`timeline-item ${eventClass} cinematic-section ${
                event.category === 'creation' ? 'theme-creation' :
                event.category === 'jewish' && event.year.includes('Fall') ? 'theme-fall' :
                event.category === 'catholic' ? 'theme-jesus' :
                event.category === 'modern' ? 'theme-new-creation' : ''
              }`}
            >
              <div className={`bg-gradient-to-br ${getCategoryColor(event.category)} rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 md:p-8 relative card-cinematic cinematic-image`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`${getCategoryBadgeColor(event.category)} p-3 rounded-full shadow-md flex-shrink-0 relative z-10`}>
                  {getCategoryIcon(event.category)}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h2 className={`text-2xl md:text-3xl font-bold ${getCategoryTextColor(event.category)}`}>
                      {event.title}
                    </h2>
                    <span className={`${getCategoryBadgeColor(event.category)} px-4 py-1 rounded-full text-sm font-bold w-fit`}>
                      {event.year}
                    </span>
                  </div>

                  <p className={`text-lg ${getCategoryTextColor(event.category)} mb-4 opacity-90`}>
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    {event.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-gray-600 dark:text-gray-400 mt-1">•</span>
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {event.relatedLinks && event.relatedLinks.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {event.relatedLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                          <BookOpen className="w-4 h-4" />
                          {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION DIVIDER */}
      <div className="section-divider my-16" />

      <div className="mt-12 theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Key Differences Today
        </h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Judaism
            </h3>
            <ul className="space-y-2 text-gray-800 dark:text-gray-200">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Messiah:</strong> Awaits the Messiah who has not yet come</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Jesus:</strong> Does not accept Jesus as the Messiah or Son of God</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Scripture:</strong> Follows the Torah and Talmud</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Sabbath:</strong> Friday evening to Saturday evening</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>God:</strong> Strict monotheism, no belief in the Trinity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Salvation:</strong> Through following God's commandments (mitzvot)</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl p-6 border border-red-200 dark:border-red-700">
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
              <Cross className="w-6 h-6" />
              Catholicism
            </h3>
            <ul className="space-y-2 text-gray-800 dark:text-gray-200">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Jesus:</strong> Believes Jesus is the Messiah and Son of God</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Authority:</strong> Pope is the supreme spiritual authority on earth</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Sacraments:</strong> Seven sacraments (Baptism, Eucharist, Confirmation, Reconciliation, Anointing, Marriage, Holy Orders)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Saints:</strong> Veneration of Mary and the saints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Afterlife:</strong> Belief in heaven, hell, and purgatory</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Sources:</strong> Both Tradition and Scripture are authoritative</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
              <Cross className="w-6 h-6" />
              Protestantism
            </h3>
            <ul className="space-y-2 text-gray-800 dark:text-gray-200">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Jesus:</strong> Believes Jesus is the Messiah and Son of God</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Authority:</strong> No pope; each denomination governs independently</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Sacraments:</strong> Typically two (Baptism and Communion/Lord's Supper)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Saints:</strong> No veneration of Mary or saints; direct access to God</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Afterlife:</strong> Belief in heaven and hell; no purgatory</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Sources:</strong> Scripture alone (Sola Scriptura) as final authority</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Salvation:</strong> By faith alone (Sola Fide) through grace alone</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
