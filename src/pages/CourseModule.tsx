import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import { courseModules } from '../data/courseData';
import { ReturnToHome } from '../components/ReturnToHome';

export function CourseModule() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  const moduleIndex = courseModules.findIndex(m => m.id === moduleId);
  const currentModule = courseModules[moduleIndex];
  const prevModule = moduleIndex > 0 ? courseModules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < courseModules.length - 1 ? courseModules[moduleIndex + 1] : null;

  if (!currentModule) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-6">Module not found.</p>
        <Link to="/courses" className="theme-accent font-semibold">Back to Course</Link>
      </div>
    );
  }

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedLessons(new Set(currentModule.lessons.map(l => l.id)));
  };

  const collapseAll = () => {
    setExpandedLessons(new Set());
  };

  const isModule2 = currentModule.number === 2;

  return (
    <>
      <ReturnToHome />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back to course */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Link>

        {/* Module header */}
        <header className="mb-14">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-3">
            Module {String(currentModule.number).padStart(2, '0')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {currentModule.title}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {currentModule.subtitle}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
            {currentModule.description}
          </p>
        </header>

        <div className="border-t border-gray-100 dark:border-gray-800 mb-10" />

        {/* Module 2 special 3-step visual */}
        {isModule2 && (
          <div className="mb-10 theme-card border-2 rounded-2xl p-8">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">The Method</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { step: '01', label: 'Observe', question: 'What does it say?' },
                { step: '02', label: 'Understand', question: 'What does it mean?' },
                { step: '03', label: 'Apply', question: 'What changes for me?' },
              ].map(({ step, label, question }) => (
                <div key={step} className="text-center p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <span className="text-3xl font-bold text-gray-200 dark:text-gray-700 block mb-2">{step}</span>
                  <p className="font-bold text-gray-900 dark:text-white text-base mb-1">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{question}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lesson controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            {currentModule.lessons.length} Lesson{currentModule.lessons.length !== 1 ? 's' : ''}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={expandAll}
              className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Expand all
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              onClick={collapseAll}
              className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-3 mb-16">
          {currentModule.lessons.map((lesson, index) => {
            const isExpanded = expandedLessons.has(lesson.id);
            return (
              <article
                key={lesson.id}
                className={`theme-card border-2 rounded-2xl overflow-hidden transition-all duration-200 ${
                  isExpanded ? 'shadow-lg' : 'hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className="w-full flex items-start gap-5 px-7 py-6 text-left group"
                  aria-expanded={isExpanded}
                >
                  <span className="text-xs font-bold text-gray-300 dark:text-gray-600 uppercase tracking-wider min-w-[2rem] mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {lesson.preview}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {isExpanded
                      ? <ChevronUp className="w-5 h-5 text-gray-400" />
                      : <ChevronDown className="w-5 h-5 text-gray-400" />
                    }
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-gray-700 px-7 py-7">
                    <div className="ml-9">
                      <p className="text-gray-700 dark:text-gray-300 leading-loose text-base mb-6">
                        {lesson.expanded}
                      </p>

                      {lesson.reflectivePrompt && (
                        <div className="rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-700 p-5 mb-5">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Reflect</span>
                          </div>
                          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed italic">
                            {lesson.reflectivePrompt}
                          </p>
                        </div>
                      )}

                      {lesson.keyTakeaway && (
                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Key Takeaway</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
                            {lesson.keyTakeaway}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch">
          {prevModule ? (
            <Link
              to={`/courses/module/${prevModule.id}`}
              className="flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group flex-1"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-0.5">Previous</p>
                <p className="font-bold text-sm">{prevModule.title}</p>
              </div>
            </Link>
          ) : (
            <Link
              to="/courses"
              className="flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group flex-1"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-0.5">Back to</p>
                <p className="font-bold text-sm">Course Overview</p>
              </div>
            </Link>
          )}

          {nextModule ? (
            <Link
              to={`/courses/module/${nextModule.id}`}
              className="flex items-center justify-between gap-3 px-6 py-4 rounded-xl theme-primary-button shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group flex-1"
            >
              <div className="text-right">
                <p className="text-xs text-white/70 font-medium uppercase tracking-wider mb-0.5">Next Module</p>
                <p className="font-bold text-sm text-white">{nextModule.title}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
            </Link>
          ) : (
            <Link
              to="/topics"
              className="flex items-center justify-between gap-3 px-6 py-4 rounded-xl theme-primary-button shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group flex-1"
            >
              <div className="text-right">
                <p className="text-xs text-white/70 font-medium uppercase tracking-wider mb-0.5">Next Step</p>
                <p className="font-bold text-sm text-white">Explore Topics</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
            </Link>
          )}
        </div>

      </main>
    </>
  );
}
