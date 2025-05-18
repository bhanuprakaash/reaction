import React, { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Highlight, themes } from "prism-react-renderer";
import type { DroppedItem } from "../types";
import TreeView from "./TreeView";
import { resultItems } from "../answer/answer";
import SuccessBlast from "../../../components/framer-effects/SuccessBlast";
import NextLevelModal from "../../../components/modal/NextLevelModal";

interface CanvasProps {
  items: DroppedItem[];
  onItemClick?: (itemId: string | undefined) => void;
  selectedItemId?: string;
}

function isStructureMatch(a: DroppedItem[], b: DroppedItem[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].type !== b[i].type) return false;
    if (!isStructureMatch(a[i].children || [], b[i].children || []))
      return false;
  }
  return true;
}

const DroppedElement: React.FC<{
  item: DroppedItem;
  level: number;
  onItemClick?: (itemId: string | undefined) => void;
  selectedItemId?: string;
}> = ({ item, level, onItemClick, selectedItemId }) => {
  const style = {
    marginLeft: `${level * 20}px`,
    backgroundColor: item.id === selectedItemId ? "#e3f2fd" : undefined,
  };

  const handleClick = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    onItemClick?.(itemId);
  };

  const openingTag = `<${item.type}>`;
  const closingTag = `</${item.type}>`;
  const content = item.content || "";

  return (
    <div
      className={`dropped-element ${
        item.id === selectedItemId ? "selected" : ""
      }`}
      style={style}
      onClick={(e) => handleClick(e, item.id)}
    >
      <div className="element-wrapper">
        <Highlight theme={themes.duotoneDark} code={openingTag} language="jsx">
          {({ className, style, tokens, getTokenProps }) => (
            <pre
              className={`${className} element-tag`}
              style={{ ...style, display: "inline", background: "transparent" }}
            >
              {tokens[0].map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </pre>
          )}
        </Highlight>

        {content && <span className="element-content">{content}</span>}

        <div className="element-children">
          {item.children?.map((child) => (
            <DroppedElement
              key={child.id}
              item={child}
              level={level + 1}
              onItemClick={onItemClick}
              selectedItemId={selectedItemId}
            />
          ))}
        </div>

        <Highlight theme={themes.duotoneDark} code={closingTag} language="jsx">
          {({ className, style, tokens, getTokenProps }) => (
            <pre
              className={`${className} element-tag`}
              style={{ ...style, display: "inline", background: "transparent" }}
            >
              {tokens[0].map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

const Canvas: React.FC<CanvasProps> = ({
  items,
  onItemClick,
  selectedItemId,
}) => {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const structureMatches = isStructureMatch(items, resultItems);

  useEffect(() => {
    if (structureMatches) setModalOpen(true);
    else setModalOpen(false);
  }, [structureMatches]);

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col radius-lg p-3 h-[100vh] w-3/4"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          onItemClick?.(undefined);
        }
      }}
    >
      <div className="h-[100vh] flex flex-col">
        <div className="h-[50vh] overflow-auto p-2">
          {items.map((item) => (
            <DroppedElement
              key={item.id}
              item={item}
              level={0}
              onItemClick={onItemClick}
              selectedItemId={selectedItemId}
            />
          ))}
          {items.length === 0 && (
            <div className="text-neutral-400 text-center w-full h-[50vh] flex items-center justify-center">
              Drop elements here
            </div>
          )}
        </div>
        <SuccessBlast success={structureMatches} />
        <NextLevelModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Level Complete!  🎉"
        >
          <div className="text-base mb-4">
            Woohoo! You completed the level!
            Your JSX skills are so sharp, even React is jealous. 
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Go To Next Level
            </button>
          </div>
        </NextLevelModal>
        <div className="flex flex-row gap-4 h-[50vh]">
          <div className="flex-1 bg-gray-800 rounded-lg p-2 overflow-auto">
            <TreeView items={resultItems} onItemClick={onItemClick} />
          </div>
          <div className="flex-1 bg-gray-800 rounded-lg p-2 overflow-auto">
            <TreeView items={items} onItemClick={onItemClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
