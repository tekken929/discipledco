export function Religions() {
  return (
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
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
              <img
                src="https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ancient church"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">The Great Schism (1054)</h3>
              <p className="text-blue-800 dark:text-blue-200">
                The split between Eastern Orthodoxy and Roman Catholicism over theological and political differences that had been brewing for centuries.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <img
                src="https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Reformation"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">Protestant Reformation (1517)</h3>
              <p className="text-green-800 dark:text-green-200">
                Martin Luther's 95 Theses sparked a movement that challenged papal authority and emphasized Scripture alone, faith alone, and grace alone.
              </p>
            </div>
          </div>

          <Link
            to="/timeline"
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all group hover:scale-105 block"
          >
            <img
              src="https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Church history"
              className="w-full h-64 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity"
            />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
              Denominations Today
              <span className="text-lg theme-accent">→</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Modern Christianity encompasses Roman Catholicism, Eastern Orthodoxy, and numerous Protestant denominations including
              Lutheran, Reformed, Anglican, Baptist, Methodist, Pentecostal, and many others. Each tradition maintains unique
              theological emphases, liturgical practices, and organizational structures while sharing core beliefs in Christ.
            </p>
            <div className="theme-primary-button inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold">
              View Complete Timeline
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
