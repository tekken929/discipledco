import { BookOpen, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useState } from 'react';

export function Welcome() {
  const [showWhoMadeThis, setShowWhoMadeThis] = useState(false);
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
            Understand what the Bible is, how to read it, how it got here and how this infallable book was put here to guide us.
          </p>
        </div>

        {/* What This Website Is For */}
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What you will find here:</h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
             Nnavigate the depths of Scripture
              with clarity and confidence. 
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
                <span><strong>Historical insights</strong> into how Christianity and other Religions developed and divided the Church.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="theme-card rounded-2xl shadow-xl p-8 text-center transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Next Steps:
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              to="/bible"
              className="inline-flex items-center gap-2 theme-primary-button text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
            >
              <BookOpen className="w-6 h-6" />
              Bible Overview
            </Link>
            <button
              onClick={() => setShowWhoMadeThis(true)}
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
            >
              <Users className="w-6 h-6" />
              Who Made This?
            </button>
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={showWhoMadeThis}
          onClose={() => setShowWhoMadeThis(false)}
          title="Who made this page?"
        >
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
              This isn't about religion—it's about truth.<br></br>

I don't fit neatly into a single denomination. I feel like sometimes that is the wrong thing to search for. <br></br><br></br>I belive I sit somewhere between Catholic, Orthodox, and Protestant traditions—respecting the depth of history, structure, and tradition they carry, while holding firmly to Scripture as the ultimate authority. People are forever sinners, including the people who make Church decisions.  I respect deeply the traditions of the Catholic Church and how these traditions can be turned into habits. <br></br><br></br>
I believe in 'Sola Scriptura'<br></br>
I believe truth is not subjective—it is revealed.<br></br>
I believe in one God, existing as Father, Son, and Holy Spirit.<br></br>
I believe that Jesus Christ is the only way to God—not one option among many, but the way.<br></br><br></br>

My foundation is Scripture. My focus is clarity.<br></br><br></br>

If I can help anyone in anyway walk through life's biggest questions without pressure, without confusion, and without relying on blind Church traditions or personal opinions, then I\'ve succeeded here.<br></br><br></br>

Not religion for the sake of religion.
Not arguments for the sake of winning.
Just a path toward truth.<br></br><br></br>
               I am simply one man, a sinner just like you, trying to spread understanding and bring clarity to what religions are and how the bible is the undisputed champion in life.
            </p>
            <p className="text-lg">
              I started this while trying to answer my own questions about faith, the Church and God in my own life. I realized quickly that I needed to share factual information (as I know it), and give it to others.
            </p>
          </div>
        </Modal>

      </div>
    </main>
  );
}
