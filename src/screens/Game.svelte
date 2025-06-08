<script lang="ts">
  import GameLoop from 'game/core/GameLoop';
  import { uiState } from 'stores/ui.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { gameState } from 'stores/game.svelte';
  import { gameModes } from 'game/constants/gameModes';
  import { instantiateController } from 'game/controllers/registry';
  import type { IGameController } from 'game/controllers/AbstractController';

  let canvas: HTMLCanvasElement;
  let gameLoop: GameLoop;
  let controller: IGameController;

  let paused = $state(true);
  let resumeTimer = $state(0);
  let countingDown = $derived(resumeTimer > 0);
  let countdownInterval: number | null = null;
  let gameMode = gameModes.find((mode) => mode.id === gameState.currentModeId)!;
  const currentModeId = gameState.currentModeId;

  function goBack() {
    uiState.currentScreen = 'menu';
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function togglePause() {
    if (paused) {
      startResumeCountdown();
    } else {
      pauseGame();
    }
  }

  function pauseGame() {
    paused = true;
    resumeTimer = 0;
    clearCountdown();
    gameLoop.stop();
  }

  function startResumeCountdown() {
    if (countdownInterval) clearCountdown();

    paused = false;
    resumeTimer = 3;

    countdownInterval = window.setInterval(() => {
      resumeTimer--;
      if (resumeTimer <= 0) {
        clearCountdown();
        gameLoop.start();
      }
    }, 1000);
  }

  function clearCountdown() {
    if (countdownInterval) {
      window.clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  onMount(async () => {
    resizeCanvas();

    controller = (await instantiateController(currentModeId, canvas))!;
    if (!gameMode || !controller) {
      console.error(`Invalid game mode id (${currentModeId}) or to be implemented !`);
      uiState.currentScreen = 'menu';
      return;
    }
    gameLoop = new GameLoop(controller);

    controller.setupListeners();
    window.addEventListener('resize', resizeCanvas);

    togglePause();
  });

  onDestroy(() => {
    if (controller) controller.removeListeners();
    window.removeEventListener('resize', resizeCanvas);
  });
</script>

<div class="game-wrapper">
  <canvas bind:this={canvas} class="game-canvas"></canvas>

  <div class="hud">
    <div class="top-bar">
      <div class="left">
        <div class="mode-label">{gameMode.label}</div>
        <div class="score">Score: {gameState.score}</div>
      </div>

      <div class="right">
        <button onclick={togglePause}>{paused ? 'Resume' : 'Pause'}</button>
        <button onclick={goBack}>Exit</button>
      </div>
    </div>

    {#if countingDown}
      <div class="pause-overlay">
        <div class="pause-box">
          <div class="pause-title">{resumeTimer}</div>
        </div>
      </div>
    {/if}

    {#if paused && !countingDown}
      <div class="pause-overlay">
        <div class="pause-box">
          <div class="pause-title">Paused</div>
          <div class="pause-tip">Press resume to continue</div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .game-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    margin: auto;
    overflow: hidden;
    background: var(--bg-gradient);

    /* border: 1px solid green; */
  }

  .game-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: black; */
    background-color: #181818;
    display: block;
  }

  .hud {
    position: absolute;
    inset: 0;
    pointer-events: none;
    color: var(--color-fg);
    font-family: var(--font-ui);
    z-index: 10;
    opacity: 0.05;
    transition: opacity 0.3s ease-in-out 1s;
  }

  .hud:hover {
    opacity: 1;
    transition-delay: 0s;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    pointer-events: auto;
    /* background-color: red; */
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .mode-label {
    font-size: var(--fs-small);
    color: var(--color-muted);
  }

  .score {
    font-size: var(--fs-large);
    font-weight: bold;
  }

  .right button {
    margin-left: 1rem;
    padding: 0.4rem 1rem;
    background: #222;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-family: var(--font-ui);
    font-size: var(--fs-small);
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition:
      background 0.2s,
      border-color 0.2s;
  }

  .right button:hover {
    background: #333;
    border-color: var(--border-color-hover);
  }

  .pause-overlay {
    position: absolute;
    inset: 0;
    /* user-select: none; */
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
    /* background-color: red; */
  }

  .pause-box {
    pointer-events: auto; /* enable clicks inside the box */

    background: #111;
    padding: 2rem 3rem;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    text-align: center;
  }

  .pause-title {
    font-size: var(--fs-hero);
    font-family: var(--font-display);
    margin-bottom: 0.5rem;
  }

  .pause-tip {
    font-size: var(--fs-small);
    color: var(--color-muted);
  }
</style>
