import type { GameModeId } from 'game/constants/gameModes';

type GameRecords = { modeId: GameModeId; scores: number[] }[];
export const gameRecords: GameRecords = $state([]);
