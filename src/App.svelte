<script lang="ts">
  import { uiState } from 'stores/ui.svelte';
  import Splash from './screens/Splash.svelte';
  import Menu from './screens/Menu.svelte';
  import Game from './screens/Game.svelte';
  import Settings from './screens/Settings.svelte';
  import Modes from './screens/Modes.svelte';
  import Records from './screens/Records.svelte';
  import type { ScreenId } from 'constants/screens';

  function screenComponent(name: ScreenId) {
    switch (name) {
      case 'splash':
        return Splash;
      case 'menu':
        return Menu;
      case 'modes':
        return Modes;
      case 'game':
        return Game;
      case 'records':
        return Records;
      case 'settings':
        return Settings;
      default:
        return Menu;
    }
  }
</script>

<svelte:component this={screenComponent(uiState.currentScreen)} />
