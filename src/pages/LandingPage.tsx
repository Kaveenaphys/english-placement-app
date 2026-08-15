import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    title: "CEFR Aligned",
    description: "Accurate placement from A1 to C2.",
  },
  {
    title: "Instant Results",
    description: "Receive your recommended level immediately.",
  },
  {
    title: "IELTS / PTE / OET Ready",
    description: "Find the most suitable preparation course.",
  },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto text-center py-24 px-6">
        <h2 className="text-5xl font-bold text-black">
          English Placement Assessment
        </h2>

        <p className="text-xl text-gray-600 mt-6">
          Discover your English level in just 30–45 minutes.
          Receive an instant recommendation for IELTS, PTE,
          OET or General English courses.
        </p>

        <div className="mt-10">
          <Button
            text="Start Assessment"
            variant="primary"
            onClick={() => navigate("/candidate")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default LandingPage;