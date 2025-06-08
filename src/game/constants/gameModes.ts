export const gameModes = [
  { id: 'classic', label: 'Classic Mode', description: 'Just you and the noodle. Pure scoring.' },
  { id: 'wallless', label: 'No Walls', description: 'Bounce off edges instead of dying.' },
  { id: 'crazyspeed', label: 'Crazy Speed', description: 'Fast as hell. Git gud.' },
  { id: 'inverted', label: 'Inverted Controls', description: 'You hate yourself? Play this.' },
  { id: 'chaos', label: 'Chaos', description: 'Random speeds, direction flips, enjoy pain.' },
  { id: 'blink', label: 'Blink', description: 'Snake disappears every few seconds.' },
  { id: 'ghost', label: 'Ghost Noodle', description: "Invisible tail until it's too late." },
] as const;

/* 
IDEAS:
* Inverted snake: start long and shrink as you eat food
* You are the food running away from the snake
*/

export type GameModeId = (typeof gameModes)[number]['id'];
