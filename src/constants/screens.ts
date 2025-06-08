export const screensIds = ['splash', 'menu', 'game', 'settings', 'modes', 'records'] as const;
export type ScreenId = (typeof screensIds)[number];
