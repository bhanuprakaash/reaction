import { useState, useEffect } from "react";

const HeadingLoader = () => {
  const [fillProgress, setFillProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fillTimer = setInterval(() => {
      setFillProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 20);

    return () => clearInterval(fillTimer);
  }, [isVisible]);

  return (
    <div className="flex items-center justify-center bg-gray-900 p-2">
      <div
        className="relative"
        style={{
          transform: isVisible ? "scale(1)" : "scale(0.8)",
          opacity: isVisible ? 1 : 0,
          transition: "all 1s ease-out",
        }}
      >
        <h1 className="text-6xl font-thin tracking-wide text-gray-700">
          Reaction.
        </h1>

        <h1
          className="absolute inset-0 text-6xl font-thin tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          style={{
            clipPath: `polygon(0 0, ${fillProgress}% 0, ${fillProgress}% 100%, 0% 100%)`,
            WebkitBackgroundClip: "text",
          }}
        >
          Reaction.
        </h1>
      </div>
    </div>
  );
};

export default HeadingLoader;
