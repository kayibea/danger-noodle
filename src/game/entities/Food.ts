import Vector2 from 'lib/Vector2';
import RGBA from 'lib/RGBA';
import { rgbaRegex } from 'constants/regex';
import type { Point } from 'game/types/game';

export default class Food {
  private color: string;

  constructor(public readonly position: Vector2) {
    this.color = new RGBA(0, 0, 0).toString();
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    if (!rgbaRegex.test(color)) {
      console.error(`Could not set food color, invalid color. (${color})`);
      return;
    }

    this.color = color;
  }

  public setPosition(pos: Point): void {
    this.position.x = pos.x;
    this.position.y = pos.y;
  }
}
