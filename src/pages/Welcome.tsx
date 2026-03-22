import { BookOpen, Heart, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Welcome() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 text-center transition-colors">
          <div className="flex justify-center mb-6">
            <img
              src="https://images.pexels.com/photos/6120234/pexels-photo-6120234.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
              alt="Discipled Co."
              className="w-32 h-32 rounded-2xl object-cover shadow-lg"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Discipled Co.
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            A page made simply to help understand what the Bible is, how it got here and how this infallable book was put here to guide us.
          </p>
        </div>

        {/* What This Website Is For */}
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What We Offer</h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
              Discipled Co. is designed to help believers and seekers alike navigate the depths of Scripture
              with clarity and confidence. We provide:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Clear, structured overviews</strong> of all 66 books of the Bible with chapter summaries</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Bible translation guides</strong> to help you understand the differences between versions</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Biblical topics</strong> covering marriage, relationships, sin, salvation, and more</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Popular Bible stories</strong> with context and meaning</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 theme-accent flex-shrink-0 mt-1" />
                <span><strong>Historical insights</strong> into how Christianity developed and divided</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Who We Are */}
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Who We Are</h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
              We are a team of dedicated believers committed to making the Bible accessible and understandable
              for everyone. Our mission is to break down complex theological concepts into clear, digestible content
              that empowers you to study Scripture confidently.
            </p>
            <p className="text-lg">
              With backgrounds in theology, education, and technology, we've come together to create a resource
              that serves both new believers taking their first steps in faith and seasoned Christians seeking
              deeper understanding.
            </p>
          </div>
        </div>

        {/* What We Believe */}
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What We Believe</h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
              We believe the Bible is the inspired Word of God, containing everything we need for faith and life.
              Our core beliefs include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Trinity</h3>
                <p>One God in three persons: Father, Son, and Holy Spirit</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Salvation by Grace</h3>
                <p>We are saved through faith in Jesus Christ, not by our own works</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Gospel</h3>
                <p>Jesus died for our sins, was buried, and rose again on the third day</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Scripture</h3>
                <p>The Bible is authoritative, inerrant, and sufficient for all of life</p>
              </div>
            </div>
            <p className="text-lg mt-6">
              We are committed to presenting Biblical truth with love, clarity, and grace, helping you break free
              from the distractions of this world and grow closer to God through His Word.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="theme-card rounded-2xl shadow-xl p-8 text-center transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Start exploring the Bible with our comprehensive study tools
          </p>
          <Link
            to="/bible"
            className="inline-flex items-center gap-2 theme-primary-button text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
          >
            <BookOpen className="w-6 h-6" />
            Explore the Bible
          </Link>
        </div>
      </div>
    </main>
  );
}
