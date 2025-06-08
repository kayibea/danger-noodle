import type { GameModeId } from 'game/constants/gameModes';

type GameState = {
  score: number;
  isGameOver: boolean;
  currentModeId: GameModeId;
};

export const gameState: GameState = $state({
  score: 0,
  isGameOver: false,
  currentModeId: 'classic',
});
