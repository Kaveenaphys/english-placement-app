interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "success" | "danger";
  onClick?: () => void;
}

function Button({
  text,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-red-600 hover:bg-red-700 text-white",

    secondary:
      "bg-gray-200 hover:bg-gray-300 text-black",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    danger:
      "bg-black hover:bg-gray-800 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition ${styles[variant]}`}
    >
      {text}
    </button>
  );
}

export default Button;