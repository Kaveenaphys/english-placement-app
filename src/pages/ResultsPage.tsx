import Header from "../components/Header";

function ResultsPage() {
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

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">

        {/* Header */}

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


        {/* Overall Result */}

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


        {/* Section Scores */}

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


        {/* Recommendation */}

        <div className="border border-gray-200 bg-gray-50 p-8">

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

      </main>
    </>
  );
}

export default ResultsPage;