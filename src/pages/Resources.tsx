export function Resources() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">Bible Versions</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding the different Bible Versions</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
              quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
              <img
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Reading materials"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100 mb-2">New International Version (NIV)</h3>
              <p className="text-sm text-orange-800 dark:text-orange-200">
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-xl p-6 border border-red-200 dark:border-red-700">
              <img
                src="https://images.pexels.com/photos/159618/bible-open-religious-text-159618.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bible translations"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">King James Version (KJV)</h3>
              <p className="text-sm text-red-800 dark:text-red-200">
                Quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 rounded-xl p-6 border border-teal-200 dark:border-teal-700">
              <img
                src="https://images.pexels.com/photos/261857/pexels-photo-261857.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Study tools"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-teal-900 dark:text-teal-100 mb-2">Revised Standard Version : Second Catholic Edition (RSV2CE)</h3>
              <p className="text-sm text-teal-800 dark:text-teal-200">
                Omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Downloadable Content</h3>
              <img
                src="https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Downloads"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <p className="text-gray-700 dark:text-gray-300">
                Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Video Teachings</h3>
              <img
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Video content"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <p className="text-gray-700 dark:text-gray-300">
                Aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
