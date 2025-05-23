import React from "react";

const HEX_SIZE = 40;
const WIDTH = HEX_SIZE * Math.sqrt(3);
const HEIGHT = HEX_SIZE * 1.5;

function axialToPixel(q, r) {
  const x = HEX_SIZE * Math.sqrt(3) * (q + r / 2);
  const y = HEX_SIZE * 1.5 * r;
  return { x, y };
}

function getHexPoints(x, y) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = x + HEX_SIZE * Math.cos(angle);
    const py = y + HEX_SIZE * Math.sin(angle);
    points.push(`${px},${py}`);
  }
  return points.join(" ");
}

function Hex({ q, r, data, onClick }) {
  const { x, y } = axialToPixel(q, r);
  const points = getHexPoints(x, y);
  return (
    <polygon
      points={points}
      fill={data.color || "#ccc"}
      stroke="#333"
      strokeWidth="1"
      onClick={() => onClick(q, r)}
    />
  );
}

export default function HexGrid() {
  const rows = 10;
  const cols = 10;
  const hexes = [];

  for (let q = -cols / 2; q < cols / 2; q++) {
    for (let r = -rows / 2; r < rows / 2; r++) {
      hexes.push({ q, r, color: "#aaf" });
    }
  }

  const handleHexClick = (q, r) => {
    alert(`Clicked hex at q=${q}, r=${r}`);
  };

  return (
    <svg width="100%" height="100vh" style={{ backgroundColor: "#f0f0f0" }}>
      {hexes.map((hex, i) => (
        <Hex key={i} q={hex.q} r={hex.r} data={hex} onClick={handleHexClick} />
      ))}
    </svg>
  );
}
