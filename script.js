const songs = [
    { title: "Love Story", artist: "Indila", src: "song1.mp3" },
    { title: "Absent Haven", artist: "Pianza", src: "song2.mp3" },
    { title: "In The End-Cover", artist: "Hernandz", src: "song3.mp3" }
];

let currentSongIndex = 0;
const audio = new Audio();
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("artist-name");
const playPauseBtn = document.getElementById("play-pause");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeBar = document.getElementById("volume-bar");
const playlistList = document.getElementById("playlist-list");

function loadSong(index) {
    const song = songs[index];
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    audio.src = song.src;
    highlightPlaylist();
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
    } else {
        audio.pause();
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return `${minutes}:${secs}`;
}

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
});


audio.addEventListener("ended", () => {
    nextSong();
});

function renderPlaylist() {
    playlistList.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audio.play();
            playIcon.classList.remove("fa-play");
            playIcon.classList.add("fa-pause");
        });
        playlistList.appendChild(li);
    });
}

function highlightPlaylist() {
    const items = playlistList.querySelectorAll("li");
    items.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

loadSong(currentSongIndex);
renderPlaylist(); 