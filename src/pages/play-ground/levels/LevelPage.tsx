import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import JSXPuzzleBuilder from "../../jsx-puzzle-builder";
import Tutorial from "../tutorial/Tutorial";
import ComponentMatcher from "../../component-matcher";

const levelComponents: Record<string, ReactNode> = {
  "1": <JSXPuzzleBuilder />,
  "2": <ComponentMatcher />,
};

const tutorials: Record<string, ReactNode> = {
  "1": <Tutorial level="1" />,
  "2": <Tutorial level="2" />,
};

const LevelPage = () => {
  const { level } = useParams<{ level: string }>();
  return (
    <div className="min-h-screen flex flex-row w-full bg-gray-950 text-white overflow-hidden">
      <div className="w-1/4 min-h-screen bg-gray-900 p-6 pt-2 flex flex-col items-start border-r border-gray-800">
        {tutorials[level ?? ""] || <div>No tutorial found</div>}
      </div>
      <div className="w-3/4 min-h-screen">
        {levelComponents[level ?? ""] || <div>Level not found</div>}
      </div>
    </div>
  );
};

export default LevelPage;
