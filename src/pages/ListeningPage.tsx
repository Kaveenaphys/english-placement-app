import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ListeningQuestionCard from "../components/ListeningQuestionCard";

import { listeningQuestions } from "../data/Questions";

import listeningPart1 from "../assets/audio/listening-part1.mp3";
import listeningPart2 from "../assets/audio/listening-part2.mp3";


function ListeningPage() {
  const navigate = useNavigate();

  // -------------------------
  // Question state
  // -------------------------

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<string[]>([]);


  // -------------------------
  // Audio state
  // -------------------------

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [audioFinished, setAudioFinished] = useState(false);

  const [showPartComplete, setShowPartComplete] = useState(false);
 const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

useEffect(() => {
  if (timeLeft <= 0) {
    handleSubmit();
    return;
  }{/* =========================
    Navigation
========================= */}

{!showPartComplete && (

  <div className="flex justify-between mt-8">

    <button
      onClick={handlePrevious}
      disabled={currentQuestion === 0}
      className="border border-gray-300
                 px-6 py-3 font-semibold
                 disabled:text-gray-300
                 disabled:cursor-not-allowed
                 hover:border-red-600"
    >
      Previous
    </button>

    <button
      onClick={handleNext}
      disabled={
        currentQuestion ===
        listeningQuestions.length - 1
      }
      className="bg-red-600
                 hover:bg-red-700
                 disabled:bg-gray-300
                 disabled:cursor-not-allowed
                 text-white px-6 py-3
                 font-semibold"
    >
      Next
    </button>

  </div>

)}

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

function handleSubmit() {
  const score = listeningQuestions.reduce(
    (total, question, index) => {
      return total + (
        answers[index] === question.correctAnswer
          ? 1
          : 0
      );
    },
    0
  );

  sessionStorage.setItem(
    "listeningScore",
    score.toString()
  );

  sessionStorage.setItem(
    "listeningTotal",
    listeningQuestions.length.toString()
  );

  console.log("Listening Score:", score);
  console.log("Answers:", answers);

  navigate("/results");
}
   

  // -------------------------
  // Current question / part
  // -------------------------

  const question = listeningQuestions[currentQuestion];

  const currentPart = question.part;


  // -------------------------
  // Audio for each part
  // -------------------------

  const audioSources = {
    1: listeningPart1,
    2: listeningPart2, };

  const currentAudio =
    audioSources[currentPart as 1 | 2 ];


  // -------------------------
  // Selected answer
  // -------------------------

  const selectedAnswer =
    answers[currentQuestion] || "";


  // -------------------------
  // Reset audio when part changes
  // -------------------------

  useEffect(() => {

    setAudioFinished(false);

    setIsPlaying(false);

    setShowPartComplete(false);

    if (audioRef.current) {

      audioRef.current.pause();

      audioRef.current.currentTime = 0;

    }

  }, [currentPart]);

  // -------------------------
  // Select answer
  // -------------------------
function handleAnswerSelect(answer: string) {

    setAnswers((previousAnswers) => {

      const updatedAnswers = [...previousAnswers];

      updatedAnswers[currentQuestion] = answer;

      return updatedAnswers;

    });

  }


  // -------------------------
  // Play / Pause
  // -------------------------

  function handlePlayPause() {

    if (!audioRef.current) {
      return;
    }


    if (isPlaying) {

      audioRef.current.pause();

      setIsPlaying(false);

    } else {

      audioRef.current.play();

      setIsPlaying(true);

    }

  }


  // -------------------------
  // Audio finished
  // -------------------------

  function handleAudioEnded() {

    setIsPlaying(false);

    setAudioFinished(true);

    setShowPartComplete(true);

  }


  // -------------------------
  // Next question
  // -------------------------

  function handleNext() {

    if (!selectedAnswer) {

      alert("Please select an answer before continuing.");

      return;

    }


    if (
      currentQuestion <
      listeningQuestions.length - 1
    ) {

      setCurrentQuestion(currentQuestion + 1);

    }

  }


  // -------------------------
  // Previous question
  // -------------------------

  function handlePrevious() {

    if (currentQuestion > 0) {

      setCurrentQuestion(currentQuestion - 1);

    }

  }


  // -------------------------
  // Continue to next part
  // -------------------------

  function handleContinueToNextPart() {

    setCurrentQuestion(currentQuestion + 1);

  }


  // -------------------------
  // Page
  // -------------------------

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">


        {/* =========================
            Assessment Header
        ========================= */}

        <div className="mb-10">

          <p className="text-red-600 font-semibold">

            Listening — Part {currentPart}

          </p>


          <h2 className="text-4xl font-bold text-black mt-2">

            Listening Assessment

          </h2>


          <p className="text-gray-600 mt-2">

            Listen carefully and choose the best answer.

          </p>
          <div className="mt-4 inline-block bg-gray-100 px-4 py-2 font-semibold">
  Time remaining: {formatTime(timeLeft)}
</div>

        </div>


        {/* =========================
            Progress
        ========================= */}

        <div className="mb-8">

          <p className="text-gray-600 mb-2">

            Question {currentQuestion + 1} of{" "}
            {listeningQuestions.length}

          </p>


          <div className="w-full bg-gray-200 h-2">

            <div
              className="bg-red-600 h-2"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    listeningQuestions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>


        {/* =========================
            Audio
        ========================= */}

        <div className="border border-gray-200 p-6 mb-10 bg-gray-50">

          <h3 className="font-semibold text-lg mb-4">

            Listening Recording

          </h3>


          <audio
            ref={audioRef}
            src={currentAudio}
            onEnded={handleAudioEnded}
          />


          <button
            onClick={handlePlayPause}
            disabled={audioFinished}
            className="bg-red-600 hover:bg-red-700
                       disabled:bg-gray-300
                       text-white px-6 py-3
                       font-semibold"
          >

            {isPlaying
              ? "Pause"
              : "Play Listening"}

          </button>
<p className="text-sm text-gray-500 mt-3">
  Please note: pauses in the recording are intentional.
  Use this time to review your answers before the next part begins.
</p>

          {audioFinished && (

            <p className="text-gray-600 mt-3">

              This part of the listening recording
              has finished.

            </p>

          )}

        </div>


        {/* =========================
            Question
        ========================= */}

        <ListeningQuestionCard
          question={question.question}
          options={question.options}
          questionNumber={currentQuestion + 1}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />


        {/* =========================
            Part Complete
        ========================= */}

        {showPartComplete && currentPart < 2 && (

          <div className="border border-gray-200 p-8 mt-8 bg-gray-50 text-center">

            <h3 className="text-2xl font-bold text-black">

              Part {currentPart} Complete

            </h3>


            <p className="text-gray-600 mt-2 mb-6">

              Get ready for Part {currentPart + 1}.

            </p>


            <button
              onClick={handleContinueToNextPart}
              className="bg-red-600 hover:bg-red-700
                         text-white px-6 py-3
                         font-semibold"
            >

              Continue to Part {currentPart + 1} →

            </button>

          </div>

        )}


{/* =========================
    Navigation
========================= */}

{!showPartComplete && (

  <div className="flex justify-between mt-8">

    <button
      onClick={handlePrevious}
      disabled={currentQuestion === 0}
      className="border border-gray-300
                 px-6 py-3 font-semibold
                 disabled:text-gray-300
                 disabled:cursor-not-allowed
                 hover:border-red-600"
    >
      Previous
    </button>

    {currentQuestion < listeningQuestions.length - 1 ? (
      <button
        onClick={handleNext}
        disabled={!selectedAnswer}
        className="bg-red-600
                   hover:bg-red-700
                   disabled:bg-gray-300
                   disabled:cursor-not-allowed
                   text-white px-6 py-3
                   font-semibold"
      >
        Next
      </button>
    ) : (
      <button
        onClick={handleSubmit}
        className="bg-red-600
                   hover:bg-red-700
                   text-white px-6 py-3
                   font-semibold"
      >
        Continue to Results
      </button>
    )}

  </div>

)}
      </main>
    </>
  );
}


export default ListeningPage;