import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

import Header from "../components/Header";

function AdminPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    netlifyIdentity.init({
      APIUrl:
        "https://peaceful-fenglisu-53952e.netlify.app/.netlify/identity",
    });

    const currentUser = netlifyIdentity.currentUser();

    if (currentUser) {
      setUser(currentUser);
    }

    setLoading(false);

    const handleLogin = (loggedInUser: any) => {
      setUser(loggedInUser);
      netlifyIdentity.close();
    };

    const handleLogout = () => {
      setUser(null);
      setResults([]);
    };

    netlifyIdentity.on("login", handleLogin);
    netlifyIdentity.on("logout", handleLogout);

    return () => {
      netlifyIdentity.off("login", handleLogin);
      netlifyIdentity.off("logout", handleLogout);
    };
  }, []);

  async function loadAssessmentData() {
    setLoadingResults(true);
    setError("");

    try {
      const response = await fetch(
        "/api/assessment-results"
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Unable to retrieve assessment results."
        );
        return;
      }

      setResults(Array.isArray(data) ? data : []);
    } catch {
      setError(
        "Unable to connect to the assessment results system."
      );
    } finally {
      setLoadingResults(false);
    }
  }

  async function handleLogout() {
    await netlifyIdentity.logout();
    navigate("/");
  }

  function getField(
    submission: any,
    fieldName: string
  ) {
    return submission?.data?.[fieldName] || "—";
  }
  function getScore(
  submission: any,
  section: "grammar" | "reading" | "listening"
) {
  const score = getField(
    submission,
    `${section}Score`
  );

  const total = getField(
    submission,
    `${section}Total`
  );

  if (score === "—" || total === "—") {
    return "—";
  }

  return `${score}/${total}`;
}

  function formatDate(dateString: string) {
    if (!dateString) {
      return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString();
  }
function exportCSV() {
  if (results.length === 0) {
    return;
  }

  const headers = [
    "Candidate",
    "Email",
    "Phone",
    "Overall",
    "Grammar",
    "Reading",
    "Listening",
    "Level",
    "Course",
    "Test",
    "Submitted",
  ];

  const rows = results.map((submission) => [
    getField(submission, "candidateName"),
    getField(submission, "candidateEmail"),
    getField(submission, "candidatePhone"),
    getField(submission, "percentage"),
    getScore(submission, "grammar"),
    getScore(submission, "reading"),
    getScore(submission, "listening"),
    getField(submission, "recommendedLevel"),
    getField(submission, "interestedCourse"),
    getField(submission, "targetTest"),
    formatDate(
      submission.submitted_at ||
        submission.created_at
    ),
  ]);

  const csv = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) =>
          `"${String(value).replace(/"/g, '""')}"`
        )
        .join(",")
    )
    .join("\n");

 const blob = new Blob(["\uFEFF" + csv], {
  type: "text/csv;charset=utf-8;",
});
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "assessment-results.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
  if (loading) {
    return (
      <>
        <Header />

        <main className="max-w-5xl mx-auto py-16 px-6">
          <p className="text-gray-600">
            Loading...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto py-12 px-6">

        {!user ? (
          <div className="max-w-xl mx-auto text-center py-16">

            <p className="text-red-600 font-semibold">
              Administration
            </p>

            <h1 className="text-4xl font-bold text-black mt-2">
              Assessment Dashboard
            </h1>

            <p className="text-gray-600 mt-4">
              This area is restricted to authorized
              administrators.
            </p>

            <button
              onClick={() =>
                netlifyIdentity.open("login")
              }
              className="mt-8 bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700"
            >
              Admin Login
            </button>

          </div>
        ) : (
          <>
            {/* Dashboard Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

              <div>

                <p className="text-red-600 font-semibold">
                  Administration
                </p>

                <h1 className="text-4xl font-bold text-black mt-2">
                  Assessment Dashboard
                </h1>

                <p className="text-gray-600 mt-2">
                  Logged in as {user.email}
                </p>

              </div>

              <button
                onClick={handleLogout}
                className="border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-50"
              >
                Log Out
              </button>

            </div>


            {/* Summary */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              <div className="border border-gray-200 p-6">

                <p className="text-gray-500">
                  Total Assessments
                </p>

                <p className="text-4xl font-bold mt-2">
                  {results.length}
                </p>

              </div>


              <div className="border border-gray-200 p-6">

                <p className="text-gray-500">
                  Latest Submission
                </p>

                <p className="text-xl font-bold mt-2">
                  {results.length > 0
                    ? formatDate(
                        results[0].submitted_at ||
                          results[0].created_at
                      )
                    : "—"}
                </p>

              </div>


              <div className="border border-gray-200 p-6">

                <p className="text-gray-500">
                  Dashboard Status
                </p>

                <p className="text-xl font-bold text-green-600 mt-2">
                  Secure
                </p>

              </div>

            </div>


            {/* Results Section */}

            <div className="border border-gray-200">

              <div className="p-6 border-b border-gray-200">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Assessment Results
                    </h2>

                    <p className="text-gray-600 mt-1">
                      Candidate assessment submissions
                    </p>

                  </div>

                  <div className="flex gap-3">

  <button
    onClick={loadAssessmentData}
    disabled={loadingResults}
    className="bg-red-600 text-white px-6 py-3 font-semibold hover:bg-red-700 disabled:opacity-50"
  >
    {loadingResults
      ? "Loading..."
      : "Refresh Results"}
  </button>

  <button
    onClick={exportCSV}
    disabled={results.length === 0}
    className="border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
  >
    Export CSV
  </button>

</div>
                </div>

              </div>


              {/* Error */}

              {error && (
                <div className="m-6 border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>
              )}


              {/* Empty state */}

              {!loadingResults &&
                !error &&
                results.length === 0 && (
                  <div className="p-10 text-center">

                    <p className="text-gray-600">
                      No assessment submissions loaded.
                    </p>

                    <button
                      onClick={loadAssessmentData}
                      className="mt-5 bg-red-600 text-white px-6 py-3 font-semibold"
                    >
                      Load Results
                    </button>

                  </div>
                )}


              {/* Results Table */}

              {results.length > 0 && (
                <div className="overflow-x-auto">

                  <table className="w-full text-left">

                    <thead>

                      <tr className="border-b border-gray-200 bg-gray-50">

                        <th className="px-6 py-4 font-semibold">
                          Candidate
                        </th>

                        <th className="px-6 py-4 font-semibold">
                          Email
                        </th>

                        <th className="px-6 py-4 font-semibold">
  Overall
</th>

<th className="px-6 py-4 font-semibold">
  Grammar
</th>

<th className="px-6 py-4 font-semibold">
  Reading
</th>

<th className="px-6 py-4 font-semibold">
  Listening
</th>

<th className="px-6 py-4 font-semibold">
  Level
</th>

                        <th className="px-6 py-4 font-semibold">
                          Course
                        </th>

                        <th className="px-6 py-4 font-semibold">
                          Test
                        </th>

                        <th className="px-6 py-4 font-semibold">
                          Submitted
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {results.map(
                        (submission, index) => (

                          <tr
                            key={
                              submission.id ||
                              index
                            }
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >

                            <td className="px-6 py-4 font-semibold">

                              {getField(
                                submission,
                                "candidateName"
                              )}

                            </td>


                            <td className="px-6 py-4">

                              {getField(
                                submission,
                                "candidateEmail"
                              )}

                            </td>


                           <td className="px-6 py-4 font-semibold">
  {getField(
    submission,
    "percentage"
  )}
</td>

<td className="px-6 py-4">
  {getScore(
    submission,
    "grammar"
  )}
</td>

<td className="px-6 py-4">
  {getScore(
    submission,
    "reading"
  )}
</td>

<td className="px-6 py-4">
  {getScore(
    submission,
    "listening"
  )}
</td>

<td className="px-6 py-4">
  {getField(
    submission,
    "recommendedLevel"
  )}
</td>


                            <td className="px-6 py-4">

                              {getField(
                                submission,
                                "interestedCourse"
                              )}

                            </td>


                            <td className="px-6 py-4">

                              {getField(
                                submission,
                                "targetTest"
                              )}

                            </td>


                            <td className="px-6 py-4">

                              {formatDate(
                                submission.submitted_at ||
                                  submission.created_at
                              )}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>
              )}

            </div>

          </>
        )}

      </main>
    </>
  );
}

export default AdminPage;