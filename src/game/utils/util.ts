import type { Point, Grid } from 'game/types/game';

export const manhattan = (a: Point, b: Point): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export const isOutOfBounds = (p: Point, maxW: number, maxH: number): boolean =>
  p.x < 0 || p.y < 0 || p.x >= maxW || p.y >= maxH;

export const neighborsOf = ({ x, y }: Point): Point[] => [
  { x: x + 1, y },
  { x: x - 1, y },
  { x, y: y + 1 },
  { x, y: y - 1 },
];

export const countDanger = (grid: Grid, point: Point, maxW: number, maxH: number): number => {
  let danger = 0;

  for (const p of neighborsOf(point)) {
    if (isOutOfBounds(p, maxW, maxH) || grid[p.y][p.x] !== 0) {
      danger++;
    }
    // if (isOutOfBounds(p, maxW, maxH) || grid[p.y][p.x] === 1 || grid[p.y][p.x] === -1) {
    //   danger++;
    // }
  }

  return danger;
};

export const floodFillArea = (grid: Grid, start: Point, maxW: number, maxH: number, maxSteps = 100): number => {
  const visited = new Set<string>();
  const queue: Point[] = [start];
  let count = 0;

  while (queue.length && count < maxSteps) {
    const { x, y } = queue.shift()!;
    const key = `${x},${y}`;
    if (visited.has(key)) continue;

    visited.add(key);
    count++;

    for (const p of neighborsOf({ x, y })) {
      const neighborKey = `${p.x},${p.y}`;
      if (!isOutOfBounds(p, maxW, maxH) && grid[p.y][p.x] === 0 && !visited.has(neighborKey)) {
        queue.push(p);
      }
    }
  }

  return count;
};

export const getFoodSpawn = (grid: Grid, snake: Point[], maxW: number, maxH: number): Point => {
  const head = snake[0];
  const freeCells: Point[] = [];

  for (let y = 0; y < maxH; y++) {
    for (let x = 0; x < maxW; x++) {
      if (grid[y][x] === 0) freeCells.push({ x, y });
    }
  }

  let bestScore = -Infinity;
  let bestCells: Point[] = [];

  for (const cell of freeCells) {
    const dist = manhattan(head, cell);
    const area = floodFillArea(grid, cell, maxW, maxH, 20); // limit area scan
    const danger = countDanger(grid, cell, maxW, maxH);

    const len = snake.length;
    const score = -dist * (len < 10 ? 10 : 3) + area * 5 - danger * 10;

    if (score > bestScore) {
      bestScore = score;
      bestCells = [cell];
    } else if (score === bestScore) {
      bestCells.push(cell);
    }
  }

  return bestCells[Math.floor(Math.random() * bestCells.length)];
};
