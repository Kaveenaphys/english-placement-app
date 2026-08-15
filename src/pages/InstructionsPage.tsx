import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";

function InstructionsPage(): import("react").JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto py-16 px-6">

        <h2 className="text-4xl font-bold text-black">
          Assessment Instructions
        </h2>

        <p className="text-gray-600 mt-4">
          Please read the following instructions carefully before
          beginning your English placement assessment. This assessment
          is designed to understand your current English level and
          recommend the most suitable course for you.
        </p>

        <div className="mt-10 space-y-6">

          <div>
            <h3 className="text-xl font-bold">
              1. Important
            </h3>

            <p className="text-gray-600 mt-2">
              This is NOT an official IELTS or PTE examination and
              does not provide an official IELTS or PTE score.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              2. Complete the assessment independently
            </h3>

            <p className="text-gray-600 mt-2">
              Please answer all questions yourself without using
              Google Translate, ChatGPT, or other translation or
              AI tools.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              3. Assessment sections
            </h3>

            <p className="text-gray-600 mt-2">
              The assessment contains three sections:
            </p>

            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-2">
              <li>
                <strong>Grammar:</strong> 20 questions — 10 minutes
              </li>

              <li>
                <strong>Reading:</strong> 10 questions — 10 minutes
              </li>

              <li>
                <strong>Listening:</strong> 20 questions — 10 minutes
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              4. Time limits
            </h3>

            <p className="text-gray-600 mt-2">
              Each section has its own time limit. When the time
              runs out, the section will be submitted automatically
              using the answers you have provided.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              5. Listening section
            </h3>

            <p className="text-gray-600 mt-2">
              The listening recordings contain intentional pauses.
              These pauses give you time to review your answers
              before the next part begins.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              6. Moving between sections
            </h3>

            <p className="text-gray-600 mt-2">
              Once you complete and submit a section, you will move
              to the next section. You cannot return to a previous
              section after it has been submitted.
            </p>
          </div>

        </div>

        <div className="mt-10 border border-gray-200 bg-gray-50 p-6">

          <h3 className="text-xl font-bold">
            Assessment Overview
          </h3>

          <div className="mt-4 space-y-2 text-gray-700">

            <p>
              <strong>Total time:</strong> 30 minutes
            </p>

            <p>
              <strong>Total questions:</strong> 50
            </p>

            <p>
              <strong>Sections:</strong> Grammar, Reading, Listening
            </p>

          </div>

        </div>

        <div className="mt-12">
          <Button
            text="Begin Assessment"
            variant="primary"
            onClick={() => navigate("/assessment")}
          />
        </div>

      </main>
    </>
  );
}

export default InstructionsPage;