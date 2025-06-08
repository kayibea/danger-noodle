export default class RGBA {
  public readonly r: number;
  public readonly g: number;
  public readonly b: number;
  public readonly a: number;

  public constructor(red = 0, green = 0, blue = 0, alpha = 1) {
    this.r = red;
    this.g = green;
    this.b = blue;
    this.a = alpha;
  }

  public alpha(a: number): RGBA {
    return new RGBA(this.r, this.g, this.b, a);
  }

  public toString(): string {
    return `rgba(${[this.r, this.g, this.b, this.a].join(',')})`;
  }
}
