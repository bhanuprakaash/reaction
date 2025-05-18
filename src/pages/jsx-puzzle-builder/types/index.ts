export type JSXElementType =
  | "div"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "span"
  | "button"
  | "section"
  | "article";

export interface DraggableItem {
  id: string;
  type: JSXElementType;
  children?: DraggableItem[];
  content?: string;
}

export interface DroppedItem extends DraggableItem {
  parentId?: string;
}

export const NESTING_RULES: Record<JSXElementType, JSXElementType[]> = {
  div: ["div", "p", "h1", "h2", "h3", "span", "button", "section", "article"],
  section: ["div", "p", "h1", "h2", "h3", "span", "button", "article"],
  article: ["div", "p", "h1", "h2", "h3", "span", "button"],
  p: ["span", "button"],
  h1: ["span"],
  h2: ["span"],
  h3: ["span"],
  span: [],
  button: ["span"],
};

export const isValidNesting = (
  parentType: JSXElementType,
  childType: JSXElementType
): boolean => {
  return NESTING_RULES[parentType]?.includes(childType) ?? false;
};
