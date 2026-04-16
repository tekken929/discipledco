import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Tag, BookMarked, Lightbulb, Star, Lock } from 'lucide-react';
import { bibleStudies, BibleStudySeries, StudyLevel } from '../data/bibleStudiesData';
import { ReturnToHome } from '../components/ReturnToHome';

const tagColors: Record<string, string> = {
  'Foundations': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'The Gospel': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'Jesus': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  'Spiritual Practices': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'Theology': 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  'Life Together': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'Real Life': 'bg-slate-100 text-slate-800 dark:bg-slate-700/60 dark:text-slate-300',
  'Daily Life': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Prayer': 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  'Spiritual Life': 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  'Character': 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  'Teaching of Jesus': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'Mission': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
  'Doctrine': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  'Apologetics': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  'Scripture': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
};

const levelConfig: Record<StudyLevel, { label: string; description: string; color: string; activeClass: string; badgeClass: string }> = {
  beginner: {
    label: 'Beginner',
    description: 'New to the faith or exploring Christianity for the first time.',
    color: 'text-green-700 dark:text-green-400',
    activeClass: 'border-green-500 dark:border-green-400 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30',
    badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  },
  intermediate: {
    label: 'Intermediate',
    description: 'Growing in your faith and ready to go deeper into Scripture and doctrine.',
    color: 'text-blue-700 dark:text-blue-400',
    activeClass: 'border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  },
  advanced: {
    label: 'Advanced',
    description: 'Hard questions and deep theology for those ready to wrestle seriously.',
    color: 'text-gray-700 dark:text-gray-400',
    activeClass: 'border-gray-600 dark:border-gray-400 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50',
    badgeClass: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  },
};

function StudyDetail({ study }: { study: BibleStudySeries }) {
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const levelStudies = bibleStudies.filter(s => s.level === study.level);
  const currentIndex = levelStudies.findIndex(s => s.id === study.id);
  const prevStudy = currentIndex > 0 ? levelStudies[currentIndex - 1] : null;
  const nextStudy = currentIndex < levelStudies.length - 1 ? levelStudies[currentIndex + 1] : null;

  const toggleLesson = (index: number) => {
    setExpandedLessons(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allExpanded = study.lessons.length > 0 && expandedLessons.size === study.lessons.length;

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedLessons(new Set());
    } else {
      setExpandedLessons(new Set(study.lessons.map((_, i) => i)));
    }
  };

  const tagClass = tagColors[study.tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  const lvl = levelConfig[study.level];
  const isComingSoon = study.lessons.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/bible-studies')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        All Bible Studies
      </button>

      <div className="theme-card rounded-2xl p-8 md:p-10 shadow-xl mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center flex-shrink-0">
            <BookMarked className="w-7 h-7 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${tagClass}`}>
                <Tag className="w-3 h-3" />
                {study.tag}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${lvl.badgeClass}`}>
                {lvl.label}
              </span>
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Study {currentIndex + 1} of {levelStudies.length}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
              {study.title}
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">{study.subtitle}</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg border-t border-gray-200 dark:border-gray-700 pt-6">
          {study.description}
        </p>
        {!isComingSoon && (
          <div className="flex items-center gap-3 mt-4">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              {study.lessons.length} Lessons
            </span>
          </div>
        )}
      </div>

      {isComingSoon ? (
        <div className="theme-card rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 text-center mb-12">
          <Lock className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Content Coming Soon</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            This study is being written. Check back soon — or explore the other studies in the meantime.
          </p>
          <button
            onClick={() => navigate('/bible-studies')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 theme-primary-button rounded-xl font-semibold text-sm"
          >
            Browse All Studies
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleAll}
              className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          <div className="space-y-4 mb-12">
            {study.lessons.map((lesson, index) => {
              const isExpanded = expandedLessons.has(index);
              return (
                <div key={index} className="theme-card rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-all">
                  <button
                    onClick={() => toggleLesson(index)}
                    className="w-full text-left px-6 py-5 flex items-center gap-4 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 text-sm font-bold text-amber-700 dark:text-amber-300">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">{lesson.title}</h3>
                      {!isExpanded && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{lesson.preview}</p>
                      )}
                    </div>
                    {isExpanded
                      ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    }
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-5 space-y-5">
                      <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">{lesson.preview}</p>

                      <div className="space-y-3">
                        {lesson.content.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {lesson.keyVerse && (
                        <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-xl p-4">
                          <div className="flex items-start gap-2">
                            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 leading-relaxed">
                              {lesson.keyVerse}
                            </p>
                          </div>
                        </div>
                      )}

                      {lesson.reflectivePrompt && (
                        <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 rounded-r-xl p-4">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">Reflect</p>
                              <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">{lesson.reflectivePrompt}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {lesson.keyTakeaway && (
                        <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Key Takeaway</p>
                              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{lesson.keyTakeaway}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {prevStudy ? (
          <Link
            to={`/bible-studies/${prevStudy.id}`}
            className="group flex items-center gap-3 theme-card border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl px-5 py-4 transition-all hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-0.5 transition-transform flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Previous</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{prevStudy.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextStudy ? (
          <Link
            to={`/bible-studies/${nextStudy.id}`}
            className="group flex items-center gap-3 theme-card border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl px-5 py-4 transition-all hover:shadow-md sm:text-right"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Next Study</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{nextStudy.title}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </Link>
        ) : (
          <Link
            to="/courses"
            className="group flex items-center gap-3 theme-card border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 rounded-xl px-5 py-4 transition-all hover:shadow-md sm:text-right"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-green-500 dark:text-green-400 uppercase tracking-widest mb-0.5">Well done!</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Explore the Foundation Course</p>
            </div>
            <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </Link>
        )}
      </div>
    </div>
  );
}

const LEVEL_ORDER: StudyLevel[] = ['beginner', 'intermediate', 'advanced'];

function StudiesList() {
  const [activeLevel, setActiveLevel] = useState<StudyLevel>('beginner');
  const filtered = bibleStudies.filter(s => s.level === activeLevel);
  const lvl = levelConfig[activeLevel];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ReturnToHome />

      <div className="mb-10 text-center">
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-4">Learn & Grow</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Bible Studies
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          In-depth study series organized by experience level. Start where you are and go deeper at your own pace.
        </p>
      </div>

      <div className="flex rounded-2xl theme-card border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-8 shadow-sm">
        {LEVEL_ORDER.map((level) => {
          const config = levelConfig[level];
          const isActive = activeLevel === level;
          return (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`flex-1 px-4 py-4 text-center transition-all font-semibold text-sm border-b-2 ${
                isActive
                  ? config.activeClass
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      <div className="mb-6 px-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">{lvl.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((study) => {
          const tagClass = tagColors[study.tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
          const isComingSoon = study.lessons.length === 0;
          const levelStudies = bibleStudies.filter(s => s.level === study.level);
          const positionInLevel = levelStudies.findIndex(s => s.id === study.id) + 1;

          if (isComingSoon) {
            return (
              <div
                key={study.id}
                className="group theme-card border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 opacity-70"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full mb-1.5 ${tagClass}`}>
                      {study.tag}
                    </span>
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400 leading-snug">
                      {study.title}
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5">{study.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {study.description}
                </p>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Coming soon</span>
              </div>
            );
          }

          return (
            <Link
              key={study.id}
              to={`/bible-studies/${study.id}`}
              className="group theme-card border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 dark:group-hover:bg-amber-950/60 transition-colors">
                  <span className="text-base font-black text-amber-600 dark:text-amber-400">{positionInLevel}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full mb-1.5 ${tagClass}`}>
                    {study.tag}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {study.title}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{study.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                {study.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                  {study.lessons.length} lessons
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  Start study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 theme-card rounded-2xl border-2 p-8 text-center">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Want structured discipleship?</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Try the Foundation Course</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto leading-relaxed">
          The Foundation Course is a structured 8-module discipleship path that takes you from the basics of Scripture all the way through how to live out your faith.
        </p>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 theme-primary-button rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105"
        >
          Explore the Course
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function BibleStudies() {
  const { studyId } = useParams<{ studyId?: string }>();

  if (studyId) {
    const id = parseInt(studyId, 10);
    const study = bibleStudies.find(s => s.id === id);
    if (!study) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400">Study not found.</p>
          <Link to="/bible-studies" className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold">
            Back to Bible Studies
          </Link>
        </div>
      );
    }
    return <StudyDetail study={study} />;
  }

  return <StudiesList />;
}
