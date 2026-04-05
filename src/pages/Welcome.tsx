import { BookOpen, Target, Music, Book, Users, MessageCircle, Church, HelpCircle, Calendar, Mic, BookText, UserCheck, Radio, Lightbulb, Sparkles, Cross } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../components/Modal';

export function Welcome() {
  const [showWhoMadeThis, setShowWhoMadeThis] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 text-center transition-colors">
          <div className="flex justify-center mb-6">
            <img
              src="/images/christian-cross-free-phone-wallpapers-v0-ue93of6bivsc1.png"
              alt="Discipled Co."
              className="w-32 h-32 rounded-2xl object-cover shadow-lg"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
           The Disciple Co.
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Genesis 6:5 (NIV), "The Lord saw how great the wickedness of the human race had become on the earth, and that every inclination of the thoughts of the human heart was only evil all the time."
          </p>
        </div>

        <div className="theme-card rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="theme-primary-button p-3 rounded-xl">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Start Here:</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">Choose what you would like to learn more about.</p>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <button
                  onClick={() => setShowWhoMadeThis(true)}
                  className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-gray-200 dark:border-gray-700 w-full justify-center h-10"
                >
                  <HelpCircle className="w-4 h-4" />
                  Who Made This?
                </button>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Learn about the purpose and beliefs behind this website
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/bible"
                  className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-blue-200 dark:border-blue-700 w-full justify-center h-10"
                >
                  <BookOpen className="w-4 h-4" />
                  Bible Overview
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Explore all 66 books of the Bible with chapter summaries and timelines
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/topics"
                  className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-purple-200 dark:border-purple-700 w-full justify-center h-10"
                >
                  <MessageCircle className="w-4 h-4" />
                  Everyday Topics
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Discover topics covering marriage, relationships, sin, salvation, and more
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/religions"
                  className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-rose-200 dark:border-rose-700 w-full justify-center h-10"
                >
                  <Church className="w-4 h-4" />
                  What is Religion
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Learn how Christianity and other religions developed and how different churches emerged
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/bible-versions"
                  className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-green-200 dark:border-green-700 w-full justify-center h-10"
                >
                  <Book className="w-4 h-4" />
                  Versions of the Bible
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Understand the differences between translations and versions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/stories"
                  className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-orange-200 dark:border-orange-700 w-full justify-center h-10"
                >
                  <BookOpen className="w-4 h-4" />
                  Popular Stories
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Read Bible stories with context and meaning
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/music"
                  className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-pink-200 dark:border-pink-700 w-full justify-center h-10"
                >
                  <Music className="w-4 h-4" />
                  Music Jukebox
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Enjoy music and songs while you explore. All songs are originals written by myself
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/christian-holidays"
                  className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-teal-200 dark:border-teal-700 w-full justify-center h-10"
                >
                  <Calendar className="w-4 h-4" />
                  Holiday Origins
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Discover the true origins and meanings of Easter, Christmas, and other holidays
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/preaching"
                  className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-amber-200 dark:border-amber-700 w-full justify-center h-10"
                >
                  <Mic className="w-4 h-4" />
                  Wisdom
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Listen to powerful preaching and teachings from trusted pastors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-cyan-200 dark:border-cyan-700 w-full justify-center h-10"
                >
                  <BookText className="w-4 h-4" />
                  Books
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Read Christian books and resources to deepen your faith
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/church-mentors"
                  className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-indigo-200 dark:border-indigo-700 w-full justify-center h-10"
                >
                  <UserCheck className="w-4 h-4" />
                  Mentors
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Connect with experienced mentors for spiritual guidance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/podcasts"
                  className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-violet-200 dark:border-violet-700 w-full justify-center h-10"
                >
                  <Radio className="w-4 h-4" />
                  Podcasts
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Listen to podcasts on faith, theology, and Christian living
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/guidance"
                  className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-emerald-200 dark:border-emerald-700 w-full justify-center h-10"
                >
                  <Lightbulb className="w-4 h-4" />
                  Guidance
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Get biblical guidance and answers to life's important questions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/easter"
                  className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-yellow-200 dark:border-yellow-700 w-full justify-center h-10"
                >
                  <Sparkles className="w-4 h-4" />
                  Easter
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Explore the biblical story and significance of Easter
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
                <Link
                  to="/resurrection"
                  className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all border-2 border-red-200 dark:border-red-700 w-full justify-center h-10"
                >
                  <Cross className="w-4 h-4" />
                  Resurrection
                </Link>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Understand the resurrection of Jesus Christ and its impact on faith
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Modal
        isOpen={showWhoMadeThis}
        onClose={() => setShowWhoMadeThis(false)}
        title="Who made this page?"
      >
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <div className="p-4 theme-card border-2 rounded-lg">
            <p className="text-lg">
              <span className="font-bold text-gray-900 dark:text-white">This isn't necessarily about religion—it's about truth.</span>
            </p>
          </div>

          <p className="text-base">
            Sometimes we don't fit neatly into a single denomination. Sometimes labels are too much. I feel like sometimes that is the wrong thing to search for, especially if you are just beginning.
          </p>

          <p className="text-base">
            I fall somewhere between Catholic, Orthodox, and Protestant traditions—respecting the depth of history, structure, and tradition they carry, while holding firmly to Scripture as the ultimate authority. People are forever sinners, including the people who make Church decisions. I respect deeply the traditions of the Catholic Church and how these traditions can be turned into habits. I also realize that it is hard to fully support something, if part of it is broken or mis-represented.
          </p>

          <div className="p-4 theme-card border-2 rounded-lg space-y-2">
            <p className="text-base"><span className="font-bold text-gray-900 dark:text-white">I believe in 'Sola Scriptura'</span></p>
            <p className="text-base"><span className="font-bold text-gray-900 dark:text-white">I believe truth is not subjective—it is revealed.</span></p>
            <p className="text-base"><span className="font-bold text-gray-900 dark:text-white">I believe in one God, existing as Father, Son, and Holy Spirit.</span></p>
            <p className="text-base"><span className="font-bold text-gray-900 dark:text-white">I believe that Jesus Christ is the only way to God—not one option among many, but the way.</span></p>
          </div>

          <p className="text-base">
            <span className="font-bold text-gray-900 dark:text-white">My foundation is the Scripture.</span>
          </p>

          <p className="text-base">
            If we can help anyone walk through life's biggest questions without pressure, without confusion, and without relying on blind Church traditions or personal opinions, then we have succeeded.
          </p>

          <div className="p-4 theme-card border-2 rounded-lg space-y-1">
            <p className="text-base font-semibold text-gray-900 dark:text-white">Not religion for the sake of religion.</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">Not arguments for the sake of winning.</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">Just a path toward truth.</p>
          </div>

          <p className="text-base">
            I am simply a man, a sinner just like you, trying to spread understanding and bring clarity to what religions are and how the bible is the undisputed champion in life.
          </p>

          <p className="text-base italic">
            I started this website while trying to answer my own questions about faith, the Church and God in my own life. I realized quickly that I needed to share factual information (as I know it), and give it to others. My goal is to represent what being a Christian means in full truth as I know it from the teachings of the Holy Bible.
          </p>
        </div>
      </Modal>
    </main>
  );
}
