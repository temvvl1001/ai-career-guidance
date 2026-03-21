"use client";

import { useState } from "react";
import { SkillQuestion } from "@/lib/skill-questions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SkillTestProps {
  questions: SkillQuestion[];
  career: string;
  onComplete: (score: number, answers: { questionId: number; answer: number; isCorrect: boolean }[]) => void;
}

export default function SkillTest({ questions, career, onComplete }: SkillTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentIndex];
  const progress = ((currentIndex + (answers[question?.id] !== undefined ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      const answerArray = Object.entries(newAnswers).map(([id, selected]) => {
        const q = questions.find((qu) => qu.id === parseInt(id))!;
        const isCorrect = selected === q.correctAnswer;
        return {
          questionId: parseInt(id),
          answer: selected,
          isCorrect,
        };
      });
      const score = Math.round((answerArray.filter((a) => a.isCorrect).length / questions.length) * 100);
      onComplete(score, answerArray);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (showResult) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <p className="text-sm text-dark-400 mb-2">{career} Skill Test</p>
        <div className="flex justify-between text-sm text-dark-400 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 rounded-full bg-dark-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-emerald transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 animate-fade-in">
        <span className="text-xs text-accent-purple font-medium">{question.category}</span>
        <p className="text-lg text-dark-100 mt-2 mb-6">{question.question}</p>

        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full p-4 rounded-xl text-left transition-all text-dark-100 hover:text-primary border-2 border-slate-200 bg-slate-50 dark:border-dark-600 dark:bg-dark-700/50 hover:border-primary active:border-primary focus-visible:border-primary dark:hover:border-primary dark:active:border-primary dark:focus-visible:border-primary ${
                answers[question.id] === idx
                  ? "bg-primary/10 border-primary text-primary dark:border-primary dark:bg-primary/15"
                  : ""
              }`}
            >
              <span className="font-medium">{opt}</span>
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
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
