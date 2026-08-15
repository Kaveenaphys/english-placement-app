interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white border-t-4 border-red-600 shadow-lg p-8">
      <h3 className="text-2xl font-bold text-black">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;