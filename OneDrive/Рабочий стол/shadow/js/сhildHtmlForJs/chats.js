const btnChoiceforChat = document.querySelectorAll('.btnChoiceforChat');
const chat = document.querySelector('.chat');

const user = {
    user1: {
        username: 'ghost',
        password: 'WewR23',
        email: 'HbGxZ@example.com'
    },
    user2: {
        username: 'shadow',
        password: 'ShadowPass123',
        email: 'shadow@example.com'
    },
    user3: {
        username: 'admin',
        password: 'AdminSecure1',
        email: 'admin@example.com'
    },
    user4: {
        username: 'user123',
        password: 'UserPass456',
        email: 'user123@example.com'
    },
    user5: {
        username: 'coolguy',
        password: 'CoolGuyPass7',
        email: 'coolguy@example.com'
    },
    user6: {
        username: 'tester',
        password: 'Test1234',
        email: 'tester@example.com'
    }
};

btnChoiceforChat.forEach(btn => {
    btn.addEventListener('click', () => {
        const findUser = Object.values(user).find(u => u.username.toLowerCase() === btn.textContent.trim().toLowerCase());

        if (!findUser) return;

        const existingChatWindow = document.querySelector('.modal .chat-window');
        if (existingChatWindow) {
            existingChatWindow.remove();
        }

        const chatWindow = document.createElement('div');
        chatWindow.classList.add('chat-window');

        const title = document.createElement('h3');
        title.textContent = `Chat with ${findUser.username}`;

        const messCont = document.createElement('div');
        messCont.classList.add('messages');

        const form = document.createElement('form');
        form.classList.add('chat-form');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your message';

        const sendBtn = document.createElement('button');
        sendBtn.type = 'submit';
        sendBtn.textContent = 'Send';

        form.appendChild(input);
        form.appendChild(sendBtn);
        chatWindow.appendChild(title);
        chatWindow.appendChild(messCont);
        chatWindow.appendChild(form);

        const modal = document.querySelector('.modal');
        modal.innerHTML = '';
        modal.appendChild(chatWindow);

        const storedMessages = JSON.parse(localStorage.getItem(`chat_${findUser.username}`)) || [];

        storedMessages.forEach(msg => {
            const messDiv = document.createElement('div');
            messDiv.classList.add('message', msg.sender === 'me' ? 'my-message' : 'their-message');
            messDiv.textContent = msg.text
            messCont.appendChild(messDiv);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const messText = input.value.trim();

            if (!messText) return;

            const messDiv = document.createElement('div');
            messDiv.classList.add('message', 'my-message');
            messDiv.textContent = messText

            messCont.appendChild(messDiv);
            input.value = '';
            messCont.scrollTop = messCont.scrollHeight;

            const messages = JSON.parse(localStorage.getItem(`chat_${findUser.username}`)) || [];
            messages.push({ sender: 'me', text: messText })
            localStorage.setItem(`chat_${findUser.username}`, JSON.stringify(messages));

            setTimeout(() => {
                const reply = document.createElement('div');
                reply.classList.add('message', 'their-message');
                reply.textContent = `Привет, ${findUser.username} здесь!`;
                messCont.appendChild(reply);
                
                const updatedMessages = JSON.parse(localStorage.getItem(`chat_${findUser.username}`)) || [];
                updatedMessages.push({ sender: 'them', text: reply.textContent });
                localStorage.setItem(`chat_${findUser.username}`, JSON.stringify(updatedMessages));
            }, 1000);
        });
    });
});

document.getElementById('disabeplace').addEventListener('click', () => {
    const rightMenu = document.querySelector('.rightMenu');
    rightMenu.remove();
});

const ribbon = document.getElementById('ribbon');
const chats = document.getElementById('chats');
const calls = document.getElementById('calls');
const friends = document.getElementById('friends');
const music = document.getElementById('music');

ribbon.addEventListener('click', () => {
    window.location.href = 'ribbon.html';
});

chats.addEventListener('click', () => {
    window.location.href = 'chats.html';
});

calls.addEventListener('click', () => {
    window.location.href = '/html/404Found.html';
});

friends.addEventListener('click', () => {
    window.location.href = 'friends.html';
});

music.addEventListener('click', () => {
    window.location.href = 'music.html';
});