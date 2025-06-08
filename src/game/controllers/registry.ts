import type { GameModeId } from 'game/constants/gameModes';
import type { IGameController } from './AbstractController';
import type { GameControllerConstructor } from './AbstractController';

type Registry = Record<GameModeId, () => Promise<GameControllerConstructor>>;

const registry: Partial<Registry> = {
  classic: async () => {
    const module = await import('./ClassicController');
    return module.default;
  },
  wallless: async () => {
    const module = await import('./ClassicController');
    return module.default;
  },
};

export async function instantiateController(
  modeId: GameModeId,
  canvas: HTMLCanvasElement,
): Promise<IGameController | null> {
  const factory = registry[modeId];
  //   if (!factory) throw new Error(`Unknown game mode: ${modeId}`);
  if (!factory) return null;
  return new (await factory())(canvas);
}
