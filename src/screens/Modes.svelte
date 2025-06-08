<script lang="ts">
  import { uiState } from 'stores/ui.svelte';
  import { gameState } from 'stores/game.svelte';
  import { gameModes as modes, type GameModeId } from 'game/constants/gameModes';

  let page = 0;
  const perPage = 4;
  const totalPages = Math.ceil(modes.length / perPage);

  function pagedModes() {
    return modes.slice(page * perPage, (page + 1) * perPage);
  }

  function nextPage() {
    page = (page + 1) % totalPages;
  }

  function prevPage() {
    page = (page - 1 + totalPages) % totalPages;
  }

  function selectMode(modeId: GameModeId) {
    console.log(`Selected mode: ${modeId}`);
    gameState.currentModeId = modeId;
    uiState.currentScreen = 'game';
  }

  function goBack() {
    uiState.currentScreen = 'menu';
  }
</script>

<div class="modes">
  <div class="title">Select Game Mode</div>

  <div class="mode-list">
    {#each pagedModes() as mode}
      <button class="mode" onclick={() => selectMode(mode.id)}>
        <div class="label">{mode.label}</div>
        <div class="desc">{mode.description}</div>
      </button>
    {/each}
  </div>

  <div class="nav">
    <button class="nav-btn" onclick={prevPage}>←</button>
    <span class="page-indicator">{page + 1} / {totalPages}</span>
    <button class="nav-btn" onclick={nextPage}>→</button>
  </div>

  <button class="back" onclick={goBack}>← Back</button>
</div>

<style>
  .modes {
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

  .mode-list {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
    max-width: 400px;
    flex-grow: 1;
    justify-content: center;
  }

  .mode {
    background: var(--color-bg-alt);
    color: var(--color-fg);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    cursor: pointer;
    text-align: left;
    transition:
      background var(--transition-fast),
      border-color var(--transition-fast);
  }

  .mode:hover {
    border-color: var(--border-color-hover);
    background-color: #222;
  }

  .label {
    font-size: var(--fs-large);
    font-weight: 700;
    margin-bottom: 0.3rem;
  }

  .desc {
    font-size: var(--fs-small);
    color: var(--color-muted);
  }

  .nav {
    display: flex;
    align-items: center;
    gap: var(--gap);
    margin-top: auto;
  }

  .nav-btn {
    background: transparent;
    border: none;
    color: var(--color-fg);
    font-size: var(--fs-large);
    cursor: pointer;
    padding: 0.2rem 0.6rem;
  }

  .nav-btn:hover {
    color: var(--color-accent, white);
  }

  .page-indicator {
    font-size: var(--fs-small);
    color: var(--color-muted);
  }

  .back {
    margin-top: var(--gap);
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
