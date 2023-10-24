"use client";

import { ChallanListModel } from "./models";
import ReactFlow, {
  Background,
  Controls,
  type Edge,
  MarkerType,
  type Node,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import "reactflow/dist/base.css";
import { ChallanNode } from "./components/challan/challan_node";
import { useMemo } from "react";
import { graph_challans } from "./data/graph_data";
import { SelectedNodeProvider } from "./hooks/use_selected_node";

export const ChallanGraphView = () => {
  return (
    <SelectedNodeProvider>
      <ReactFlowProvider>
        <ChallanGraph challans={graph_challans} />
      </ReactFlowProvider>
    </SelectedNodeProvider>
  );
};

const g = new dagre.graphlib.Graph();
g.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "TB"
) => {
  const isHorizontal = direction === "LR";
  g.setGraph({ rankdir: direction, nodesep: 350, ranksep: 150 });

  nodes.forEach((node) => g.setNode(node.id, node as any));
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));

  dagre.layout(g);

  nodes.forEach((node) => {
    const nodeWithPosition = g.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    node.position = {
      x: nodeWithPosition.x,
      y: nodeWithPosition.y,
    };

    return node;
  });

  return { nodes, edges };
};

const ChallanGraph = ({ challans }: { challans: ChallanListModel[] }) => {
  const createNodesFromChallans = (): Node[] => {
    return challans.map((challan, index) => ({
      id: challan.id.toString(),
      type: "challanNode",
      position: {
        x: 0,
        y: 0,
      },
      data: challan,
    }));
  };

  const createEdgesFromChallans = (): Edge[] => {
    const edges: Edge[] = [];

    challans.forEach((challan) => {
      challan.parentChallanIds.forEach((parentId, i) => {
        edges.push({
          id: `${parentId}-${challan.id}`,
          markerEnd: MarkerType.Arrow,
          source: parentId.toString(),
          target: challan.id.toString(),
          animated: true,
        });
      });
    });

    return edges;
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    createNodesFromChallans(),
    createEdgesFromChallans()
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const nodeTypes = useMemo(() => {
    return {
      challanNode: ChallanNode,
    };
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background className="bg-gray-50/20" />
      </ReactFlow>
    </div>
  );
};
