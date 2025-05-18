import { useState } from "react";

interface SmoothHoverTextProps {
  children: React.ReactNode;
  className?: string;
}

const SmoothHoverText: React.FC<SmoothHoverTextProps> = ({
  children,
  className = "",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <p
      className={`
        relative px-6 py-3 rounded-lg text-white text-lg
        cursor-pointer
        transition-all duration-500
        ${
          hovered
            ? "bg-white/10 shadow-xl"
            : "bg-transparent"
        }
        ${className}
      `}
      style={{ willChange: "background, box-shadow, transform" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </p>
  );
};

export default SmoothHoverText;
