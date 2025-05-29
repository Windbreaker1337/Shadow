const player = document.getElementById('myPlayer');
const buttons = document.querySelectorAll('.playSound');

const tracksArr = Array.from(buttons).map(button => {
    const match = button.getAttribute('onclick')?.match(/['"]([^'"]+)['"]/);
    return {
        url: match ? match[1] : '',
        element: button
    };
});

let count = 0;

player.addEventListener('ended', nextTrack);

function playSound(url) {
    const index = tracksArr.findIndex(track => track.url === url);
    if (index !== -1) {
        count = index;
        player.src = url;
        player.play(); 
    }
}

function nextTrack() {
    count = (count + 1) % tracksArr.length;
    player.src = tracksArr[count].url;
    player.play(); 
}

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const match = btn.getAttribute('onclick')?.match(/['"]([^'"]+)['"]/);
        const url = match ? match[1] : '';
        if (url) {playSound(url)} ;
        btn.classList.add('pause');
        btn.classList.remove('play');

        btn.addEventListener('click' , () => { 
            if(btn.classList.contains('pause')){ 
                btn.classList.remove('pause');
                btn.classList.add('play');
                player.pause();
            }else if( btn.classList.contains('play')){ 
                btn.classList.remove('play');
                btn.classList.add('pause');
                player.play();
            }
        })
    })
})

const ribbonBtn = document.getElementById('ribbon');
const chatsBtn = document.getElementById('chats');
const calls = document.getElementById('calls');
const friends = document.getElementById('friends');
const music = document.getElementById('music');

ribbonBtn.addEventListener('click' , () => { 
    window.location.href = 'ribbon.html'
})  

chatsBtn.addEventListener('click' , () => { 
    window.location.href = 'chats.html'
})

calls.addEventListener('click' , () => { 
    window.location.href = 'calls.html'
})

friends.addEventListener('click' , () => { 
    window.location.href = 'friends.html'
})

music.addEventListener('click' , () => { 
    window.location.href = 'music.html'
})