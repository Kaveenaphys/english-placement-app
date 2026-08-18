import { useState } from "react";
import Header from "../components/Header";

function ResultsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // -------------------------
  // Scores
  // -------------------------

  const grammarScore = Number(
    sessionStorage.getItem("grammarScore") || 0
  );

  const grammarTotal = Number(
    sessionStorage.getItem("grammarTotal") || 0
  );

  const readingScore = Number(
    sessionStorage.getItem("readingScore") || 0
  );

  const readingTotal = Number(
    sessionStorage.getItem("readingTotal") || 0
  );

  const listeningScore = Number(
    sessionStorage.getItem("listeningScore") || 0
  );

  const listeningTotal = Number(
    sessionStorage.getItem("listeningTotal") || 0
  );


  // -------------------------
  // Candidate information
  // -------------------------

  const candidateName =
    sessionStorage.getItem("candidateName") || "";

  const candidateEmail =
    sessionStorage.getItem("candidateEmail") || "";

  const candidatePhone =
    sessionStorage.getItem("candidatePhone") || "";

  const candidateCountryCode =
    sessionStorage.getItem("candidateCountryCode") || "";

  const previousEnglishTest =
    sessionStorage.getItem("previousEnglishTest") || "";

  const interestedCourse =
    sessionStorage.getItem("interestedCourse") || "";

  const targetTest =
    sessionStorage.getItem("targetTest") || "";


  // -------------------------
  // Overall score
  // -------------------------

  const totalScore =
    grammarScore +
    readingScore +
    listeningScore;

  const totalQuestions =
    grammarTotal +
    readingTotal +
    listeningTotal;

  const percentage =
    totalQuestions > 0
      ? Math.round((totalScore / totalQuestions) * 100)
      : 0;


  // -------------------------
  // Level
  // -------------------------

  function getLevel() {
    if (percentage >= 90) {
      return "C1–C2 — Advanced";
    }

    if (percentage >= 75) {
      return "B2 — Upper-Intermediate";
    }

    if (percentage >= 60) {
      return "B1 — Intermediate";
    }

    if (percentage >= 40) {
      return "A2 — Pre-Intermediate";
    }

    return "A1 — Beginner";
  }
  const hasSpecificTest =
  targetTest &&
  targetTest.toLowerCase() !== "none" &&
  targetTest.toLowerCase() !== "not-sure";
 function getRecommendation() {
  const grammarPercent =
    grammarTotal > 0
      ? (grammarScore / grammarTotal) * 100
      : 0;

  const readingPercent =
    readingTotal > 0
      ? (readingScore / readingTotal) * 100
      : 0;

  const listeningPercent =
    listeningTotal > 0
      ? (listeningScore / listeningTotal) * 100
      : 0;

  // Find the weakest skill
  const skillScores = [
    { name: "Grammar", score: grammarPercent },
    { name: "Reading", score: readingPercent },
    { name: "Listening", score: listeningPercent },
  ];

  const weakestSkill = skillScores.reduce((weakest, current) =>
    current.score < weakest.score ? current : weakest
  );

  // General English
  if (percentage < 60) {
    return {
      course: "General English",
      test: "Not yet recommended",
      title: "Build Your English Foundation",
      message:
        "Your assessment shows that you would benefit from strengthening your general English skills before beginning intensive exam preparation.",
      focus: `We recommend focusing especially on ${weakestSkill.name}.`,
    };
  }

  // Intermediate preparation
  if (percentage < 75) {
    return {
      course: "General English — Intermediate / Upper-Intermediate",
      test: "Exam preparation after further English development",
      title: "Strengthen Your English Before Exam Preparation",
      message:
        "You have a developing intermediate-to-upper-intermediate level of English. A stronger general English foundation will help you perform more confidently in an English-language examination.",
      focus: `We recommend focusing especially on ${weakestSkill.name}.`,
    };
  }

  // Strong enough for exam preparation
  if (percentage < 85) {
    return {
      course: hasSpecificTest
        ? `${targetTest} Preparation — Foundation`
        : "English Exam Preparation",

      test: hasSpecificTest
        ? `${targetTest} Preparation`
        : "IELTS / PTE / OET Preparation",

      title: "Ready to Begin Exam Preparation",
      message:
        "Your English level is suitable for beginning structured examination preparation. Building exam-specific skills can now help you improve your performance.",
      focus: `We recommend focusing especially on ${weakestSkill.name}.`,
    };
  }

  // High readiness
  return {
    course: hasSpecificTest
      ? `${targetTest} Preparation`
      : "English Exam Preparation",

    test: hasSpecificTest
      ? `${targetTest} Preparation`
      : "IELTS / PTE / OET Preparation",

    title: "Strong Foundation for Exam Preparation",
    message:
      "Your assessment indicates a strong level of English and good readiness for examination-focused preparation.",

    focus: `We recommend focusing especially on ${weakestSkill.name}.`,
  };
}
const recommendation = getRecommendation();


  // -------------------------
  // Submit results
  // -------------------------

  async function handleSubmit() {
    if (submitting || submitted) {
      return;
    }

    setSubmitting(true);

    const formData = new URLSearchParams();

    formData.append(
      "form-name",
      "assessment-results"
    );

    formData.append(
      "candidateName",
      candidateName
    );

    formData.append(
      "candidateEmail",
      candidateEmail
    );

    formData.append(
      "candidatePhone",
      candidatePhone
    );

    formData.append(
      "candidateCountryCode",
      candidateCountryCode
    );

    formData.append(
      "previousEnglishTest",
      previousEnglishTest
    );

    formData.append(
      "interestedCourse",
      interestedCourse
    );

    formData.append(
      "targetTest",
      targetTest
    );

    formData.append(
      "grammarScore",
      `${grammarScore}/${grammarTotal}`
    );

    formData.append(
      "readingScore",
      `${readingScore}/${readingTotal}`
    );

    formData.append(
      "listeningScore",
      `${listeningScore}/${listeningTotal}`
    );

    formData.append(
      "totalScore",
      `${totalScore}/${totalQuestions}`
    );

    formData.append(
      "percentage",
      `${percentage}%`
    );

    formData.append(
      "recommendedLevel",
      getLevel()
    );
formData.append(
  "recommendedCourse",
  recommendation.course
);

formData.append(
  "recommendedTest",
  recommendation.test
);

formData.append(
  "recommendationTitle",
  recommendation.title
);

formData.append(
  "recommendationMessage",
  recommendation.message
);

formData.append(
  "recommendationFocus",
  recommendation.focus
);
    formData.append(
      "submittedAt",
      new Date().toISOString()
    );

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);

    } catch (error) {

      console.error(
        "Assessment submission error:",
        error
      );

      alert(
        "We couldn't submit your assessment. Please try again."
      );

    } finally {

      setSubmitting(false);

    }
  }


  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">

        {/* =========================
            Header
        ========================= */}

        <div className="text-center mb-12">

          <p className="text-red-600 font-semibold">
            Assessment Complete
          </p>

          <h1 className="text-4xl font-bold text-black mt-2">
            Your English Assessment Results
          </h1>

          <p className="text-gray-600 mt-3">
            Here is an overview of your performance.
          </p>

        </div>


        {/* =========================
            Overall Result
        ========================= */}

        {/* =========================
    Results Summary
========================= */}

