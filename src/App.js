import React, { useEffect, useState } from "react";

const HEX_SIZE = 40;

function axialToPixel(q, r) {
  const x = HEX_SIZE * 1.5 * q;
  const y = HEX_SIZE * Math.sqrt(3) * (r + q / 2);
  return { x, y };
}

function getHexPoints(x, y) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 6 + (Math.PI / 3) * i; // 30° offset for flat-top
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
    <>
      <polygon
        points={points}
        fill={data.color || "#ccc"}
        stroke="#333"
        strokeWidth="1"
        onClick={() => onClick(q, r)}
      />
      <text x={x} y={y + 5} fontSize="10" textAnchor="middle" fill="#000">
        {data.type}
      </text>
    </>
  );
}

export default function HexGrid() {
  const rows = 5;
  const cols = 5;
  const hexes = [];

  const terrainTypes = [
    { type: "plains", color: "#aaf" },
    { type: "forest", color: "#228B22" },
    { type: "mountain", color: "#808080" },
    { type: "desert", color: "#EDC9Af" },
    { type: "water", color: "#1E90FF" },
  ];

  for (let r = -rows / 2; r < rows / 2; r++) {
    for (let q = -cols / 2; q < cols / 2; q++) {
      const randomTerrain = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
      hexes.push({
        q,
        r,
        ...randomTerrain,
      });
    }
  }

  const handleHexClick = (q, r) => {
    const hex = hexes.find(h => h.q === q && h.r === r);
    alert(`Hex at q=${q}, r=${r}\nTerrain: ${hex.type}`);
  };

  const gridWidth = HEX_SIZE * 1.5 * (cols - 1) + HEX_SIZE;
  const gridHeight = HEX_SIZE * Math.sqrt(3) * (rows + 0.5);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${windowSize.width} ${windowSize.height}`} style={{ backgroundColor: "#f0f0f0" }}>
      <g transform={`translate(${windowSize.width / 2 - gridWidth / 2}, ${windowSize.height / 2 - gridHeight / 2})`}>
        {hexes.map((hex, i) => (
          <Hex key={i} q={hex.q} r={hex.r} data={hex} onClick={handleHexClick} />
        ))}
      </g>
    </svg>
  );
}
