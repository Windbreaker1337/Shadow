document.addEventListener('DOMContentLoaded', () => {
    const ribbon = document.getElementById('ribbon');
    const chats = document.getElementById('chats');
    const calls = document.getElementById('calls');
    const friends = document.getElementById('friends');
    const music = document.getElementById('music');

    ribbon.addEventListener('click', () => {
        window.location.href = 'ribbon.html'
    })

    chats.addEventListener('click', () => {
        window.location.href = 'chats.html'
    })

    calls.addEventListener('click', () => {
        window.location.href = '/html/404Found.html'
    })

    friends.addEventListener('click', () => {
        window.location.href = 'friends.html'
    })

    music.addEventListener('click', () => {
        window.location.href = 'music.html'
    })

    const closeRightMenu = document.getElementById('closerightmenu');

    closeRightMenu.addEventListener('click', () => {
        document.querySelector('.rightmenu').style.display = 'none'
    })

    const photoGallery = document.querySelectorAll('.photoGallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let count = 0;

    function updateLightBox() {
        lightboxImg.src = photoGallery[count].src;
        lightboxImg.alt = photoGallery[count].alt;
    }

    photoGallery.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            count = index;
            lightbox.style.display = 'block';
            updateLightBox();
        })
    })

    nextBtn.addEventListener('click', () => {
        count = (count + 1) % photoGallery.length;
        updateLightBox();
    })

    prevBtn.addEventListener('click', () => {
        count = (count - 1 + photoGallery.length) % photoGallery.length;
        updateLightBox();
    })

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    })

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                count = (count + 1) % photoGallery.length;
                updateLightBox();
            }
            if (e.key === 'ArrowLeft') {
                count = (count - 1 + photoGallery.length) % photoGallery.length;
                updateLightBox();
            }
        }
    })

    const closedata = document.getElementById('closedata');

    closedata.addEventListener('click', () => {
        window.location.href = '/html/index.html'
    })

    let nn = localStorage.getItem('ShadowTime');
    if (!nn) {
        const now = new Date();
        nn = now.toISOString();
        localStorage.setItem('ShadowTime', nn);
    }

    const todayDate = new Date(nn);
    const time = document.getElementById('time');

    function updateDate() {
        const now = new Date();
        let diffSec = Math.floor((now - todayDate) / 1000);

        const years = Math.floor(diffSec / 31536000);
        diffSec %= 31536000;

        const months = Math.floor(diffSec / 2592000);
        diffSec %= 2592000;

        const days = Math.floor(diffSec / 86400);
        diffSec %= 86400;

        const hours = Math.floor(diffSec / 3600);

        let result = 'Время с shadow: ';

        if (years > 0) result += `${years} ${declOfNum(years, ['год', 'года', 'лет'])}, `;
        if (months > 0) result += `${months} ${declOfNum(months, ['месяц', 'месяца', 'месяцев'])}, `;
        if (days > 0) result += `${days} ${declOfNum(days, ['день', 'дня', 'дней'])}, `;
        if (hours > 0 || (years === 0 && months === 0 && days === 0)) {
            result += `${hours} ${declOfNum(hours, ['час', 'часа', 'часов'])}`;
        }

        result = result.replace(/,\s*$/, '');

        time.textContent = result;
    }

    function declOfNum(number, titles) {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    updateDate();
    setInterval(updateDate, 60 * 1000);


    const choiceMusic = document.getElementById('choiceMusic');
    const closeChoiceMusic = document.getElementById('closeChoice');
    const modalMusic = document.getElementById('modalMusic');
    const player = document.getElementById('myPlayer');
    const playSoundBtn = document.querySelectorAll('.playSound');
    let countMusic = 0;
    const tracsArr = Array.from(playSoundBtn).map(btn => {
        const match = btn.getAttribute('onclick')?.match(/['"]([^'"]+)['"]/);
        return {
            url: match ? match[1] : '',
            element: btn
        };
    })

    choiceMusic.addEventListener('click', () => {
        modalMusic.style.display = 'block';
    })
    closeChoiceMusic.addEventListener('click', () => {
        modalMusic.style.display = 'none';
    })

    function playSound(url) {
        const index = tracsArr.findIndex(track => track.url === url);
        if (index !== -1) {
            countMusic = index;
            player.src = url;
            player.play();
            playSoundBtn.forEach(btn => {
                btn.classList.remove('pause')
                btn.classList.add('play')
            })

        }
    }

    playSoundBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const match = btn.getAttribute('onclick')?.match(/['"]([^'"]+)['"]/);
            const url = match ? match[1] : '';
            if (url) { playSound(url) };
            btn.classList.add('pause');
            btn.classList.remove('play');
        })
    })

    player.addEventListener('ended', () => {
        countMusic = (countMusic + 1) % tracsArr.length;
        playSound(tracsArr[countMusic].url);
    })

    document.addEventListener('keydown', (e) => {
        const key = e.code || e.key;

        if (key === 'MediaTrackNext' || key === 'MediaFastForward') {
            e.preventDefault()
            countMusic = (countMusic + 1) % tracsArr.length;
            playSound(tracsArr[countMusic].url);
        }
        if (key === 'MediaTrackPrevious' || key === 'MediaRewind') {
            e.preventDefault();
            countMusic = (countMusic - 1 + tracsArr.length) % tracsArr.length;
            playSound(tracsArr[countMusic].url);
        }

        if (key === 'MediaPlayPause') {
            e.preventDefault();
            if (!player.paused) {
                player.pause();
                playSoundBtn.forEach(btn => {
                    btn.classList.remove('pause');
                    btn.classList.add('play');
                });
            } else {
                player.play();
                playSoundBtn.forEach(btn => {
                    btn.classList.remove('play');
                    btn.classList.add('pause');
                });
            }
        }
    })


})