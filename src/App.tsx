import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CandidatePage from "./pages/CandidatePage";
import InstructionsPage from "./pages/InstructionsPage";
import AssessmentPage from "./pages/AssessmentPage";
import ReadingPage from "./pages/ReadingPage";
import ListeningPage from "./pages/ListeningPage";
import ResultsPage from "./pages/ResultsPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/candidate"
          element={<CandidatePage />}
        />

        <Route
          path="/instructions"
          element={<InstructionsPage />}
        />

        <Route
          path="/assessment"
          element={<AssessmentPage />}
        />

        <Route
          path="/reading"
          element={<ReadingPage />}
        />

        <Route
          path="/listening"
          element={<ListeningPage />}
        />

        <Route
          path="/results"
          element={<ResultsPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;