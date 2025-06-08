<script lang="ts">
  import { uiState } from 'stores/ui.svelte';

  // Dummy local settings — replace with a proper store later
  let music = true;
  let sfx = true;
  let darkMode = true;

  function toggleMusic() {
    music = !music;
    console.log('Music:', music);
  }

  function toggleSFX() {
    sfx = !sfx;
    console.log('SFX:', sfx);
  }

  function toggleDarkMode() {
    darkMode = !darkMode;
    console.log('Dark Mode:', darkMode);
  }

  function goBack() {
    uiState.currentScreen = 'menu';
  }
</script>

<div class="settings">
  <div class="title">🛠️ Settings</div>

  <div class="setting-list">
    <div class="setting">
      <span>🎵 Music</span>
      <button onclick={toggleMusic} class:active={music}>{music ? 'On' : 'Off'}</button>
    </div>

    <div class="setting">
      <span>🔊 Sound FX</span>
      <button onclick={toggleSFX} class:active={sfx}>{sfx ? 'On' : 'Off'}</button>
    </div>

    <div class="setting">
      <span>🌙 Dark Mode</span>
      <button onclick={toggleDarkMode} class:active={darkMode}>{darkMode ? 'On' : 'Off'}</button>
    </div>
  </div>

  <button class="back" onclick={goBack}>← Back</button>
</div>

<style>
  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap);
    padding: var(--padding);
    min-height: 100vh;
    background: var(--bg-gradient);
    color: var(--color-fg);
    font-family: var(--font-ui);
    text-align: center;
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--fs-hero);
    margin-top: var(--gap);
  }

  .setting-list {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    margin-top: var(--gap);
    width: 100%;
    max-width: 400px;
    flex-grow: 1;
    justify-content: center;
  }

  .setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-bg-alt);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
  }

  .setting span {
    font-size: var(--fs-large);
    font-weight: 600;
  }

  .setting button {
    background: #222;
    color: white;
    border: 1px solid var(--border-color);
    padding: 0.4rem 1rem;
    border-radius: 3px;
    cursor: pointer;
    font-family: var(--font-ui);
    transition:
      background var(--transition-fast),
      border-color var(--transition-fast);
  }

  .setting button.active {
    background: #4caf50;
    border-color: #6fe86f;
  }

  .setting button:hover {
    background: #333;
    border-color: var(--border-color-hover);
  }

  .back {
    margin-top: auto;
    background: transparent;
    border: none;
    color: var(--color-muted);
    font-size: var(--fs-small);
    cursor: pointer;
  }

  .back:hover {
    color: var(--color-fg);
  }
</style>
