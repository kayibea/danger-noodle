import Vector2 from 'lib/Vector2';

export const keyMap: Record<string, Vector2> = {
  ArrowUp: Vector2.up,
  w: Vector2.up,
  W: Vector2.up,
  z: Vector2.up, // for AZERTY
  Z: Vector2.up,

  ArrowDown: Vector2.down,
  s: Vector2.down,
  S: Vector2.down,

  ArrowLeft: Vector2.left,
  a: Vector2.left,
  A: Vector2.left,
  q: Vector2.left, // for AZERTY
  Q: Vector2.left,

  ArrowRight: Vector2.right,
  d: Vector2.right,
  D: Vector2.right,
};
