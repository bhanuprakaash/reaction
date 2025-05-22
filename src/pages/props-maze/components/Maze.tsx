import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropPuzzle from "./PropPuzzle";
import type { Gate, MazeState } from "../types";

const INITIAL_GATES: Gate[] = [
  {
    id: "gate1",
    position: { x: 2, y: 1 },
    puzzle: {
      component: "Button",
      correctProps: {
        disabled: false,
        variant: "primary",
      },
      options: [
        {
          property: "disabled",
          values: [true, false],
        },
        {
          property: "variant",
          values: ["primary", "secondary", "default"],
        },
      ],
    },
  },
  {
    id: "gate2",
    position: { x: 4, y: 3 },
    puzzle: {
      component: "Card",
      correctProps: {
        elevation: 2,
        rounded: true,
      },
      options: [
        {
          property: "elevation",
          values: [0, 1, 2, 3],
        },
        {
          property: "rounded",
          values: [true, false],
        },
      ],
    },
  },
  {
    id: "gate3",
    position: { x: 6, y: 5 },
    puzzle: {
      component: "Input",
      correctProps: {
        type: "password",
        required: true,
        autoFocus: false,
      },
      options: [
        {
          property: "type",
          values: ["text", "password", "email"],
        },
        {
          property: "required",
          values: [true, false],
        },
        {
          property: "autoFocus",
          values: [true, false],
        },
      ],
    },
  },
  {
    id: "gate4",
    position: { x: 3, y: 6 },
    puzzle: {
      component: "Alert",
      correctProps: {
        type: "warning",
        dismissible: true,
      },
      options: [
        {
          property: "type",
          values: ["info", "warning", "error", "success"],
        },
        {
          property: "dismissible",
          values: [true, false],
        },
      ],
    },
  },
  {
    id: "gate5",
    position: { x: 1, y: 4 },
    puzzle: {
      component: "Badge",
      correctProps: {
        color: "purple",
        size: "large",
        pill: true,
      },
      options: [
        {
          property: "color",
          values: ["blue", "red", "purple", "green"],
        },
        {
          property: "size",
          values: ["small", "medium", "large"],
        },
        {
          property: "pill",
          values: [true, false],
        },
      ],
    },
  },
];

const MAZE_SIZE = 8;

const Maze: React.FC = () => {
  const [state, setState] = useState<MazeState>({
    playerPosition: { x: 0, y: 0 },
    gates: INITIAL_GATES,
    currentGate: null,
    solvedGates: [],
  });

  const movePlayer = (dx: number, dy: number) => {
    const newPosition = {
      x: state.playerPosition.x + dx,
      y: state.playerPosition.y + dy,
    };

    // Check if the move is valid
    if (
      newPosition.x < 0 ||
      newPosition.x >= MAZE_SIZE ||
      newPosition.y < 0 ||
      newPosition.y >= MAZE_SIZE
    ) {
      return;
    }

    // Check if there's a gate
    const gate = state.gates.find(
      (g) => g.position.x === newPosition.x && g.position.y === newPosition.y
    );

    if (gate) {
      if (!state.solvedGates.includes(gate.id)) {
        setState((prev) => ({ ...prev, currentGate: gate.id }));
        return;
      }
    }

    setState((prev: MazeState) => ({ ...prev, playerPosition: newPosition }));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (state.currentGate) return;

      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [state.currentGate, state.playerPosition]);

  const isGameComplete = (state: MazeState) => {
    const isAtGoal =
      state.playerPosition.x === MAZE_SIZE - 1 &&
      state.playerPosition.y === MAZE_SIZE - 1;
    const allGatesSolved = state.gates.length === state.solvedGates.length;
    return isAtGoal && allGatesSolved;
  };

  const handleGateSolved = (gateId: string) => {
    setState((prev) => ({
      ...prev,
      currentGate: null,
      solvedGates: [...prev.solvedGates, gateId],
    }));
  };

  return (
    <div className="relative w-fit mx-auto mt-8">
      <div
        className="grid gap-0 bg-gray-100 p-4 rounded-lg shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${MAZE_SIZE}, 64px)`,
        }}
      >
        {Array.from({ length: MAZE_SIZE * MAZE_SIZE }).map((_, i) => {
          const x = i % MAZE_SIZE;
          const y = Math.floor(i / MAZE_SIZE);
          const gate = state.gates.find(
            (g) => g.position.x === x && g.position.y === y
          );
          const isSolved = gate && state.solvedGates.includes(gate.id);
          const isGoal = x === MAZE_SIZE - 1 && y === MAZE_SIZE - 1;
          const gameComplete = isGameComplete(state);

          return (
            <div
              key={i}
              className={`w-16 h-16 border border-gray-200 flex items-center justify-center ${
                gate
                  ? isSolved
                    ? "bg-green-500/50"
                    : "bg-red-500/50"
                  : "bg-white"
              }`}
            >
              {isGoal && (
                <div
                  className={`w-8 h-8 rounded-full animate-pulse ${
                    gameComplete ? "bg-green-400" : "bg-yellow-400"
                  }`}
                />
              )}
            </div>
          );
        })}

        <motion.div
          className="absolute w-16 h-16 flex items-center justify-center"
          animate={{
            x: state.playerPosition.x * 64 + 16,
            y: state.playerPosition.y * 64 + 16,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full" />
        </motion.div>
      </div>

      {state.currentGate && (
        <PropPuzzle
          gate={state.gates.find((g) => g.id === state.currentGate)!}
          onSolve={handleGateSolved}
          onClose={() => setState((prev) => ({ ...prev, currentGate: null }))}
        />
      )}
    </div>
  );
};

export default Maze;
