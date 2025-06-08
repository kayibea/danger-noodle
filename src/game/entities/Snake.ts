import RGBA from 'lib/RGBA';
import Vector2 from 'lib/Vector2';
import { keyMap } from 'game/constants/keyMap';

export default class Snake {
  public readonly direction: Vector2;
  private readonly _body: Vector2[];
  public readonly headColor: string;
  public readonly bodyColor: string;
  private moveIntvl: number;
  private lastMoveTime: number;
  private readonly inputQueue: Vector2[];
  private readonly inputListenerFn: (e: KeyboardEvent) => void;

  public constructor() {
    const color = new RGBA(4, 129, 81);
    this.headColor = color.toString();
    this.bodyColor = color.alpha(0.5).toString();
    this._body = [];
    this._body.push(new Vector2(0, 0));
    this._body.push(new Vector2(0, 0).add(Vector2.right));

    //TODO: Comment/Remove this test only code
    // for (let i = 0; i < 30; i++) {
    //   const last = this._body[this._body.length - 1];
    //   this._body.push(last.sub(Vector2.right));
    // }

    this.inputQueue = [];
    this.moveIntvl = 30;
    this.lastMoveTime = 0;
    this.direction = Vector2.right;

    this.inputListenerFn = this.inputListener.bind(this);
  }

  private canMove(): boolean {
    return this.lastMoveTime > this.moveIntvl;
  }

  private move(): void {
    this._body.unshift(this.head.add(this.direction));
    this._body.pop();
    this.lastMoveTime = 0;
  }

  public grow(): void {
    const lastSeg = this._body.at(-1)!;
    this._body.push(lastSeg.sub(this.direction));
  }

  private handleDirection(): void {
    const nextDir = this.dequeueDirection();
    if (nextDir && !nextDir.equals(this.direction.mul(-1))) {
      this.direction.x = nextDir.x;
      this.direction.y = nextDir.y;
    }
  }

  public get head(): Vector2 {
    return this._body[0];
  }

  public get body(): Vector2[] {
    return this._body.slice(1);
  }

  public update(dt: number): void {
    this.lastMoveTime += dt;

    if (this.canMove()) {
      this.move();
      this.handleDirection();
    }
  }

  public didSnakeBiteIself(): boolean {
    return this.body.some((segment) => this.head.equals(segment));
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
