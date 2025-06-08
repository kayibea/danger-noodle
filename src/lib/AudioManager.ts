export default class AudioManager {
  private static instance: AudioManager;
  private readonly sfx: HTMLAudioElement[];
  private readonly music: HTMLAudioElement[];

  private constructor() {
    this.sfx = [];
    this.music = [];
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }

    return AudioManager.instance;
  }
}
