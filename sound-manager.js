class SoundManager {
    constructor() {
        this.sounds = {
            cheer: document.getElementById('cheerSound'),
            whistle: document.getElementById('whistleSound'),
            touchdown: document.getElementById('touchdownSound'),
            victory: document.getElementById('victorySound'),
            firstDown: document.getElementById('firstDownSound')
        };
        this.muted = false;
    }

    play(soundName) {
        if (this.muted || !this.sounds[soundName]) return;
        
        // Stop any currently playing sounds
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });

        // Play the new sound
        this.sounds[soundName].play().catch(error => {
            console.log('Error playing sound:', error);
        });
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    preloadSounds() {
        Object.values(this.sounds).forEach(sound => {
            sound.load();
        });
    }
}