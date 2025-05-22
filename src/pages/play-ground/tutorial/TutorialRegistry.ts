import { level2, level1, level3 } from "../../tutorial/tutorial";
import type { TutorialData } from "./Tutorial";

export const tutorialRegistry: Record<string, TutorialData> = {
  "1": level1,
  "2": level2,
  "3": level3,
};
