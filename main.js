const modalProf = document.getElementById('modalWindProf');
const modalMusic = document.getElementById('modalMusic');
const imgProf = document.getElementById('profile');
const choiceMusicBtn = document.getElementById('choiceMusic');
const closeMusicBtn = document.getElementById('closeMusic');
const closeProfBtn = document.getElementById('closeProf');
const player = document.getElementById('myPlayer');


choiceMusicBtn.addEventListener('click', () => { 
    modalMusic.style.display = 'flex'; 
});

imgProf.addEventListener('click', () => { 
    modalProf.style.display = 'flex';
});

closeMusicBtn.addEventListener('click', () => { 
    modalMusic.style.display = 'none';
});

closeProfBtn.addEventListener('click', () => { 
    modalProf.style.display = 'none';
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        modalMusic.style.display = 'none';
        modalProf.style.display = 'none';
    }
});

window.addEventListener('click', (e) => {
    if (!modalMusic.contains(e.target) && !choiceMusicBtn.contains(e.target)) {
        modalMusic.style.display = 'none';
    }
    if (!modalProf.contains(e.target) && !imgProf.contains(e.target)) {
        modalProf.style.display = 'none';
    }
});

function playSound(url) { 
    player.src = url ; 
    player.play()
}