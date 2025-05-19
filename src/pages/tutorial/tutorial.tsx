import type { TutorialData } from "../play-ground/tutorial/Tutorial";
import TutorialPage from "../jsx-puzzle-builder/components/TutorialPage";
import ComponentTutorialPage from "../component-matcher/components/ComponentTutorialPage";

export const level1: TutorialData = {
  title: "JSX & Rendering",
  description: <TutorialPage />,
};

export const level2: TutorialData = {
  title: "Components",
  description: <ComponentTutorialPage />,
};
