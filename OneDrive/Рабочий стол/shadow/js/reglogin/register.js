const form = document.getElementById('myForm'); 
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmPassword');
const errorUsername = document.querySelector('.errorUsername');
const errorEmail = document.querySelector('.errorEmail');
const errorPass = document.querySelector('.errorPass');
const errorConfirmPass = document.querySelector('.errorConfirmPass');
const btn = document.getElementById('register');

form.addEventListener('submit', (e) =>{ 
    e.preventDefault() 

    const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    errorConfirmPass.textContent = '';
    errorEmail.textContent = '';
    errorPass.textContent = '';
    errorUsername.textContent = '';

    if(patternPassword.test(password.value.trim()) === false){
        errorPass.textContent = 'Пароль должен содержать не менее 8 символов, с одной заглавной буквой и одной цифры';
    }

    if(password.value.trim() !== confirmPass.value.trim()){ 
        errorConfirmPass.textContent = 'Пароли не совпадают';
        return;
    }
    errorConfirmPass.textContent = '';

    const IsEmailUniqueness = Object.values(db).some(user => user.email.toLowerCase() === email.value.trim().toLowerCase()); 
    if(IsEmailUniqueness){ 
        errorEmail.textContent = 'данный адрес email занят';
        return;
    }
    errorEmail.textContent = '';

    const IsUsernameUniqueness = Object.values(db).some(user => user.username.toLowerCase() === username.value.trim().toLowerCase()); 
    if(IsUsernameUniqueness){ 
        errorUsername.textContent = 'Псевдоним занят';
        return;
    }
    errorUsername.textContent = '';

    const newUser = {
        username: username.value.trim().toLowerCase(),
        password: password.value.trim(),
        email: email.value.trim().toLowerCase()
    }
    db[`user${Object.keys(db).length + 1}`] = newUser; 
    localStorage.setItem('users', JSON.stringify(db)); //hashing will be worked out when there is a server if I launch the project at all

    if(IsEmailUniqueness === false && IsUsernameUniqueness === false){ 
        window.location.href = '/html/childHtmlMarckups/ribbon.html'
    }
})

//initial bd 
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