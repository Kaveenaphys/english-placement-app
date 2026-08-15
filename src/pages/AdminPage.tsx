import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";
import Header from "../components/Header";

function AdminPage() {
  const navigate = useNavigate();

const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
    };

    netlifyIdentity.on("login", handleLogin);
    netlifyIdentity.on("logout", handleLogout);

    return () => {
      netlifyIdentity.off("login", handleLogin);
      netlifyIdentity.off("logout", handleLogout);
    };
  }, []);

  async function testAdminAccess() {
    setMessage("Checking administrator access...");

    try {
      const response = await fetch(
        "/api/assessment-results"
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error || "Administrator access denied."
        );
        return;
      }

      setMessage(
        `Access granted. ${data.length} assessment submission(s) found.`
      );
    } catch {
      setMessage(
        "Unable to connect to the assessment results system."
      );
    }
  }

  function handleLogin() {
    netlifyIdentity.open("login");
  }

  async function handleLogout() {
    await netlifyIdentity.logout();
    navigate("/");
  }

  if (loading) {
    return (
      <>
        <Header />

        <main className="max-w-4xl mx-auto py-16 px-6">
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

      <main className="max-w-5xl mx-auto py-16 px-6">

        {!user ? (
          <div className="max-w-xl mx-auto text-center">

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
              onClick={handleLogin}
              className="mt-8 bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700"
            >
              Admin Login
            </button>

          </div>
        ) : (
          <div>

            <div className="flex justify-between items-center mb-10">

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
                className="border border-gray-300 px-5 py-3 font-semibold"
              >
                Log Out
              </button>

            </div>

            <div className="border border-gray-200 p-8">

              <h2 className="text-2xl font-bold">
                Assessment Results
              </h2>

              <p className="text-gray-600 mt-2">
                Your administrator account is ready.
              </p>

              <button
                onClick={testAdminAccess}
                className="mt-6 bg-red-600 text-white px-6 py-3 font-semibold"
              >
                Load Assessment Data
              </button>

              {message && (
                <p className="mt-6 text-gray-700">
                  {message}
                </p>
              )}

            </div>

          </div>
        )}

      </main>
    </>
  );
}

export default AdminPage;