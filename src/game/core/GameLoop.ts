import type { IGameController } from 'game/controllers/AbstractController';

export default class GameLoop {
  private lastTimestamp = 0;
  private animationFrameId?: number;
  private readonly loopFn: (timestamp: number) => void;

  public constructor(private readonly handler: IGameController) {
    this.loopFn = this.loop.bind(this);
  }

  public start(): void {
    this.lastTimestamp = 0;
    this.animationFrameId = window.requestAnimationFrame(this.loopFn);
  }

  public stop(): void {
    if (!this.animationFrameId) return;
    window.cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = undefined;
  }

  private loop(timestamp: number): void {
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;

    const dt = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.handler.update(dt);
    this.handler.render();

    this.animationFrameId = window.requestAnimationFrame(this.loopFn);
  }
}
