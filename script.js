console.log("welcome to Jumanji!");

// initialize variables
let songIndex = 0;
let audioElement = new Audio("/assets/warriyo_mortals.mp3");
let masterPlayBtn = document.getElementById("masterPlayBtnId");
let songProgressBar = document.getElementById("songProgressBar");
let songPlayerGif = document.getElementById("songPlayerGifId");
let songPlayBtns = Array.from(
  document.getElementsByClassName("songPlayBtn_onList")
);
let previousTractBtn = document.getElementById("previousTractBtnId");
let nextTractBtn = document.getElementById("nextTractBtnId");
let currSongCoverImage = document.getElementById("currSongCoverImageId");
let masterSongTitle = document.getElementById("masterSongTitleId");
let songPlayedTime = document.getElementById("songPlayedTimeId");
let songDurationTime = document.getElementById("songDurationTimeId");

// audioElement.play();

const songList = [
  {
    songName: "Mortal",
    songPath: "/assets/songs/0.mp3",
    songCover: "/assets/covers/0.png",
  },
  {
    songName: "Heroes Tonight",
    songPath: "/assets/songs/1.mp3",
    songCover: "/assets/covers/1.jpg",
  },
  {
    songName: "Why We Lose",
    songPath: "/assets/songs/2.mp3",
    songCover: "/assets/covers/2.jpg",
  },
  {
    songName: "Light It Up",
    songPath: "/assets/songs/3.mp3",
    songCover: "/assets/covers/3.jpg",
  },
  {
    songName: "Entropy",
    songPath: "/assets/songs/4.mp3",
    songCover: "/assets/covers/4.jpg",
  },
  {
    songName: "Royalty",
    songPath: "/assets/songs/5.mp3",
    songCover: "/assets/covers/5.png",
  },
];

// Listen to events

// play or pause song
masterPlayBtn.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlayBtn.classList.remove("fa-circle-play");
    masterPlayBtn.classList.add("fa-circle-pause");
    songPlayerGif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlayBtn.classList.remove("fa-circle-pause");
    masterPlayBtn.classList.add("fa-circle-play");
    songPlayerGif.style.opacity = 0;
  }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

const cbTimeUpdate = () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  songProgressBar.value = progress;

  //   current time update
  songPlayedTime.innerText = formatTime(parseInt(audioElement.currentTime));
  //  duration update
  songDurationTime.innerText = formatTime(parseInt(audioElement.duration));
};

audioElement.addEventListener("timeupdate", cbTimeUpdate);

songProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (songProgressBar.value * audioElement.duration) / 100;
});

songPlayBtns.forEach((songBtn) => {
  songBtn.addEventListener("click", () => {
    startSong(songBtn.id);
    makeAllSongsPlayBtnVisible();
    songBtn.classList.remove("fa-circle-play");
    songBtn.classList.add("fa-circle-pause");
  });
});

const startSong = (songId) => {
  audioElement.pause();
  audioElement = new Audio(songList[songId].songPath);
  audioElement.addEventListener("timeupdate", cbTimeUpdate);
  masterPlayBtn.click();
  songIndex = songId;

  // set song cover
  currSongCoverImage.src = songList[songId].songCover;

  // set song title
  masterSongTitle.innerText = songList[songId].songName;
};

previousTractBtn.addEventListener("click", () => {
  if (songIndex > 0) {
    --songIndex;
  } else {
    songIndex = songList.length - 1;
  }
  startSong(songIndex);
});

nextTractBtn.addEventListener("click", () => {
  if (songIndex < songList.length - 1) {
    ++songIndex;
  } else {
    songIndex = 0;
  }
  startSong(songIndex);
});

const makeAllSongsPlayBtnVisible = () => {
  songPlayBtns.forEach((songBtn) => {
    songBtn.classList.remove("fa-circle-pause");
    songBtn.classList.add("fa-circle-play");
  });
};
