/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { DefaultNode, Graph } from "@visx/network";

export type NetworkProps = {
  width: number;
  height: number;
};

interface CustomNode {
  x: number;
  y: number;
  color?: string;
}

interface CustomLink {
  source: CustomNode;
  target: CustomNode;
  dashed?: boolean;
}

const nodes: CustomNode[] = [
  { x: 50, y: 20 },
  { x: 200, y: 250 },
  { x: 300, y: 40, color: "#26deb0" }
];

const links: CustomLink[] = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[0], dashed: true }
];

const graph = {
  nodes,
  links
};

export const background = "#272b4d";

export default function Example({ width, height }: NetworkProps) {
  const CustomNodeComponent = ({ node }) => {
    // Your custom node styling logic here
    const nodeStyle = {
      fill: node?.color || "#999", // Default fill color if none is provided
      stroke: "#fff",
      strokeWidth: 1.5
    };

    // Returning a group of SVG elements for the custom node
    return (
      <g className="custom-node">
        <circle r={10} style={nodeStyle} />
        <title>Hello, World!</title>
        <text fill="#fff" fontSize="10" textAnchor="middle" dy=".3em">
          {node?.label || <>HOLA</>}
        </text>
      </g>
    );
  };

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={background} />
      <Graph<CustomLink, CustomNode>
        graph={graph}
        top={20}
        left={100}
        nodeComponent={({ node: { color } }) =>
          color ? <DefaultNode fill={color} /> : <CustomNodeComponent />
        }
        linkComponent={({ link: { source, target, dashed } }) => (
          <line
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            strokeWidth={2}
            stroke="#999"
            strokeOpacity={0.6}
            strokeDasharray={dashed ? "8,4" : undefined}
          />
        )}
      />
    </svg>
  );
}
