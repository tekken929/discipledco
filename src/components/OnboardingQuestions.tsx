import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How familiar are you with the Bible?",
    options: [
      "I've never read it",
      "I've read parts of it",
      "I read it regularly",
      "I study it deeply"
    ]
  },
  {
    id: 2,
    question: "What brings you here today?",
    options: [
      "Curiosity about Christianity",
      "Seeking spiritual guidance",
      "Wanting to understand the Bible better",
      "Looking for answers to life's questions"
    ]
  },
  {
    id: 3,
    question: "Do you currently practice a faith?",
    options: [
      "Yes, Christianity",
      "Yes, another religion",
      "Not currently",
      "Exploring different beliefs"
    ]
  },
  {
    id: 4,
    question: "What interests you most about learning Scripture?",
    options: [
      "Understanding God's nature",
      "Finding moral guidance",
      "Historical and cultural context",
      "Personal spiritual growth"
    ]
  },
  {
    id: 5,
    question: "How do you prefer to learn?",
    options: [
      "Reading structured overviews",
      "Exploring specific topics",
      "Following a chronological path",
      "Diving into stories and parables"
    ]
  }
];

interface OnboardingQuestionsProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingQuestions({ onComplete, onSkip }: OnboardingQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: selectedOption };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id] || null);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen theme-background flex items-center justify-center px-4 py-8 transition-colors">
      <div className="max-w-2xl w-full">
        <div className="theme-card rounded-2xl shadow-2xl p-8 md:p-12 transition-colors">
          <div className="flex justify-center mb-6">
            <img
              src="https://images.pexels.com/photos/6120234/pexels-photo-6120234.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
              alt="Discipled Co."
              className="w-24 h-24 rounded-2xl object-cover shadow-lg"
            />
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Welcome to Discipled Co.
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Help us personalize your journey
          </p>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="theme-primary-bg h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                    selectedOption === option
                      ? 'theme-primary-border theme-primary-bg-light shadow-md scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 theme-card hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedOption === option
                          ? 'theme-primary-border theme-primary-bg'
                          : 'border-gray-400 dark:border-gray-500'
                      }`}
                    >
                      {selectedOption === option && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedOption
                  ? 'theme-primary-button text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'Start Journey'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onSkip}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline transition-colors"
            >
              Skip these questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
