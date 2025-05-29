
const closeRightMenuBtn = document.getElementById('closeRightMenu');

closeRightMenuBtn.addEventListener('click', () => {
    const div = document.querySelector('.rightmenu');

    div.style.display = 'none';
})

const users = [
    { username: 'ghost', password: 'WewR23', email: 'HbGxZ@example.com' },
    { username: 'shadow', password: 'ShadowPass123', email: 'shadow@example.com' },
    { username: 'admin', password: 'AdminSecure1', email: 'admin@example.com' },
    { username: 'user123', password: 'UserPass456', email: 'user123@example.com' },
    { username: 'coolguy', password: 'CoolGuyPass7', email: 'coolguy@example.com' },
    { username: 'tester', password: 'Test1234', email: 'tester@example.com' }
];

const searchFreindBtn = document.getElementById('searchFreind');
const inpSearchFreind = document.getElementById('inpSearchFreind');
const result = document.querySelector('.result');

searchFreindBtn.addEventListener('click', () => {
    result.innerHTML = ' ';
    const error = document.querySelector('.error')
    error.textContent = ' ';

    const inpValue = inpSearchFreind.value.trim()

    const userNames = users.find(user => user.username.toLowerCase() === inpValue.toLowerCase())

    if (inpValue.length < 1) {
        error.textContent = 'Имя слишком короткое';
        return;
    }
    if (!userNames) {
        error.textContent = 'Пользователь не найден';
        return;
    }

    result.innerHTML = ` 
        <p>${userNames.username}</p>
        <button id='addFriend'>Добавить в друзья</button>
        `
})

const closeSearchBtn = document.getElementById('closeSearch');
const searchFreind = document.querySelector('.searchFreind');
const openSearchBtn = document.getElementById('openSearch');

closeSearchBtn.addEventListener('click', () => {
    result.style.display = 'none';
    searchFreind.style.display = 'none';
    closeSearchBtn.style.display = 'none';
    openSearchBtn.style.display = 'flex'
})

openSearchBtn.addEventListener('click', () => {
    result.style.display = 'flex';
    searchFreind.style.display = 'flex';
    closeSearchBtn.style.display = 'flex';
    openSearchBtn.style.display = 'none'
})

const friendList = document.getElementById('friendList');
let dataFriendList = JSON.parse(localStorage.getItem('friends')) || [];


document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'addFriend') {
        const username = result.querySelector('p').textContent.trim();

        if (!dataFriendList.includes(username)) {
            dataFriendList.push(username);
            const li = document.createElement('li');
            li.textContent = username;
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('removeFriend');
            removeBtn.textContent = 'Удалить';
            li.appendChild(removeBtn);
            friendList.appendChild(li);
            result.innerHTML = ` `;
            saveFrnd();
        } else {
            alert('Пользователь уже добавлен в друзья');
        }
    }

    if (e.target && e.target.classList.contains('removeFriend')) {
        const li = e.target.parentElement;
        const username = li.firstChild.textContent.trim();
        const index = dataFriendList.indexOf(username);
        if (index > -1) {
            dataFriendList.splice(index, 1);
        }
        li.remove();
        saveFrnd();
    }
})

const saveFrnd = () => localStorage.setItem('friends', JSON.stringify(dataFriendList));

dataFriendList.forEach(username => {
    const li = document.createElement('li');
    li.textContent = username;
    li.innerHTML += '<button class="removeFriend">Удалить</button>';
    friendList.appendChild(li);
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