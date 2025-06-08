<script lang="ts">
  import { uiState } from 'stores/ui.svelte';
  import { gameState } from 'stores/game.svelte';
  import { gameRecords } from 'stores/records.svelte';
  import { gameModes, type GameModeId } from 'game/constants/gameModes';

  const defaultScores = [1200, 950, 870, 600, 420];

  function getScores(modeId: GameModeId): number[] {
    const record = gameRecords.find((r) => r.modeId === modeId);
    return record?.scores ?? defaultScores;
  }

  const currentMode = gameState.currentModeId;
  function back() {
    uiState.currentScreen = 'menu';
  }
</script>

<div class="scores-screen">
  <div class="title">🏆 Best Scores</div>

  <div class="scores-modes">
    {#each gameModes as mode}
      <div class="mode-block {mode.id === currentMode ? 'active' : ''}">
        <h2 class="mode-title">{mode.label}</h2>
        <ul class="scores-list">
          {#each getScores(mode.id) as score, i}
            <li>
              <span class="rank">#{i + 1}</span>
              <span class="score">{score}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <button onclick={back}>Back</button>
</div>

<style>
  .scores-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: var(--bg-gradient);
    color: var(--color-fg);
    font-family: var(--font-ui);
    padding: 2rem;
  }

  .title {
    font-size: var(--fs-hero);
    margin-bottom: 2rem;
    font-family: var(--font-display);
  }

  .scores-modes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 960px;
    flex: 1;
    overflow: auto;
    padding: 0 1rem;
  }

  .mode-block {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    transition:
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .mode-block.active {
    border-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.06);
  }

  .mode-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    text-align: center;
    font-weight: 600;
  }

  .scores-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .scores-list li {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .rank {
    color: var(--color-muted);
    width: 2rem;
  }

  .score {
    font-weight: bold;
    text-align: right;
    flex: 1;
  }

  button {
    margin-top: 2rem;
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
    font-family: var(--font-ui);
    background: transparent;
    border: 2px solid var(--border-color);
    color: var(--color-fg);
    border-radius: var(--border-radius);
    cursor: pointer;
  }

  button:hover {
    border-color: var(--border-color-hover);
  }
</style>
