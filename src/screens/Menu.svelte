<script lang="ts">
  import { uiState } from 'stores/ui.svelte';
  import type { ScreenId } from 'constants/screens';

  function open(screenId: ScreenId): void {
    uiState.currentScreen = screenId;
  }
</script>

<div class="menu">
  <div class="title">🐍 Danger Noodle</div>

  <button class="menu-item" onclick={() => open('modes')}>Play</button>
  <button class="menu-item" onclick={() => open('records')}>Records</button>
  <button class="menu-item" onclick={() => open('settings')}>Settings</button>
  <button class="menu-item" onclick={() => open('splash')}>Exit</button>
</div>

<style>
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--gap);
    height: 100vh;
    background: var(--bg-gradient);
    color: var(--color-fg);
    font-family: var(--font-ui);
    text-align: center;
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--fs-hero);
    margin-bottom: calc(var(--gap) * 1.5);
  }

  .menu-item {
    padding: 0.6rem 1.4rem;
    background-color: var(--color-bg-alt);
    color: var(--color-fg);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: var(--fs-base);
    font-family: var(--font-ui);
    cursor: pointer;
    transition:
      background var(--transition-fast),
      border-color var(--transition-fast);
  }

  .menu-item:hover {
    background-color: #222;
    border-color: var(--border-color-hover);
  }
</style>
