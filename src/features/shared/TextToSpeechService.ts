/**
 * Text-to-Speech Service for Japanese pronunciation
 * Uses the Web Speech API with Japanese language support
 */

export class TextToSpeechService {
  private synth: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  /**
   * Speak Japanese text
   * @param text - Japanese text to speak (hiragana, katakana, or kanji)
   * @param rate - Speech rate (0.5 to 2.0, default: 1.0)
   */
  public speak(text: string, rate: number = 1.0): void {
    // Cancel any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP"; // Set language to Japanese
    utterance.rate = Math.min(Math.max(rate, 0.5), 2.0); // Clamp rate between 0.5 and 2.0

    // Apply selected voice if available
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onstart = () => {
      this.isPlaying = true;
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      this.isPlaying = false;
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Stop speaking
   */
  public stop(): void {
    this.synth.cancel();
    this.isPlaying = false;
    this.currentUtterance = null;
  }

  /**
   * Pause speech (if supported)
   */
  public pause(): void {
    if (this.synth.paused) {
      this.synth.resume();
    } else {
      this.synth.pause();
    }
  }

  /**
   * Check if speech is currently playing
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Get available voices
   */
  public getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  /**
   * Get Japanese voices if available
   */
  public getJapaneseVoices(): SpeechSynthesisVoice[] {
    return this.getVoices().filter((voice) => voice.lang.startsWith("ja"));
  }

  /**
   * Get female Japanese voices
   */
  public getFemaleJapaneseVoices(): SpeechSynthesisVoice[] {
    const japaneseVoices = this.getJapaneseVoices();

    // First, try to find voices with female indicators
    const femaleVoices = japaneseVoices.filter((voice) => {
      const name = voice.name.toLowerCase();
      return (
        name.includes("female") ||
        name.includes("woman") ||
        name.includes("female young") ||
        name.includes("young woman") ||
        name.includes("女性") || // Japanese: female
        name.includes("女") // Japanese: woman
      );
    });

    // If no female voices found, return all Japanese voices as fallback
    if (femaleVoices.length === 0) {
      console.warn("No female voices found, returning all Japanese voices");
      return japaneseVoices;
    }

    return femaleVoices;
  }

  /**
   * Get available voice options with names
   */
  public getVoiceOptions(): Array<{
    index: number;
    name: string;
    voice: SpeechSynthesisVoice;
  }> {
    return this.getFemaleJapaneseVoices().map((voice, index) => ({
      index,
      name: voice.name,
      voice,
    }));
  }

  /**
   * Set specific voice by voice object
   */
  public setVoice(voice: SpeechSynthesisVoice): void {
    this.selectedVoice = voice;
    if (this.currentUtterance) {
      this.currentUtterance.voice = voice;
    }
  }

  /**
   * Set specific voice by index
   */
  public setVoiceByIndex(voiceIndex: number): void {
    const voices = this.getFemaleJapaneseVoices();
    if (voiceIndex >= 0 && voiceIndex < voices.length) {
      this.setVoice(voices[voiceIndex]);
    }
  }

  /**
   * Get currently selected voice
   */
  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }
}

// Export singleton instance
export const ttsService = new TextToSpeechService();
