export interface Position {
  x: number;
  y: number;
}

export interface Gate {
  id: string;
  position: Position;
  puzzle: {
    component: string;
    correctProps: Record<string, any>;
    options: Array<{
      property: string;
      values: any[];
    }>;
  };
}

export interface MazeState {
  playerPosition: Position;
  gates: Gate[];
  currentGate: string | null;
  solvedGates: string[];
}

export interface PropPuzzleProps {
  gate: Gate;
  onSolve: (gateId: string) => void;
  onClose: () => void;
}
