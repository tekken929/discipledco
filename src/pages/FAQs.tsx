export function FAQs() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">FAQs</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Some of your common questions answered</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We've compiled answers to the most frequently asked questions about Bible study, Christian faith, and spiritual growth.
              These resources are designed to help you grow deeper in your understanding.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you're new to the faith or have been walking with Christ for years, these answers provide clarity on common topics.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">How do I start reading the Bible?</h3>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                Start with one of the Gospels (Matthew, Mark, Luke, or John) to learn about Jesus' life and teachings.
                Many recommend beginning with the Gospel of John for its clear presentation of Christ's deity and mission.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">Which Bible translation is best?</h3>
              <p className="text-green-800 dark:text-green-200 leading-relaxed">
                The best translation depends on your purpose. The NIV and ESV offer good balance between accuracy and readability.
                The KJV is traditional but uses older English. For study, consider using multiple translations to compare.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
              <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-3">How can I understand difficult passages?</h3>
              <p className="text-orange-800 dark:text-orange-200 leading-relaxed">
                Use study Bibles with notes, commentaries, and cross-references. Consider the historical and cultural context.
                Pray for understanding, and don't hesitate to discuss challenging passages with mature believers or pastors.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 rounded-xl p-6 border border-teal-200 dark:border-teal-700">
              <h3 className="text-xl font-bold text-teal-900 dark:text-teal-100 mb-3">What's the difference between denominations?</h3>
              <p className="text-teal-800 dark:text-teal-200 leading-relaxed">
                Denominations differ in worship style, church structure, and interpretations of certain doctrines. However, most
                share core beliefs in the Trinity, salvation through Christ, and the authority of Scripture.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
            <img
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Bible study group"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Have more questions?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The journey of faith is filled with questions, and seeking answers is part of spiritual growth. Keep exploring,
              studying, and asking questions as you grow in your relationship with God.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
