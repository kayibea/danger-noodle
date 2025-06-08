// import Vector2 from 'lib/Vector2';
// import Snake from 'game/entities/Snake';
import { gameState } from 'stores/game.svelte';
import BaseController from './AbstractController';

export default class ClassicController extends BaseController {
  constructor(protected readonly canvas: HTMLCanvasElement) {
    super(canvas);

    console.log(this.cols, this.rows);
    this.spawnFoods();

    // TODO: Remove this code
    // setInterval(() => {
    //   this.foods.pop();
    //   this.spawnFoods();
    // }, 3000);
  }

  public update(dt: number): void {
    this.snake.update(dt);
    this.perfM.update(dt);

    if (this.snake.didBiteItself()) {
      gameState.isGameOver = true;
    }

    if (this.didChomp()) {
      gameState.score += 1;
      this.spawnFoods();
      this.snake.grow();
    }
  }

  public render(): void {
    this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawFoods(this.ctx!);
    this.drawSnake(this.ctx!);
    // this.perfM.draw(this.ctx!);
  }

  public setupListeners(): void {
    this.snake.setupListeners();
  }

  public removeListeners(): void {
    this.snake.removeListeners();
  }
}
