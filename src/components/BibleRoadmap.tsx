import { useState } from 'react';
import { Map, BookOpen, Eye, Brain, Lightbulb, ChevronDown, ChevronUp, CheckCircle2, ArrowRight } from 'lucide-react';

interface RoadmapPhase {
  phase: number;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  bgColor: string;
  books: { name: string; why: string }[];
}

const phases: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'Start with the Gospels',
    subtitle: 'Meet Jesus first — everything flows from Him',
    color: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    books: [
      { name: 'John', why: 'Written specifically so you believe Jesus is the Son of God. Clear, focused, and deeply personal.' },
      { name: 'Luke', why: 'The most detailed account of Jesus\' life. Written for those new to the faith with careful historical context.' },
      { name: 'Mark', why: 'Fast-paced, action-driven account. Shows Jesus as a servant who acts with authority.' },
      { name: 'Matthew', why: 'Connects Jesus to Old Testament prophecy. Best read after gaining some foundation.' },
    ],
  },
  {
    phase: 2,
    title: 'Understand the Early Church',
    subtitle: 'See what happens after the resurrection',
    color: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    books: [
      { name: 'Acts', why: 'The story of how the church began. Bridges the Gospels to Paul\'s letters and gives essential historical context.' },
    ],
  },
  {
    phase: 3,
    title: "Paul's Letters",
    subtitle: 'Understand salvation, grace, and how to live',
    color: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    books: [
      { name: 'Romans', why: 'The clearest explanation of the gospel — sin, grace, faith, and salvation — in the entire Bible.' },
      { name: 'Galatians', why: 'Directly addresses the freedom found in grace versus trying to earn God\'s approval through rules.' },
      { name: 'Ephesians', why: 'Explains who you are in Christ and how to live it out practically.' },
      { name: 'Philippians', why: 'A short, joyful letter about contentment and perseverance through hardship.' },
      { name: '1 Corinthians', why: 'Addresses real church problems — division, morality, spiritual gifts, resurrection.' },
    ],
  },
  {
    phase: 4,
    title: 'Wisdom & Worship',
    subtitle: 'Build a devotional life with the Psalms and Proverbs',
    color: 'text-rose-600 dark:text-rose-400',
    borderColor: 'border-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    books: [
      { name: 'Psalms', why: 'A prayer and worship guide. Every human emotion is here — grief, joy, doubt, praise. Read a few each day.' },
      { name: 'Proverbs', why: 'Practical wisdom for daily life — relationships, money, words, character. One chapter a day fits a month.' },
    ],
  },
  {
    phase: 5,
    title: 'The Old Testament Foundation',
    subtitle: 'Understand where it all began',
    color: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    books: [
      { name: 'Genesis', why: 'Creation, the fall, the first covenant. Essential background for everything else in Scripture.' },
      { name: 'Exodus', why: 'God rescues His people from slavery — a picture of salvation. The Ten Commandments and the Law are given here.' },
      { name: 'Isaiah', why: 'The most quoted Old Testament book in the New Testament. Rich with prophecies about Jesus.' },
      { name: 'Daniel', why: 'Faithfulness under pressure, prophetic visions, and trust in God\'s sovereignty.' },
    ],
  },
  {
    phase: 6,
    title: 'General Letters & Revelation',
    subtitle: 'Deepen your faith and look to eternity',
    color: 'text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-950/30',
    books: [
      { name: 'James', why: 'Faith without action is dead. A practical, direct guide to living out what you believe.' },
      { name: '1 Peter', why: 'Written to suffering believers. Encourages hope, holiness, and standing firm under pressure.' },
      { name: '1 John', why: 'Tests of genuine faith — love, obedience, assurance of salvation.' },
      { name: 'Hebrews', why: 'Shows how Jesus fulfills the entire Old Testament sacrificial system. Best read after some Old Testament.' },
      { name: 'Revelation', why: 'Read last. Requires context from Daniel, Isaiah, and the Gospels. A vision of the end and God\'s ultimate victory.' },
    ],
  },
];

