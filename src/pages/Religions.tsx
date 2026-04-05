import { useState } from 'react';
import { Calendar, BookOpen, Cross, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { timelineEvents } from '../data/timeline';
import { DenominationTree } from '../components/DenominationTree';
import { ReturnToHome } from '../components/ReturnToHome';

export function Religions() {
  const [showTimeline, setShowTimeline] = useState(false);

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
    <>
      <ReturnToHome />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">Religions</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the early Churches split into different groups</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The history of Christianity is marked by significant divisions and theological disputes that shaped the various denominations
              we see today. Understanding these historical splits helps us appreciate the diverse expressions of Christian faith.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              From the Great Schism of 1054 to the Protestant Reformation and beyond, each division emerged from deeply held convictions
              about doctrine, practice, and church authority.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700 flex flex-col h-full hover:shadow-xl transition-all hover:scale-105">
              <img
                src="https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ancient church"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">The Great Schism (1054)</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                The split between Eastern Orthodoxy and Roman Catholicism over theological and political differences that had been brewing for centuries.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-700 flex flex-col h-full hover:shadow-xl transition-all hover:scale-105">
              <img
                src="https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Reformation"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">Protestant Reformation (1517)</h3>
              <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                Martin Luther's 95 Theses sparked a movement that challenged papal authority and emphasized Scripture alone, faith alone, and grace alone.
              </p>
            </div>
          </div>

          <div className="theme-card rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Denominations Today
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              Modern Christianity encompasses Roman Catholicism, Eastern Orthodoxy, and numerous Protestant denominations.
              Click on the bubbles below to explore how Christianity branched into different traditions over time.
            </p>

            <DenominationTree />
          </div>

          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all group hover:scale-105 block w-full text-left"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
              Complete Historical Timeline
              {showTimeline ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              View the complete chronological timeline from Creation to modern day, including key events in Jewish,
              Catholic, Orthodox, and Protestant history.
            </p>
            <div className="theme-primary-button inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold">
              {showTimeline ? 'Hide' : 'View'} Timeline
              {showTimeline ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showTimeline && (
            <div className="space-y-8 mt-8">
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="relative"
                  >
                    {index !== timelineEvents.length - 1 && (
                      <div className="absolute left-8 top-24 bottom-0 w-1 bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800 transform translate-y-2"></div>
                    )}

                    <div className={`bg-gradient-to-br ${getCategoryColor(event.category)} rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all p-6 md:p-8 relative`}>
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
                ))}
              </div>

              <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
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
            </div>
          )}
        </div>
      </div>
    </main>
    </>
  );
}
