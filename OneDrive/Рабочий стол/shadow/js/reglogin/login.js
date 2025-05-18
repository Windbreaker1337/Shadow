const form = document.getElementById('myForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const errorUsername = document.querySelector('.errorUsername');
const errorPass = document.querySelector('.errorPass');
const btn = document.getElementById('login');

const db = { 
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

form.addEventListener('submit' , (e) => { 
    e.preventDefault() ; 

    const isUsernameTrue = Object.values(db).some(user => user.username.toLowerCase() === username.value.trim().toLowerCase()); 
    const isPasswordTrue = Object.values(db).some(user => user.password.toLowerCase() === password.value.trim().toLowerCase()); 
    if(isUsernameTrue && isPasswordTrue){ 
        window.location.href = '/html/childHtmlMarckups/ribbon.html'
    }

    if(!isPasswordTrue && !isUsernameTrue){ 
        errorPass.textContent = ' Возможно пользователь не зарегистрирован';
        errorUsername.textContent = ' Возможно пользователь не зарегистрирован';
    }

    if(!isPasswordTrue){ 
        errorPass.textContent = ' Неверный пароль';
        errorUsername.textContent = '';
    }
    if(!isUsernameTrue){ 
        errorUsername.textContent = ' Неверное имя пользователя';
        errorPass.textContent = '';
    }

    if(isUsernameTrue && isPasswordTrue) { 
        errorPass.textContent = '';
        errorUsername.textContent = '';
        window.location.href = '/html/childHtmlMarckups/ribbon.html'
    }
    
    if(username.value.length < 1) {
        if(errorUsername.textContent === ' Возможно пользователь не зарегистрирован' && errorPass.textContent === ' Возможно пользователь не зарегистрирован'
            && errorUsername.textContent === ' Неверное имя пользователя') 
        {
            errorUsername.textContent = '';
            errorPass.textContent = '';
        }
        errorUsername.textContent = 'Введите имя пользователя';
    }

    if(password.value.length < 1) {
        errorPass.textContent = 'Введите пароль';
    }

        if(password.value.length < 1) {
        if(errorPass.textContent === ' Возможно пользователь не зарегистрирован' && errorUsername.textContent === ' Возможно пользователь не зарегистрирован'
            && errorPass.textContent === 'Неверный пароль') 
        {
            errorUsername.textContent = '';
            errorPass.textContent = '';
        }
        errorUsername.textContent = 'Введите имя пользователя';
    }

    //I will improve the password and username check for errors
    // I will work out the hashing of the password when there is a server
})