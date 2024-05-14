const audioPlayer = document.getElementById('audioPlayer');
const trackInfo = document.getElementById('trackInfo');

let mp3Files = [];  // Array to store MP3 URLs
let playedIndices = [];  // Array to store already played indices

// Shuffle the array so that each file is played once before repetition
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to load and play the next track
async function playNextTrack() {
    if (mp3Files.length === 0) {
        try {
            const response = await fetch('load.json');
            const data = await response.json();
            mp3Files = shuffleArray(data.mp3s.slice());
        } catch (error) {
            console.error('Error loading MP3 files:', error);
            return;
        }
    }

    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * mp3Files.length);
    } while (playedIndices.includes(nextIndex))

    audioPlayer.src = mp3Files[nextIndex];
    trackInfo.textContent = 'Now playing: ' + mp3Files[nextIndex];

    playedIndices.push(nextIndex);

    audioPlayer.play();  // Play the current track

    // Add event listener for the end of the track to play the next track
    audioPlayer.addEventListener('ended', playNextTrack);
}

// Add an event listener to play the first track when the play button is clicked
document.getElementById('playButton').addEventListener('click', playNextTrack);