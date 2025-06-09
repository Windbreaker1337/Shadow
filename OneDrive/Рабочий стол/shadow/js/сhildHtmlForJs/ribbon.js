const btnIndicat = document.getElementById('buttonIndicat')
const divForm = document.getElementById('formContainer');

btnIndicat.addEventListener('click' , () => { 
    divForm.style.display = 'flex';
})

const btnCloseForm = document.getElementById('closeForm');

function closeFormRib() { 
    divForm.style.display = 'none'
}

btnCloseForm.addEventListener('click' , () => { 
    closeFormRib();
})

window.addEventListener('keyup' , (e) => { 
    if(e.key === 'Escape'){ 
        closeFormRib();
    }
})

const form = document.getElementById('buildRibbon');

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
    window.location.href = '/html/404Found.html'
})

friends.addEventListener('click' , () => { 
    window.location.href = 'friends.html'
})

music.addEventListener('click' , () => { 
    window.location.href = 'music.html'
})