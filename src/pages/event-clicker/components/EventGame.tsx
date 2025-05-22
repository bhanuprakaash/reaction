import { useState, useEffect, useCallback } from "react";
import EventMole from "./EventMole";
import type { GameState, Mole } from "../types";

const GAME_DURATION = 60;
const GRID_SIZE = 5;
const GRID_COLS = 4;
const GRID_ROWS = 3;
const PADDING = 10;

const createMole = (id: number): Mole => {
  const types: Mole["type"][] = [
    "click",
    "doubleClick",
    "rightClick",
    "drag",
    "hover",
  ];

  // Calculate grid cell size
  const cellWidth = (100 - 2 * PADDING) / GRID_COLS;
  const cellHeight = (100 - 2 * PADDING) / GRID_ROWS;

  // Get row and column from id
  const row = Math.floor(id / GRID_COLS);
  const col = id % GRID_COLS;

  // Add some randomness within the grid cell
  const randomOffset = 5; // 5% random offset within cell
  const x = PADDING + col * cellWidth + Math.random() * randomOffset;
  const y = PADDING + row * cellHeight + Math.random() * randomOffset;

  return {
    id,
    type: types[Math.floor(Math.random() * types.length)],
    position: {
      x: Math.min(Math.max(x, PADDING), 100 - PADDING),
      y: Math.min(Math.max(y, PADDING), 100 - PADDING),
    },
    active: false,
    points: Math.floor(Math.random() * 5) + 1,
  };
};

const EventGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    timeLeft: GAME_DURATION,
    moles: Array.from({ length: GRID_SIZE * 2 }, (_, i) => createMole(i)),
    gameActive: false,
  });

  const [showTutorial, setShowTutorial] = useState(true);

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      score: 0,
      timeLeft: GAME_DURATION,
      gameActive: true,
    }));
    setShowTutorial(false);
  };

  const activateRandomMole = useCallback(() => {
    if (!gameState.gameActive) return;

    setGameState((prev) => {
      const inactiveMoles = prev.moles.filter((mole) => !mole.active);
      if (inactiveMoles.length === 0) return prev;

      // Only deactivate moles that have been active for more than 3 seconds
      const now = Date.now();
      const updatedMoles = prev.moles.map((mole) => ({
        ...mole,
        active: mole.active && now - (mole.activatedAt || 0) < 2000,
      }));

      const randomMole =
        inactiveMoles[Math.floor(Math.random() * inactiveMoles.length)];
      return {
        ...prev,
        moles: updatedMoles.map((mole) =>
          mole.id === randomMole.id
            ? { ...mole, active: true, activatedAt: Date.now() }
            : mole
        ),
      };
    });
  }, [gameState.gameActive]);

  useEffect(() => {
    if (!gameState.gameActive) return;

    const timer = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameActive]);

  useEffect(() => {
    if (gameState.timeLeft <= 0) {
      setGameState((prev) => ({ ...prev, gameActive: false }));
    }
  }, [gameState.timeLeft]);

  useEffect(() => {
    if (!gameState.gameActive) return;

    const spawnInterval = setInterval(activateRandomMole, 1500);
    return () => clearInterval(spawnInterval);
  }, [gameState.gameActive, activateRandomMole]);

  const handleScore = (points: number, moleId: number) => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
      moles: prev.moles.map((mole) =>
        mole.id === moleId ? { ...mole, active: false } : mole
      ),
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="flex justify-between mb-4">
          <div className="text-2xl font-bold text-white">
            Score: {gameState.score}
          </div>
          <div className="text-2xl font-bold text-white">
            Time: {gameState.timeLeft}s
          </div>
        </div>

        {showTutorial ? (
          <div className="bg-gray-700 p-6 rounded-lg mb-4 text-white">
            <h3 className="text-xl font-bold mb-4">Whack-a-Mole</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500 p-3 rounded">
                Click - Single click the mole
              </div>
              <div className="bg-green-500 p-3 rounded">
                Double Click - Click twice quickly
              </div>
              <div className="bg-purple-500 p-3 rounded">
                Right Click - Use context menu click
              </div>
              <div className="bg-yellow-500 p-3 rounded">
                Hover - Just move mouse over
              </div>
              <div className="bg-red-500 p-3 rounded">
                Drag - Click, hold, and drag
              </div>
            </div>
            <button
              onClick={startGame}
              className="mt-6 w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div
            className="relative bg-gray-700 rounded-lg"
            style={{ height: "60vh" }}
          >
            {gameState.moles.map((mole) => (
              <EventMole key={mole.id} mole={mole} onScore={handleScore} />
            ))}

            {!gameState.gameActive && gameState.timeLeft <= 0 && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Game Over!
                  </h2>
                  <p className="text-xl text-white mb-6">
                    Final Score: {gameState.score}
                  </p>
                  <button
                    onClick={startGame}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventGame;
