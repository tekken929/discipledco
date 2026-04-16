import { BookOpen, Cross } from 'lucide-react';
import { DenominationTree } from '../components/DenominationTree';
import { ReturnToHome } from '../components/ReturnToHome';

export function Religions() {
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
      </div>
    </main>
    </>
  );
}
