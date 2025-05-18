import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { levels } from "./levels/Levels";

const Playground = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col gap-3 w-full max-w-lg h-[80vh] overflow-y-scroll">
        {levels.map((l, idx) => (
          <div
            key={l.level}
            className={`
              flex items-center gap-4 px-6 py-3 rounded-lg cursor-pointer
              transition-all duration-300
              ${hoveredIdx === idx ? "bg-white/50" : "bg-transparent"}
            `}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => navigate(`/level/${l.level}`)}
          >
            <span className="text-gray-400 font-mono text-3xl">#{l.level}</span>
            <span
              className={`
                text-3xl font-thin transition-colors duration-300 uppercase
                ${hoveredIdx === idx ? "text-cyan-400" : "text-purple-200"}
              `}
            >
              {l.topic}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playground;
