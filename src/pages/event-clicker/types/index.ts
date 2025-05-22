export interface Mole {
  id: number;
  type: "click" | "doubleClick" | "rightClick" | "drag" | "hover";
  position: { x: number; y: number };
  active: boolean;
  points: number;
  activatedAt?: number;
}

export interface GameState {
  score: number;
  timeLeft: number;
  moles: Mole[];
  gameActive: boolean;
}
