import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";

const countries = [
  { code: "+974", name: "Qatar" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+973", name: "Bahrain" },
  { code: "+965", name: "Kuwait" },
  { code: "+968", name: "Oman" },

  { code: "+91", name: "India" },
  { code: "+94", name: "Sri Lanka" },
  { code: "+92", name: "Pakistan" },
  { code: "+880", name: "Bangladesh" },
  { code: "+977", name: "Nepal" },
  { code: "+63", name: "Philippines" },
  { code: "+62", name: "Indonesia" },
  { code: "+60", name: "Malaysia" },

  { code: "+20", name: "Egypt" },
  { code: "+249", name: "Sudan" },
  { code: "+27", name: "South Africa" },
  { code: "+234", name: "Nigeria" },
  { code: "+254", name: "Kenya" },

  { code: "+44", name: "United Kingdom" },
  { code: "+353", name: "Ireland" },
  { code: "+33", name: "France" },
  { code: "+49", name: "Germany" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
  { code: "+351", name: "Portugal" },
  { code: "+31", name: "Netherlands" },

  { code: "+1", name: "United States" },
  { code: "+1", name: "Canada" },
  { code: "+61", name: "Australia" },
  { code: "+64", name: "New Zealand" },

  { code: "+81", name: "Japan" },
  { code: "+82", name: "South Korea" },
  { code: "+86", name: "China" },
  { code: "+886", name: "Taiwan" },

  { code: "+7", name: "Russia" },
  { code: "+380", name: "Ukraine" },
  { code: "+90", name: "Türkiye" },
];
function CandidatePage() {
  const [countryCode, setCountryCode] = useState("+974");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [previousTest, setPreviousTest] = useState("");
  const [course, setCourse] = useState("");
  const [test, setTest] = useState("");

  const navigate = useNavigate();

 function handleContinue() {
  if (
    !name ||
    !email ||
    !phone ||
    !previousTest ||
    !course ||
    !test
  ) {
    alert("Please complete all fields before continuing.");
    return;
  }

  sessionStorage.setItem("candidateName", name);
  sessionStorage.setItem("candidateEmail", email);
  sessionStorage.setItem("candidatePhone", phone);
  sessionStorage.setItem("candidateCountryCode", countryCode);
  sessionStorage.setItem("previousEnglishTest", previousTest);
  sessionStorage.setItem("interestedCourse", course);
  sessionStorage.setItem("targetTest", test);

  navigate("/instructions");
}

  return (
    <>
      <Header />

      <main className="max-w-2xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-black">
          Candidate Information
        </h2>

        <p className="text-gray-600 mt-3 mb-10">
          Please provide some basic information before starting your
          assessment.
        </p>

        <div className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-2">
              Phone Number
            </label>

            <div className="flex gap-3">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border border-gray-300 px-4 py-3"
              >
                {countries.map((country) => (
                  <option
                    key={country.code}
                    value={country.code}
                  >
                    {country.code} {country.name}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 border border-gray-300 px-4 py-3"
              />
            </div>
          </div>

          {/* Previous English Test */}
          <div>
            <label className="block font-semibold mb-2">
              Have you taken an English test before?
            </label>

            <select
              value={previousTest}
              onChange={(e) => setPreviousTest(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block font-semibold mb-2">
              Which English course are you interested in?
            </label>

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3"
            >
              <option value="">Select an option</option>

              <option value="spoken-beginner">
                Spoken English — Beginner
              </option>

              <option value="spoken-intermediate">
                Spoken English — Intermediate
              </option>

              <option value="not-sure">
                Not sure
              </option>

              <option value="test-only">
                No course needed (Only Test)
              </option>
            </select>
          </div>

          {/* Test */}
          <div>
            <label className="block font-semibold mb-2">
              Which test are you looking to take?
            </label>

            <select
              value={test}
              onChange={(e) => setTest(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3"
            >
              <option value="">Select an option</option>

              <option value="ielts">IELTS</option>

              <option value="pte">PTE</option>

              <option value="oet">OET</option>

              <option value="not-sure">
                Not sure
              </option>

              <option value="course-only">
                No test needed (Only Course)
              </option>
            </select>
          </div>

          {/* Continue */}
          <div className="pt-4">
            <Button
              text="Continue"
              variant="primary"
              onClick={handleContinue}
            />
          </div>

        </div>
      </main>
    </>
  );
}

export default CandidatePage;