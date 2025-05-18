import React from "react";
import { useDraggable } from "@dnd-kit/core";
import type { JSXElementType } from "../types";
import { motion } from "framer-motion";

interface DraggableElementProps {
  id: string;
  type: string;
}

const AVAILABLE_ELEMENTS: JSXElementType[] = [
  "div",
  "section",
  "article",
  "p",
  "h1",
  "h2",
  "h3",
  "span",
  "button",
];

const DraggableElement: React.FC<DraggableElementProps> = ({ id, type }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${type}-${id}`,
    data: {
      type,
      id,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="text-center bg-white/10 font-bold p-3 text-lg radius-lg cursor-move"
      style={style}
    >
      {`<${type}>`}
    </div>
  );
};

interface SidebarProps {
  clearDOM?: () => void; // or the correct type for your function
}

const Sidebar: React.FC<SidebarProps> = ({ clearDOM }) => {
  return (
    <div className="p-4 bg-gray-800 shadow-sm radius-lg w-1/4">
      <div className="flex flex-col gap-2">
        {AVAILABLE_ELEMENTS.map((type) => (
          <DraggableElement key={type} id={type} type={type} />
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.06, backgroundColor: "#64748b" }}
        whileTap={{ scale: 0.97 }}
        onClick={clearDOM}
        className="mt-4 cursor-pointer px-4 py-2 bg-slate-500 text-white rounded transition-colors duration-200"
        type="button"
      >
        Clear DOM
      </motion.button>
    </div>
  );
};

export default Sidebar;
