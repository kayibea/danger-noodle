import type { IGameController } from 'game/controllers/AbstractController';

export default class GameLoop {
  private lastTimestamp = 0;
  private accumulated = 0;
  private animationFrameId?: number;
  private readonly loopFn: (timestamp: number) => void;

  // 60 FPS = 1000 / 60 ≈ 16.6667ms
  private readonly FRAME_DURATION = 1000 / 60;

  public constructor(private readonly handler: IGameController) {
    this.loopFn = this.loop.bind(this);
  }

  public start(): void {
    this.lastTimestamp = 0;
    this.accumulated = 0;
    this.animationFrameId = window.requestAnimationFrame(this.loopFn);
  }

  public stop(): void {
    if (this.animationFrameId !== undefined) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
  }

  private loop(timestamp: number): void {
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }

    let delta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // Clamp large deltas (e.g., on tab switch)
    if (delta > 1000) delta = this.FRAME_DURATION;

    this.accumulated += delta;

    while (this.accumulated >= this.FRAME_DURATION) {
      this.handler.update(this.FRAME_DURATION);
      this.accumulated -= this.FRAME_DURATION;
    }

    this.handler.render();

    this.animationFrameId = window.requestAnimationFrame(this.loopFn);
  }
}
