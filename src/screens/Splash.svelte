<script lang="ts">
  import { onMount } from 'svelte';
  import { uiState } from 'stores/ui.svelte';

  let timer: number;
  let elapsed = 0;
  let loading = $state(true);

  onMount(() => {
    timer = window.setInterval(() => {
      elapsed += 100;
      if (elapsed >= 1000) {
        loading = false;
        clearInterval(timer);
      }
    }, 100);

    return () => window.clearInterval(timer);
  });

  function skip() {
    if (loading) return;
    uiState.currentScreen = 'menu';
  }
</script>

<button type="button" onclick={skip} class="splash" tabindex="0">
  <div class="title">🐍 Danger Noodle</div>
  <div class="subtext">loading neural impulses...</div>
  <div class="loading">{loading ? 'please wait' : 'click anywhere !'}</div>
</button>

<style>
  .splash {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: var(--bg-gradient);
    color: var(--color-fg);
    font-family: var(--font-ui);
    text-align: center;
    border: none;
    cursor: pointer;
    gap: var(--gap);
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--fs-hero);
    margin-bottom: var(--gap);
  }

  .subtext {
    font-size: var(--fs-base);
    color: var(--color-muted);
  }

  .loading {
    font-size: var(--fs-small);
    margin-top: var(--gap);
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
</style>
