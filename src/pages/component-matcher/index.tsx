import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { componentPairs, pulseVariants, shakeVariants } from "./utils";

type CardSide = "visual" | "code";

// Build deck: for each component, add a "visual" and a "code" card
function getShuffledDeck() {
  const deck = componentPairs
    .flatMap((comp) => [
      { ...comp, id: `${comp.name}-visual`, side: "visual" as CardSide },
      { ...comp, id: `${comp.name}-code`, side: "code" as CardSide },
    ])
    .sort(() => Math.random() - 0.5);
  return deck;
}

type CardType = ReturnType<typeof getShuffledDeck>[0];


const ComponentMatcher: React.FC = () => {
  const [deck, setDeck] = useState<CardType[]>(getShuffledDeck());
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [shakeIds, setShakeIds] = useState<string[]>([]);
  const [pulseIds, setPulseIds] = useState<string[]>([]);

  useEffect(() => {
    if (flipped.length === 2) {
      setLocked(true);
      const [first, second] = flipped;
      const firstCard = deck.find((c) => c.id === first);
      const secondCard = deck.find((c) => c.id === second);
      if (
        firstCard &&
        secondCard &&
        firstCard.name === secondCard.name &&
        firstCard.side !== secondCard.side
      ) {
        setMatched((prev) => [...prev, firstCard.name]);
        setPulseIds([first, second]);
        setTimeout(() => {
          setFlipped([]);
          setPulseIds([]);
          setLocked(false);
        }, 800);
      } else {
        setShakeIds([first, second]);
        setTimeout(() => {
          setFlipped([]);
          setShakeIds([]);
          setLocked(false);
        }, 1200);
      }
      setMoves((m) => m + 1);
    }
  }, [flipped, deck]);

  const resetGame = () => {
    setDeck(getShuffledDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLocked(false);
    setShakeIds([]);
    setPulseIds([]);
  };

  const handleFlip = (id: string) => {
    if (locked || flipped.includes(id) || flipped.length === 2) return;
    setFlipped((prev) => [...prev, id]);
  };

  // A card is "flipped" if selected or matched
  const isFlipped = (card: CardType) =>
    flipped.includes(card.id) || matched.includes(card.name);

  return (
    <div className="flex flex-col items-center justify-center py-8 h-[100%]">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {deck.map((card) => {
          const isCardFlipped = isFlipped(card);
          const shouldShake = shakeIds.includes(card.id);
          const shouldPulse = pulseIds.includes(card.id);

          return (
            <motion.div
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`relative bg-white rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer
                w-32 h-40 text-3xl text-gray-800 select-none
                border-2 ${
                  shouldPulse ? "border-green-500" : "border-transparent"
                } focus:ring-2 focus:ring-blue-500`}
              whileTap={{ scale: 0.97 }}
              tabIndex={0}
              aria-label={card.name}
              variants={shakeVariants}
              animate={shouldShake ? "shake" : "still"}
              style={{ zIndex: shouldPulse ? 1 : 0 }}
            >
              <motion.div
                variants={pulseVariants}
                animate={shouldPulse ? "pulse" : "none"}
                className="absolute inset-0 rounded-lg pointer-events-none cursor-pointer"
                style={{
                  borderColor: shouldPulse ? "#22c55e" : "rgba(34,197,94,0)",
                  borderWidth: 2,
                  borderStyle: "solid",
                }}
              />
              <AnimatePresence initial={false}>
                {isCardFlipped ? (
                  <motion.div
                    key="front"
                    className="flex flex-col items-center justify-center h-full w-full cursor-pointer"
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 180 }}
                    transition={{ duration: 0.3 }}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="mb-2 text-base font-semibold text-blue-600">
                      {card.name}
                    </span>
                    {card.side === "visual" ? (
                      <div className="mb-2">{card.visual}</div>
                    ) : (
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded mb-2 whitespace-pre-line break-words max-w-[7rem] overflow-x-auto">
                        {card.code}
                      </code>
                    )}
                    <span className="text-xs text-gray-400">
                      {card.side === "visual" ? "UI" : "Code"}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    className="absolute inset-0 flex items-center justify-center bg-blue-400 rounded-lg text-white text-2xl"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 180 }}
                    exit={{ rotateY: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    ?
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-lg">Moves: {moves}</span>
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white rounded px-3 py-1 shadow hover:bg-blue-600 transition"
        >
          Restart
        </button>
      </div>
      {matched.length === componentPairs.length && (
        <motion.div
          className="mt-4 text-xl text-green-600 font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎉 You matched all reusable components in {moves} moves!
        </motion.div>
      )}
    </div>
  );
};

export default ComponentMatcher;
