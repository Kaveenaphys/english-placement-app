import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import { grammarQuestions } from "../data/Questions";

function AssessmentPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
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
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

  const [answers, setAnswers] = useState<string[]>([]);

  const question = grammarQuestions[currentQuestion];

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

  if (currentQuestion < grammarQuestions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  }
}

  function calculateScore() {
    let score = 0;

    grammarQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    return score;
  }

function handleSubmit() {
  
  const score = calculateScore();
  console.log("SUBMIT FUNCTION CALLED");

  sessionStorage.setItem(
    "grammarScore",
    score.toString()
  );

  sessionStorage.setItem(
    "grammarTotal",
    grammarQuestions.length.toString()
  );

  console.log("Grammar Score:", score);
  console.log("Answers:", answers);

  navigate("/reading");
}

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">

        {/* Assessment Header */}
        <div className="mb-10">

          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-600 font-semibold">
                Question {currentQuestion + 1} of {grammarQuestions.length}
              </p>

              <h2 className="text-4xl font-bold text-black mt-2">
                Grammar
              </h2>
            </div>
            <p className="text-xl font-semibold text-red-600">
              {formatTime(timeLeft)}
            </p>
          </div>

          <p className="text-gray-600 mt-2">
            Choose the best answer for each question.
          </p>
          <div className="mt-4 inline-block bg-gray-100 px-4 py-2 font-semibold">
  Time remaining: {formatTime(timeLeft)}
</div>

        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mb-10">
          <div
            className="bg-red-600 h-2"
            style={{
              width: `${((currentQuestion + 1) / grammarQuestions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question */}
        <QuestionCard
          question={question.question}
          options={question.options}
          correctAnswer={question.correctAnswer}
          questionNumber={currentQuestion + 1}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Navigation */}
        <div className="flex justify-between mt-8">

          <button
            onClick={() =>
              setCurrentQuestion(currentQuestion - 1)
            }
            disabled={currentQuestion === 0}
            className="border border-gray-300 px-6 py-3 font-semibold
                       disabled:text-gray-300 disabled:cursor-not-allowed
                       hover:border-red-600"
          >
            Previous
          </button>

          <button
            onClick={
              currentQuestion === grammarQuestions.length - 1
                ? handleSubmit
                : handleNext
            }
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold"
          >
            {currentQuestion === grammarQuestions.length - 1
              ? "Submit Grammar"
              : "Next"}
          </button>

        </div>

      </main>
    </>
  );
}

export default AssessmentPage;