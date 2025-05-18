import React, { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { isValidNesting, type DroppedItem, type JSXElementType } from "./types";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import "./styles.css";

const JSXPuzzleBuilder: React.FC = () => {
  const [items, setItems] = useState<DroppedItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();

  const generateUniqueId = (type: string): string => {
    return `${type}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  };

  const findItemById = (
    items: DroppedItem[],
    id: string
  ): DroppedItem | undefined => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const findParentItem = (
    items: DroppedItem[],
    id: string
  ): DroppedItem | undefined => {
    for (const item of items) {
      if (item.children?.some((child) => child.id === id)) return item;
      if (item.children) {
        const found = findParentItem(item.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const addItemToParent = (
    items: DroppedItem[],
    parentId: string,
    newItem: DroppedItem
  ): DroppedItem[] => {
    return items.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...(item.children || []), newItem],
        };
      }
      if (item.children) {
        return {
          ...item,
          children: addItemToParent(item.children, parentId, newItem),
        };
      }
      return item;
    });
  };

  const removeItemFromParent = (
    items: DroppedItem[],
    itemId: string
  ): DroppedItem[] => {
    return items
      .filter((item) => item.id !== itemId)
      .map((item) => {
        if (item.children) {
          return {
            ...item,
            children: removeItemFromParent(item.children, itemId),
          };
        }
        return item;
      });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedType = String(active.data?.current?.type) as JSXElementType;
    const draggedId = generateUniqueId(draggedType);
    const overId = String(over.id);

    // Create new item data
    const newItem: DroppedItem = {
      id: draggedId,
      type: draggedType,
      children: [],
    };

    if (over.id === "canvas") {
      if (selectedItemId) {
        const selectedItem = findItemById(items, selectedItemId);
        if (selectedItem && isValidNesting(selectedItem.type, draggedType)) {
          setItems(addItemToParent(items, selectedItemId, newItem));
          return;
        }
      }

      if (items.length === 0) {
        setItems([newItem]);
        return;
      }

      const existingParent = findParentItem(items, draggedId);
      if (existingParent) {
        const updatedItems = removeItemFromParent(items, draggedId);
        setItems([...updatedItems, newItem]);
      } else {
        setItems([...items, newItem]);
      }
      return;
    }

    const targetId = overId.replace(/^draggable-/, "");
    const targetItem = findItemById(items, targetId);

    if (!targetItem) return;

    if (isValidNesting(targetItem.type, draggedType)) {
      const existingParent = findParentItem(items, draggedId);
      if (existingParent) {
        let updatedItems = removeItemFromParent(items, draggedId);
        updatedItems = addItemToParent(updatedItems, targetId, newItem);
        setItems(updatedItems);
      } else {
        setItems(addItemToParent(items, targetId, newItem));
      }
    }
  };

  const clearDOM = () => {
    setItems([]);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex min-h-100 w-full">
        <Canvas
          items={items}
          onItemClick={setSelectedItemId}
          selectedItemId={selectedItemId}
        />
        <Sidebar clearDOM={clearDOM} />
      </div>
    </DndContext>
  );
};

export default JSXPuzzleBuilder;
