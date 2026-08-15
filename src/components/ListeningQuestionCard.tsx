interface ListeningQuestionCardProps {
  question: string;
  options: string[];
  questionNumber: number;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

function ListeningQuestionCard({
  question,
  options,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
}: ListeningQuestionCardProps) {
  return (
    <div className="border border-gray-200 shadow-sm p-8">

      <p className="text-gray-500">
        Question {questionNumber}
      </p>

      <h3 className="text-2xl font-semibold mt-3">
        {question}
      </h3>

      <div className="mt-8 space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerSelect(option)}
            className={`w-full text-left border p-4 transition ${
              selectedAnswer === option
                ? "border-red-600 bg-red-50"
                : "border-gray-300 hover:border-red-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

    </div>
  );
}

export default ListeningQuestionCard;