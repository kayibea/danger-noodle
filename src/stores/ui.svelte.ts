import type { ScreenId } from 'constants/screens';

export type UIState = {
  currentScreen: ScreenId;
  isMusicEnabled: boolean;
  isSfxEnabled: boolean;
};

export const uiState: UIState = $state({
  isDarkMode: true,
  isMusicEnabled: true,
  isSfxEnabled: true,
  currentScreen: 'splash',
});
