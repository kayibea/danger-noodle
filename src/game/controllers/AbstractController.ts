import Vector2 from 'lib/Vector2';
import PerfMon from 'lib/PerfMon';
import Food from 'game/entities/Food';
import Snake from 'game/entities/Snake';
import { getFoodSpawn } from 'game/utils/util';
import type { Grid, Point } from 'game/types/game';

export interface IGameController {
  render(): void;
  update(dt: number): void;
  setupListeners(): void;
  removeListeners(): void;
}

export type GameControllerConstructor = new (canvas: HTMLCanvasElement) => IGameController;

export default abstract class AbstractController implements IGameController {
  public static readonly TARGET_CELL_SIZE = 10;
  protected readonly perfM: PerfMon;
  protected readonly cols: number;
  protected readonly rows: number;
  protected readonly cellW: number;
  protected readonly cellH: number;
  protected readonly snake: Snake;
  protected ctx?: CanvasRenderingContext2D;
  protected maxFoodSpawn: number;
  protected readonly foods: Food[];

  public constructor(protected readonly canvas: HTMLCanvasElement) {
    this.cols = Math.floor(canvas.width / AbstractController.TARGET_CELL_SIZE);
    this.rows = Math.floor(canvas.height / AbstractController.TARGET_CELL_SIZE);
    this.cellW = canvas.width / this.cols;
    this.cellH = canvas.height / this.rows;
    this.perfM = new PerfMon();
    this.snake = new Snake();
    this.foods = [];
    this.maxFoodSpawn = 1;

    this.setupCanvasRenderingContext2D();
  }

  public abstract render(): void;
  public abstract update(dt: number): void;
  public abstract setupListeners(): void;
  public abstract removeListeners(): void;

  protected didSnakeChomp(): boolean {
    const index = this.foods.findIndex(({ position: pos }) => pos.equals(this.snake.head));
    if (index !== -1) {
      this.foods.splice(index, 1);
      return true;
    }
    return false;
  }

  private spawnFood(pos: Point): void {
    const food = new Food(new Vector2(pos.x, pos.y));
    food.setColor(this.snake.headColor);
    this.foods.push(food);
  }

  protected spawnFoods(): void {
    const grid: Grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    for (const segm of this.snake.body) {
      grid[segm.y][segm.x] = 1;
    }

    for (const food of this.foods) {
      const pos = food.position;
      grid[pos.y][pos.x] = 1;
    }

    for (let i = 0; i <= this.maxFoodSpawn - this.foods.length; i++) {
      const spawn = getFoodSpawn(grid, this.snake.body, this.cols, this.rows);
      grid[spawn.y][spawn.x] = 1;
      this.spawnFood(spawn);
    }
  }

  protected drawFoods(ctx: CanvasRenderingContext2D): void {
    for (const food of this.foods) {
      ctx.fillStyle = food.getColor();
      const pos = food.position;
      ctx.fillRect(pos.x * this.cellW, pos.y * this.cellH, this.cellW, this.cellH);
    }
  }

  protected drawSnake(ctx: CanvasRenderingContext2D): void {
    const head = this.snake.head;

    ctx.fillStyle = this.snake.headColor;
    ctx.beginPath();
    ctx.rect(head.x * this.cellW, head.y * this.cellH, this.cellW, this.cellH);
    ctx.fill();

    ctx.fillStyle = this.snake.bodyColor;
    ctx.beginPath();
    for (const segment of this.snake.body) {
      ctx.rect(segment.x * this.cellW, segment.y * this.cellH, this.cellW, this.cellH);
    }
    ctx.fill();
  }

  protected drawGrid(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = '#e0e0e0';
    ctx.beginPath();

    for (let col = 0; col <= this.cols; col++) {
      const x = col * this.cellW;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.rows * this.cellH);
    }

    for (let row = 0; row <= this.rows; row++) {
      const y = row * this.cellH;
      ctx.moveTo(0, y);
      ctx.lineTo(this.cols * this.cellW, y);
    }

    ctx.stroke();
  }

  private setupCanvasRenderingContext2D(): void {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get CanvasRenderingContext2D !');
    }
    this.ctx = ctx;
  }
}
