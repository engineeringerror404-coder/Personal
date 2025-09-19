document.addEventListener('DOMContentLoaded', () => {
    const candle = document.getElementById('candle');
    const birthdaySong = document.getElementById('birthday-song');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextButton = document.getElementById('next-button');
    let isPlaying = false;

    if (candle) {
        candle.addEventListener('click', () => {
            const flame = candle.querySelector('.flame');
            if (flame) {
                flame.style.display = 'none';
            }
            const instruction = document.querySelector('.instruction');
            if (instruction) {
                instruction.textContent = "Make a wish! Now let's celebrate.";
            }
            if(nextButton) {
                nextButton.style.opacity = '1';
                nextButton.style.pointerEvents = 'auto';
            }
        });
    }

    if (playPauseBtn && birthdaySong) {
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                birthdaySong.pause();
                playPauseBtn.textContent = 'Play Song';
            } else {
                birthdaySong.play();
                playPauseBtn.textContent = 'Pause Song';
            }
            isPlaying = !isPlaying;
        });

        birthdaySong.addEventListener('ended', () => {
             playPauseBtn.textContent = 'Play Song';
             isPlaying = false;
        });
    }
});

