import RGBA from 'lib/RGBA';
import Vector2 from 'lib/Vector2';
import { keyMap } from 'game/constants/keyMap';
import type { Point } from 'game/types/game';

export default class Snake {
  public readonly direction: Vector2;
  public readonly body: Vector2[];
  public readonly headColor: string;
  public readonly bodyColor: string;
  private moveIntvl: number;
  private lastMoveTime: number;
  private readonly inputQueue: Vector2[];
  private readonly inputListenerFn: (e: KeyboardEvent) => void;

  public constructor(pos: Point) {
    const color = new RGBA(4, 129, 81);
    this.headColor = color.toString();
    this.bodyColor = color.alpha(0.5).toString();

    this.inputQueue = [];
    this.moveIntvl = 130;
    this.lastMoveTime = 0;
    this.direction = new Vector2(0, 0);
    this.body = [];
    this.body.push(new Vector2(pos.x, pos.y));

    this.inputListenerFn = this.inputListener.bind(this);
  }

  private canMove(): boolean {
    return this.lastMoveTime >= this.moveIntvl;
  }

  private move(): void {
    this.body.unshift(this.head.add(this.direction));
    this.body.pop();
    this.lastMoveTime = 0;
  }

  public grow(): void {
    const lastSeg = this.body.at(-1)!;
    this.body.push(lastSeg.sub(this.direction));
  }

  private handleDirection(): void {
    const nextDir = this.dequeueDirection();
    if (nextDir && !nextDir.equals(this.direction.mul(-1))) {
      this.direction.x = nextDir.x;
      this.direction.y = nextDir.y;
    }
  }

  public get head(): Vector2 {
    return this.body[0];
  }

  public update(dt: number): void {
    this.lastMoveTime += dt;

    if (this.canMove()) {
      this.handleDirection();
      this.move();
    }
  }

  public didBiteItself(): boolean {
    const head = this.head;
    for (let i = 1; i < this.body.length; i++) {
      const seg = this.body[i];
      if (head.equals(seg)) return true;
    }

    return false;
  }

  private keyToDirection(key: string): Vector2 | null {
    return keyMap[key] ?? null;
  }

  private dequeueDirection(): Vector2 | null {
    while (this.inputQueue.length > 0) {
      const dir = this.inputQueue.shift()!;
      if (dir && !dir.equals(this.direction) && !dir.equals(this.direction.mul(-1))) {
        return dir;
      }
    }
    return null;
  }

  private inputListener(e: KeyboardEvent): void {
    // console.log(e.key);
    const dir = this.keyToDirection(e.key);
    if (dir) this.inputQueue.push(dir);
  }

  public removeListeners(): void {
    window.removeEventListener('keydown', this.inputListenerFn);
  }

  public setupListeners(): void {
    this.removeListeners();
    window.addEventListener('keydown', this.inputListenerFn);
  }
}