<div className="border border-gray-200 p-8 text-center mb-8">

  <h2 className="text-2xl font-bold text-black">
    Your Results
  </h2>

  <p className="text-gray-600 mt-3">
    Your percentage scores for each section are shown below.
  </p>

</div>


        {/* =========================
            Candidate Information
        ========================= */}

        <div className="border border-gray-200 p-8 mb-8">

          <h2 className="text-2xl font-bold text-black mb-6">
            Candidate Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="font-semibold mt-1">
                {candidateName || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-semibold mt-1">
                {candidateEmail || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="font-semibold mt-1">
                {candidateCountryCode}{" "}
                {candidatePhone || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Previous English Test
              </p>

              <p className="font-semibold mt-1">
                {previousEnglishTest || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Interested Course
              </p>

              <p className="font-semibold mt-1">
                {interestedCourse || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Target Test
              </p>

              <p className="font-semibold mt-1">
                {targetTest || "Not provided"}
              </p>
            </div>

          </div>

        </div>


        {/* =========================
            Section Scores
        ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Grammar */}

          <div className="border border-gray-200 p-6">

            <p className="text-red-600 font-semibold">
              Grammar
            </p>

            <p className="text-3xl font-bold mt-2">
              {grammarScore}/{grammarTotal}
            </p>

            <p className="text-gray-500 mt-2">
              {grammarTotal > 0
                ? Math.round(
                    (grammarScore / grammarTotal) * 100
                  )
                : 0}
              %
            </p>

          </div>


          {/* Reading */}

          <div className="border border-gray-200 p-6">

            <p className="text-red-600 font-semibold">
              Reading
            </p>

            <p className="text-3xl font-bold mt-2">
              {readingScore}/{readingTotal}
            </p>

            <p className="text-gray-500 mt-2">
              {readingTotal > 0
                ? Math.round(
                    (readingScore / readingTotal) * 100
                  )
                : 0}
              %
            </p>

          </div>


          {/* Listening */}

          <div className="border border-gray-200 p-6">

            <p className="text-red-600 font-semibold">
              Listening
            </p>

            <p className="text-3xl font-bold mt-2">
              {listeningScore}/{listeningTotal}
            </p>

            <p className="text-gray-500 mt-2">
              {listeningTotal > 0
                ? Math.round(
                    (listeningScore / listeningTotal) * 100
                  )
                : 0}
              %
            </p>

          </div>

        </div>



        {/* =========================
            Submit Button
        ========================= */}

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={submitting || submitted}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded transition"
          >
            {submitted ? "✓ Submitted" : submitting ? "Submitting..." : "Submit Results"}
          </button>
        </div>

      </main>
    </>
  );
}

export default ResultsPage;