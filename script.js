const audio = document.getElementById('scareAudio');
const screen = document.getElementById('screen');
const gate = document.getElementById('gate');
const startButton = document.getElementById('startButton');
let audioReady = false;
let opened = false;

function markAudioReady() {
  audioReady = true;
  startButton.disabled = false;
}

function openSite() {
  if (opened) return;
  opened = true;
  screen.classList.remove('is-locked');
  gate.hidden = true;
}

audio.addEventListener('canplay', markAudioReady, { once: true });
audio.addEventListener('playing', openSite, { once: true });
audio.addEventListener('error', () => {
  if (!opened) startButton.disabled = true;
});

startButton.addEventListener('click', () => {
  if (!audioReady || opened) return;
  startButton.disabled = true;
  const playback = audio.play();
  if (playback && typeof playback.catch === 'function') {
    playback.catch(() => {
      startButton.disabled = false;
    });
  }
});

if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) markAudioReady();
