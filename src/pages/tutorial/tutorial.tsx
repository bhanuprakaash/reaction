import type { TutorialData } from "../play-ground/tutorial/Tutorial";
import TutorialPage from "../jsx-puzzle-builder/components/TutorialPage";
import ComponentTutorialPage from "../component-matcher/components/ComponentTutorialPage";
import PropsTutorialPage from "../props-maze/components/PropsTutorialPage";

export const level1: TutorialData = {
  title: "JSX & Rendering",
  description: <TutorialPage />,
};

export const level2: TutorialData = {
  title: "Components",
  description: <ComponentTutorialPage />,
};

export const level3: TutorialData = {
  title: "props",
  description: <PropsTutorialPage />,
};
