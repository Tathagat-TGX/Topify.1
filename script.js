console.log("Welcome to Topify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songs = [
    { songName: "", filePath: "./songs/1.mp3", coverPath: "cover1.jpg" },
    { songName: "Tere Liye", filePath: "./songs/2.mp3", coverPath: "cover2.jpg" },
    { songName: "Maari Local Theme", filePath: "./songs/3.mp3", coverPath: "cover3.jpg" },
    { songName: "Angaaron", filePath: "./songs/4.mp3", coverPath: "cover4.jpg" },
    { songName: "Moriya Re", filePath: "./songs/5.mp3", coverPath: "cover5.jpg" },
    { songName: "Maya Bazzar", filePath: "./songs/6.mp3", coverPath: "cover6.jpg" },
    { songName: "Maroon Color Saree", filePath: "./songs/7.mp3", coverPath: "cover7.jpg" },
    { songName: "Tere Mote Mote Nain", filePath: "./songs/8.mp3", coverPath: "cover8.jpg" },
    { songName: "Hathi lebe Ghoda le", filePath: "./songs/9.mp3", coverPath: "cover9.jpg" },
    { songName: "Hind Ke Sitara", filePath: "./songs/10.mp3", coverPath: "cover10.jpg" },
];

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        let clickedSongIndex = parseInt(e.target.id);
        if (songIndex === clickedSongIndex) {
            if (audioElement.paused) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            }
        } else {
            makeAllPlays();
            songIndex = clickedSongIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    });
});

// Play next song when current song ends
audioElement.addEventListener('ended', () => {
    // Increment songIndex or loop back to the first song
    songIndex = (songIndex + 1) % songs.length;
    playSelectedSong();
});

// Forward and Backward functionality
document.querySelector('.fa-forward-step').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSelectedSong();
});

document.querySelector('.fa-backward-step').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSelectedSong();
});

const playSelectedSong = () => {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
};

const updateSongInfo = () => {
    document.querySelector('.songInfo img').src = songs[songIndex].coverPath;
    document.querySelector('.songInfo').innerHTML = `${songs[songIndex].songName}`;
};

// Initial song info update
updateSongInfo();
