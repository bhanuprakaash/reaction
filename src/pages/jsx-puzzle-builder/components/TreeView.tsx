import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import type { DroppedItem } from "../types";

interface FlowViewProps {
  items: DroppedItem[];
  selectedItemId?: string;
  onItemClick?: (itemId: string | undefined) => void;
}

const ElementNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`flow-node ${selected ? "selected" : ""}`}
      onClick={() => data.onClick?.(data.id)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flow-node-content">
        <span className="flow-node-type">{`<${data.type}>`}</span>
        {data.content && <span className="flow-node-text">{data.content}</span>}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  elementNode: ElementNode,
};

const TreeView: React.FC<FlowViewProps> = ({ items, onItemClick }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const updateFlowElements = useCallback(
    (items: DroppedItem[]) => {
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      let yOffset = 0;

      const processItem = (
        item: DroppedItem,
        level: number,
        parentId?: string
      ): void => {
        const nodeId = item.id;

        // Create node
        newNodes.push({
          id: nodeId,
          type: "elementNode",
          position: { x: level * 100, y: yOffset * 70 },
          data: {
            id: nodeId,
            type: item.type,
            content: item.content,
            onClick: onItemClick,
          },
        });

        // Create edge from parent if exists
        if (parentId) {
          newEdges.push({
            id: `${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId,
            type: "default",
          });
        }

        // Process children
        if (item.children?.length) {
          item.children.forEach((child) => {
            yOffset++;
            processItem(child, level + 1, nodeId);
          });
        } else {
          yOffset++;
        }
      };

      items.forEach((item) => {
        processItem(item, 0);
      });
      setNodes(newNodes);
      setEdges(newEdges);
    },
    [setNodes, setEdges, onItemClick]
  );

  React.useEffect(() => {
    updateFlowElements(items);
  }, [items, updateFlowElements]);

  return (
    <div className="h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="flow-canvas"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeView;
