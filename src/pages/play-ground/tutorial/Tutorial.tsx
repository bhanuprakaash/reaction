import type { ReactNode } from "react";
import { tutorialRegistry } from "./TutorialRegistry";

export interface TutorialData {
  title: string;
  description: ReactNode;
}

interface TutorialProps {
  level: string;
}

const Tutorial = ({ level }: TutorialProps) => (
  <div
    className="p-0 w-full overflow-hidden"
    style={{ height: "calc(100vh - 30px)" }}
  >
    <h1 className="text-4xl text-center font-thin tracking-wide text-white-900">
      Reaction.
    </h1>
    <div className="text-gray-300 text-sm mt-2 h-full overflow-y-auto">
      {tutorialRegistry[level].description}
    </div>
  </div>
);

export default Tutorial;
