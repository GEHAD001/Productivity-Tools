"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Progress } from "@/components/ui/progress";
import { reorderArray } from "@/lib/reorderArray";
import { useState } from "react";

interface Card {
  _id: string;
  front: string;
  back: string;
}

interface QuizProps {
  cards: Card[];
}

interface QuizStats {
  correct: number;
  incorrect: number;
  total: number;
}

export default function Quiz({ cards }: QuizProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  const [canProceed, setCanProceed] = useState(false);
  const [stats, setStats] = useState<QuizStats>({
    correct: 0,
    incorrect: 0,
    total: cards.length,
  });

  // reset all state
  function startQuiz() {
    setShuffledCards(reorderArray(cards));
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setCanProceed(false);
    setStats({
      correct: 0,
      incorrect: 0,
      total: cards.length,
    });
    setIsOpen(true);
  }

  function handleAnswer(isCorrect: boolean) {
    // update stats
    setStats((prev) => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
    }));

    // enable to go next question
    setCanProceed(true);
  }

  // update & reset some states
  function nextQuestion() {
    setCurrentQuestionIndex((prev) => prev + 1);
    setShowAnswer(false);
    setCanProceed(false);
  }

  // Derived States
  const currentCard = shuffledCards[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / cards.length) * 100;
  const isLastQuestion = currentQuestionIndex === cards.length - 1;

  if (cards.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={startQuiz}
        >
          Start Quiz
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        {currentCard && !isLastQuestion && (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>Question {currentQuestionIndex + 1}</DialogTitle>
              <DialogDescription>
                Progress: {Math.round(progress)}%
              </DialogDescription>
            </DialogHeader>

            {/* <Progress value={progress} className="w-full" /> */}

            <div className="space-y-4">
              {/* [FRONT] */}
              <div className="p-4 border rounded-md">
                <p className="font-medium">Question:</p>
                <p>{currentCard.front}</p>
              </div>

              {/* [Answer & Button Show Answer] */}
              {showAnswer ? (
                <div className="p-4 border rounded-md">
                  <p className="font-medium">Answer:</p>
                  <p>{currentCard.back}</p>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowAnswer(true)}
                >
                  Show Answer
                </Button>
              )}

              {/* [Are You Answer Correct ?] */}
              {showAnswer && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleAnswer(true)}
                  >
                    Correct
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleAnswer(false)}
                  >
                    Incorrect
                  </Button>
                </div>
              )}

              {/* [NEXT BUTTON] */}
              <Button
                className="w-full"
                disabled={!canProceed}
                onClick={nextQuestion}
              >
                Next Question
              </Button>
            </div>
          </div>
        )}

        {/* [Simple Stats after Quiz & Close Button] */}
        {isLastQuestion && (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>Quiz Complete!</DialogTitle>
              <DialogDescription>Here are your results:</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <p className="font-medium">Statistics:</p>
                <p>Total Questions: {stats.total}</p>
                <p className="text-green-600">Correct: {stats.correct}</p>
                <p className="text-red-600">Incorrect: {stats.incorrect}</p>
                <p className="font-medium mt-2">
                  Success Rate:{" "}
                  {Math.round((stats.correct / stats.total) * 100)}%
                </p>
              </div>

              <Button className="w-full" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
