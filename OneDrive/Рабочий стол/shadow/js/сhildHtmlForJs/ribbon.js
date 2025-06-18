const btnIndicat = document.getElementById('buttonIndicat');
const divForm = document.getElementById('formContainer');

btnIndicat.addEventListener('click', () => {
    divForm.style.display = 'flex';
})

const btnCloseForm = document.getElementById('closeForm');

function closeFormRib() {
    divForm.style.display = 'none'
}

btnCloseForm.addEventListener('click', () => {
    closeFormRib();
})

window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        closeFormRib();
    }
})

const form = document.getElementById('buildRibbon');

const ribbonBtn = document.getElementById('ribbon');
const chatsBtn = document.getElementById('chats');
const calls = document.getElementById('calls');
const friends = document.getElementById('friends');
const music = document.getElementById('music');

ribbonBtn.addEventListener('click', () => {
    window.location.href = 'ribbon.html'
})

chatsBtn.addEventListener('click', () => {
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

const addNewsBtn = document.getElementById('addNews');
const modalNews = document.getElementById('modalNews');

addNewsBtn.addEventListener('click', () => {
    modalNews.style.display = 'flex'
})

document.getElementById('closeAddNews').addEventListener('click', () => {
    modalNews.style.display = 'none'
})

document.getElementById('confirmAddNews').addEventListener('click', () => {
    const inpNameNews = document.getElementById('inpNameNews');
    const descripitionInp = document.getElementById('descripitionInp');

    const title = inpNameNews.value.trim();
    const description = descripitionInp.value.trim();

    if (!title || !description) {
        alert("Заполните оба поля!");
        return;
    }

    const newDiv = document.createElement('div');
    newDiv.classList.add('News');

    const newH3 = document.createElement('h3');
    newH3.textContent = title;
    newDiv.appendChild(newH3);

    const chunkSize = 50;

    for (let i = 0; i < description.length; i += chunkSize) {
        const chunk = description.substring(i, i + chunkSize);
        const newP = document.createElement('p');
        newP.textContent = chunk;
        newDiv.appendChild(newP);
    }

    const newsContainer = document.getElementById('newsContainer');
    const noNews = document.querySelector('.noNews');

    if (noNews) {
        newsContainer.removeChild(noNews);
    }

    newsContainer.appendChild(newDiv);

    const newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    newsList.push({ title, description });
    localStorage.setItem('newsList', JSON.stringify(newsList));

    inpNameNews.value = '';
    descripitionInp.value = '';
})

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('newsContainer');
    const newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    const noNews = document.querySelector('.noNews');

    if (newsList.length > 0 && noNews) {
        newsContainer.removeChild(noNews);
    }

    if (newsList.length === 0) {
        if (!noNews) {
            const emptyMessage = document.createElement('p');
            emptyMessage.classList.add('noNews');
            emptyMessage.textContent = 'Здесь пока нет новостей.';
            newsContainer.appendChild(emptyMessage);
        }
        return;
    }

    newsList.forEach(newsItem => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('News');

        const newH3 = document.createElement('h3');
        newH3.textContent = newsItem.title;
        newDiv.appendChild(newH3);

        const descriptionText = newsItem.description;
        const chunkSize = 50;

        for (let i = 0; i < descriptionText.length; i += chunkSize) {
            const chunk = descriptionText.substring(i, i + chunkSize);
            const newP = document.createElement('p');
            newP.textContent = chunk;
            newDiv.appendChild(newP);
        }

        newsContainer.appendChild(newDiv);
    })
})

const choiceMusic = document.getElementById('choiceMusic');
const modalMusic = document.getElementById('modalMusic');
const closeMusic = document.getElementById('closeMusic');

choiceMusic.addEventListener('click', () => {
    modalMusic.style.display = 'flex';
});

closeMusic.addEventListener('click', () => {
    modalMusic.style.display = 'none';
});

const myPlayer = document.getElementById('myPlayer');
const btns = document.querySelectorAll('.playSound');

let trackArr = [];
let countTrack = 0;

btns.forEach(btn => {
    const match = btn.getAttribute('onclick')?.match(/['"]([^'"]+)['"]/);
    if (match && match[1]) {
        trackArr.push({
            url: match[1],
            element: btn
        })
    }
})

function playSound(url) {
    btns.forEach(b => b.classList.remove('play', 'pause'));
    const index = trackArr.findIndex(track => track.url === url);
    if (index !== -1) {
        countTrack = index;
        myPlayer.src = url;
        myPlayer.play();
        trackArr[index].element.classList.add('play');
    }
}

function pauseSound() {
    myPlayer.pause();
    btns.forEach(b => {
        b.classList.remove('play');
        b.classList.add('pause');
    })
}

function resumeSound() {
    myPlayer.play();
    btns.forEach(b => {
        b.classList.remove('pause');
        b.classList.add('play');
    })
}

function stopCurrentTrack() {
    myPlayer.pause();
    myPlayer.currentTime = 0;
    btns.forEach(b => b.classList.remove('play', 'pause'));
}

myPlayer.addEventListener('ended', () => {
    countTrack = (countTrack + 1) % trackArr.length;
    stopCurrentTrack();
    playSound(trackArr[countTrack].url);
})

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const match = btn.getAttribute('onclick')?.match(/['"]([^'"]+)['"]/);
        if (!match || !match[1]) return;

        const url = match[1];
        const isSameTrack = myPlayer.src === url;
        const isPlaying = !myPlayer.paused;

        if (isSameTrack && isPlaying) {
            pauseSound();
        } else if (isSameTrack && !isPlaying) {
            resumeSound();
        } else {
            stopCurrentTrack();
            playSound(url);
        }
    })
})

document.addEventListener('keydown' , (e) => { 
    const key = e.key || e.code ; 

    if (key === 'MediaTrackNext' || key === 'MediaFastForward') { 
        e.preventDefault();
        countTrack = (countTrack + 1) % trackArr.length ; 
        playSound(trackArr[countTrack].url)
    } 

    if (key === 'MediaTrackPrevious' || key === 'MediaRewind') { 
        e.preventDefault();
        countTrack = (countTrack - 1) % trackArr.length; 
        playSound(trackArr[countTrack].url)
    }
})