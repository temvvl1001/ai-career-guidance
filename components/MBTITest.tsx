"use client";

import { useState } from "react";
import { MBTI_QUESTIONS } from "@/lib/mbti-questions";
import { useUiStore } from "@/store/ui-store";
import { ChevronLeft } from "lucide-react";

const OPTIONS_EN = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const OPTIONS_MN = [
  { value: 1, label: "Огт санал нийлэхгүй" },
  { value: 2, label: "Санал нийлэхгүй" },
  { value: 3, label: "Төвийг сахисан" },
  { value: 4, label: "Санал нийлэх" },
  { value: 5, label: "Бүрэн санал нийлэх" },
];

interface MBTITestProps {
  onComplete: (answers: { questionId: number; value: number }[]) => void;
}

export default function MBTITest({ onComplete }: MBTITestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const { language } = useUiStore();
  const isMn = language === "mn";

  const OPTIONS = isMn ? OPTIONS_MN : OPTIONS_EN;
  const question = MBTI_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / MBTI_QUESTIONS.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < MBTI_QUESTIONS.length - 1) {
      setDirection("next");
      setCurrentIndex(currentIndex + 1);
    } else {
      const answerArray = Object.entries(newAnswers).map(([id, val]) => ({
        questionId: parseInt(id),
        value: val,
      }));
      onComplete(answerArray);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection("prev");
      setCurrentIndex(currentIndex - 1);
    }
  };

  const cardAnimation =
    direction === "next"
      ? "motion-safe:animate-question-next"
      : "motion-safe:animate-question-prev";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-dark-400 mb-2">
          <span>
            {isMn
              ? `${currentIndex + 1} / ${MBTI_QUESTIONS.length} асуулт`
              : `Question ${currentIndex + 1} of ${MBTI_QUESTIONS.length}`}
          </span>
          <span>
            {Math.round(progress)}% {isMn ? "дууссан" : "complete"}
          </span>
        </div>
        <div className="h-2 rounded-full bg-dark-700 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        key={question.id}
        className={`p-6 rounded-2xl bg-dark-800/50 border border-dark-600 transform-gpu will-change-transform ${cardAnimation}`}
      >
        <p className="text-lg text-dark-100 mb-6">
          {isMn ? question.questionMn ?? question.question : question.question}
        </p>

        <div className="space-y-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className={`w-full p-4 rounded-xl text-left transition-all text-dark-100 hover:text-primary border-2 border-slate-200 bg-slate-50 dark:border-dark-600 dark:bg-dark-700/50 hover:border-primary active:border-primary focus-visible:border-primary dark:hover:border-primary dark:active:border-primary dark:focus-visible:border-primary ${
                answers[question.id] === opt.value
                  ? "bg-primary/10 border-primary text-primary dark:border-primary dark:bg-primary/15"
                  : ""
              }`}
            >
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 text-dark-100 hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {isMn ? "Буцах" : "Back"}
          </button>
        </div>
      </div>
    </div>
  );
}