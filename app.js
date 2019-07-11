const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('video');

  // length of the outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);

  // Sounds
  const sounds = document.querySelectorAll('.sound-picker button');

  //Time Display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  const timeReset = document.querySelector('.time-reset');

  // default duration
  let duration = 120;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Sound picker
  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  })

  //Play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  // Time selection
  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      duration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(duration / 60)}:0${Math.floor(duration % 60)}`
    })
  })

  //function to play and stop sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = '/svg/play.svg';
    }
  };

  //animating circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = duration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    //progress bar
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //text
    timeDisplay.textContent = `${minutes<10 ? minutes = '0' + minutes: minutes}:${seconds<10? seconds='0'+ seconds: seconds}`;



    if (currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg'
      video.pause();
    }
  };
};





app();