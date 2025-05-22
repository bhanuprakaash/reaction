import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Mole } from "../types";

interface EventMoleProps {
  mole: Mole;
  onScore: (points: number, moleId: number) => void;
}

const EventMole: React.FC<EventMoleProps> = ({ mole, onScore }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleEvent = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onScore(mole.points, mole.id);
  };

  const getEventHandler = () => {
    switch (mole.type) {
      case "click":
        return { onClick: handleEvent };
      case "doubleClick":
        return { onDoubleClick: handleEvent };
      case "rightClick":
        return { onContextMenu: handleEvent };
      case "hover":
        return { onMouseEnter: handleEvent };
      case "drag":
        return {
          drag: true, // Use Framer Motion's drag
          onDragStart: () => setIsDragging(true),
          onDragEnd: () => {
            setIsDragging(false);
            handleEvent({ preventDefault: () => {} } as React.SyntheticEvent);
          },
          dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
          dragElastic: 0.1,
        };
      default:
        return {};
    }
  };

  const getEventText = () => {
    switch (mole.type) {
      case "click":
        return "Click me!";
      case "doubleClick":
        return "Double click!";
      case "rightClick":
        return "Right click!";
      case "hover":
        return "Hover me!";
      case "drag":
        return "Drag me!";
      default:
        return "";
    }
  };

  const getEventColor = () => {
    switch (mole.type) {
      case "click":
        return "bg-blue-500 hover:bg-blue-600";
      case "doubleClick":
        return "bg-green-500 hover:bg-green-600";
      case "rightClick":
        return "bg-purple-500 hover:bg-purple-600";
      case "hover":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "drag":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <AnimatePresence>
      {mole.active && (
        <motion.div
          className={`absolute rounded-full p-4 cursor-pointer text-white font-bold
            shadow-lg ${getEventColor()} ${isDragging ? "scale-110" : ""}`}
          style={{
            left: `${mole.position.x}%`,
            top: `${mole.position.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          {...getEventHandler()}
        >
          {getEventText()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventMole;
