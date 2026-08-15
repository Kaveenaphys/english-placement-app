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

        <div className="border border-gray-200 p-8 text-center mb-8">

          <p className="text-gray-600">
            Overall Score
          </p>

          <p className="text-6xl font-bold text-red-600 mt-2">
            {percentage}%
          </p>

          <p className="text-2xl font-semibold text-black mt-4">
            {getLevel()}
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
            Recommendation
        ========================= */}

        <div className="border border-gray-200 bg-gray-50 p-8 mb-8">

          <h2 className="text-2xl font-bold text-black">
            Recommended Level
          </h2>

          <p className="text-gray-700 mt-3 leading-7">
            Based on your performance across Grammar,
            Reading, and Listening, your current estimated
            English level is:
          </p>

          <p className="text-xl font-bold text-red-600 mt-4">
            {getLevel()}
          </p>

        </div>


        {/* =========================
            Final Submission
        ========================= */}

        <div className="border border-gray-200 p-8 text-center">

          {!submitted ? (
            <>

              <h2 className="text-2xl font-bold text-black">
                Submit Your Assessment
              </h2>

              <p className="text-gray-600 mt-3 mb-6">
                Submit your results so that we can keep
                a record of your assessment.
              </p>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700
                           disabled:bg-gray-300
                           disabled:cursor-not-allowed
                           text-white px-8 py-3
                           font-semibold"
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Assessment"}
              </button>

            </>
          ) : (

            <>

              <h2 className="text-2xl font-bold text-black">
                Assessment Submitted
              </h2>

              <p className="text-gray-600 mt-3">
                Thank you. Your assessment has been
                successfully submitted.
              </p>

            </>

          )}

        </div>

      </main>
    </>
  );
}

export default ResultsPage;