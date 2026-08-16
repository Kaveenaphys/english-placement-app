import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReadingQuestionCard from "../components/ReadingQuestionCard";
import Header from "../components/Header";
import {
  readingPassage,
  readingQuestions,
} from "../data/Questions";

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function ReadingPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<string[]>([]);

  function handleSubmit() {
    const score = readingQuestions.reduce((total, question, index) => {
      return total + (
        answers[index] === question.correctAnswer ? 1 : 0
      );
    }, 0);

    sessionStorage.setItem(
      "readingScore",
      score.toString()
    );

    sessionStorage.setItem(
      "readingTotal",
      readingQuestions.length.toString()
    );

    console.log("Reading Score:", score);
    console.log("Answers:", answers);

    navigate("/listening");
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const question = readingQuestions[currentQuestion];

  const selectedAnswer = answers[currentQuestion] || "";

  function handleAnswerSelect(answer: string) {
    setAnswers((previousAnswers) => {
      const updatedAnswers = [...previousAnswers];

      updatedAnswers[currentQuestion] = answer;

      return updatedAnswers;
    });
  }

  function handleNext() {
    if (!selectedAnswer) {
      alert("Please select an answer before continuing.");
      return;
    }

    if (currentQuestion < readingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto py-12 px-6">

        <div className="mb-10">

          <p className="text-red-600 font-semibold">
            Reading
          </p>

          <h2 className="text-4xl font-bold text-black mt-2">
            Reading Comprehension
          </h2>

          <p className="text-gray-600 mt-2">
            Read the passage carefully and answer the questions.
          </p>

          <div className="mt-4 inline-block bg-gray-100 px-4 py-2 font-semibold">
            Time remaining: {formatTime(timeLeft)}
          </div>

        </div>


        {/* Reading Passage */}

        <div className="border border-gray-200 p-8 mb-10 bg-gray-50">

          <h3 className="text-xl font-bold mb-4">
            Read the following passage
          </h3>

          <div className="text-gray-700 leading-8 whitespace-pre-line">
            {readingPassage}
          </div>

        </div>


        {/* Progress */}

        <div className="mb-8">

          <p className="text-gray-600 mb-2">
            Question {currentQuestion + 1} of{" "}
            {readingQuestions.length}
          </p>

          <div className="w-full bg-gray-200 h-2">

            <div
              className="bg-red-600 h-2"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    readingQuestions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>


        {/* Question */}

        <ReadingQuestionCard
          question={question.question}
          options={question.options}
          questionNumber={currentQuestion + 1}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

{/* Navigation */}
<div className="flex justify-between mt-8">

  <button
    onClick={handlePrevious}
    disabled={currentQuestion === 0}
    className="border border-gray-300 px-6 py-3 font-semibold
               disabled:text-gray-300
               disabled:cursor-not-allowed
               hover:border-red-600"
  >
    Previous
  </button>

  {currentQuestion < readingQuestions.length - 1 ? (
    <button
      onClick={handleNext}
      disabled={!selectedAnswer}
      className="bg-red-600 hover:bg-red-700
                 disabled:bg-gray-300
                 disabled:cursor-not-allowed
                 text-white px-6 py-3 font-semibold"
    >
      Next
    </button>
  ) : (
    <button
      onClick={handleSubmit}
      className="bg-red-600 hover:bg-red-700
                 text-white px-6 py-3 font-semibold"
    >
      Continue to Listening
    </button>
  )}

</div>


      
      </main>
    </>
  );
}

export default ReadingPage;