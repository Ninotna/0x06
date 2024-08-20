// utils/videoControls.js

export function setupVideoEventHandlers(videoElement) {
    if (!videoElement) return;

    document.addEventListener('keydown', (event) => {
        // Priorité aux contrôles vidéo si la vidéo est en cours de lecture
        if (document.activeElement === videoElement || videoElement.classList.contains('playing')) {
            switch (event.key) {
                case ' ':
                case 'Spacebar': // Pour les anciens navigateurs
                    event.preventDefault();
                    togglePlayPause(videoElement);
                    break;
                case 'm':
                    toggleMute(videoElement);
                    break;
                case 'ArrowUp':
                    increaseVolume(videoElement);
                    break;
                case 'ArrowDown':
                    decreaseVolume(videoElement);
                    break;
                case 'f':
                    toggleFullscreen(videoElement);
                    break;
                default:
                    break;
            }
        }
    });
}

function togglePlayPause(videoElement) {
    if (videoElement.paused) {
        videoElement.play();
        videoElement.classList.add('playing');
    } else {
        videoElement.pause();
        videoElement.classList.remove('playing');
    }
}

function toggleMute(videoElement) {
    videoElement.muted = !videoElement.muted;
}

function increaseVolume(videoElement) {
    videoElement.volume = Math.min(videoElement.volume + 0.1, 1);
}

function decreaseVolume(videoElement) {
    videoElement.volume = Math.max(videoElement.volume - 0.1, 0);
}

function toggleFullscreen(videoElement) {
    if (!document.fullscreenElement) {
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