const pillars = [
  {
    icon: Eye,
    title: 'Observation',
    question: 'What does it say?',
    description: 'Read slowly. Note who is speaking, to whom, in what situation. Look for repeated words, commands, and contrasts. Don\'t rush past words you don\'t understand — pause and sit with them.',
    color: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Brain,
    title: 'Context',
    question: 'What did it mean then?',
    description: 'Every passage was written to real people in real situations. Ask: Who wrote this? Who received it? What was happening historically? A verse about persecution means more when you know the author was in prison.',
    color: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
  },
  {
    icon: BookOpen,
    title: 'Interpretation',
    question: 'What does it mean?',
    description: 'Let Scripture interpret Scripture. If a passage is unclear, look at how it fits the whole Bible\'s message. The Bible never contradicts itself. Seek the plain meaning — don\'t read symbols where plain language is used, and don\'t take symbolism literally.',
    color: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
    bg: 'bg-amber-50 dark:bg-amber-950/20',
  },
  {
    icon: Lightbulb,
    title: 'Application',
    question: 'What does it mean for me?',
    description: 'The Bible was not written to inform only — it was written to transform. After every passage ask: Is there a sin to avoid? A promise to hold onto? A truth to believe? A command to obey? Write it down and act on one thing.',
    color: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200 dark:border-rose-800',
    bg: 'bg-rose-50 dark:bg-rose-950/20',
  },
];

export function BibleRoadmap() {
  const [open, setOpen] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  return (
    <div className="mb-10 theme-card rounded-2xl shadow-xl overflow-hidden print:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-8 py-6 group transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
            <Map className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bible Reading Roadmap</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">How to read, understand, and apply the Bible — step by step</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span className="text-sm font-medium hidden sm:block">{open ? 'Collapse' : 'Expand'}</span>
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          {/* Intro */}
          <div className="px-8 py-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
              The Bible is not a novel to be read cover to cover in order. It is a library — 66 books of different genres, written across 15 centuries. Reading it in the right order helps you build understanding progressively, so each book deepens what you already know rather than confusing you with context you haven't yet encountered.
            </p>
          </div>

          {/* Four Pillars */}
          <div className="px-8 py-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm font-bold">1</span>
              How to Approach Every Passage
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className={`rounded-xl border-2 ${pillar.border} ${pillar.bg} p-5`}>
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-5 h-5 ${pillar.color} flex-shrink-0`} />
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${pillar.color}`}>{pillar.title}</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{pillar.question}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reading Order */}
          <div className="px-8 py-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm font-bold">2</span>
              Recommended Reading Order
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 ml-9">Click each phase to see the books and why to read them in this order.</p>

            <div className="space-y-3">
              {phases.map((phase, index) => {
                const isExpanded = expandedPhase === phase.phase;
                return (
                  <div key={phase.phase} className={`rounded-xl border-2 ${phase.borderColor} overflow-hidden transition-all duration-200`}>
                    <button
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}
                      className={`w-full flex items-center justify-between px-5 py-4 ${isExpanded ? phase.bgColor : 'hover:' + phase.bgColor} transition-colors`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-full border-2 ${phase.borderColor} flex items-center justify-center text-sm font-bold ${phase.color} flex-shrink-0`}>
                          {phase.phase}
                        </span>
                        <div className="text-left">
                          <p className="font-bold text-gray-900 dark:text-white">{phase.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{phase.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
                          {phase.books.length} book{phase.books.length !== 1 ? 's' : ''}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className={`${phase.bgColor} border-t ${phase.borderColor} px-5 py-4`}>
                        <div className="space-y-3 ml-12">
                          {phase.books.map((book, i) => (
                            <div key={book.name} className="flex gap-3">
                              <div className="flex items-start gap-2 flex-shrink-0 mt-0.5">
                                <CheckCircle2 className={`w-4 h-4 ${phase.color} flex-shrink-0`} />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">{book.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{book.why}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {index < phases.length - 1 && (
                          <div className="flex items-center gap-2 mt-4 ml-12 text-gray-400 dark:text-gray-500">
                            <ArrowRight className="w-4 h-4" />
                            <span className="text-xs">Then move to Phase {phase.phase + 1}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tips */}
            <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Practical Tips for Every Reader</h4>
              <ul className="space-y-2.5">
                {[
                  'Read a little every day rather than large amounts infrequently. Consistency builds understanding.',
                  'Keep a journal. Write one observation, one truth, and one application after each reading.',
                  'Don\'t skip difficult passages — note them and return with more context as you grow.',
                  'Read with prayer. Ask God to give you understanding before you open the page.',
                  'The Old Testament points to Jesus. As you read, ask: "How does this connect to Christ?"',
                  'Use a reliable translation. ESV, CSB, and NIV are good starting points for modern readers.',
                ].map((tip) => (
                  <li key={tip} className="flex gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-amber-500 font-bold flex-shrink-0 mt-0.5">—</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
