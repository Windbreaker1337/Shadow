const main = document.getElementById('main'); 

main.innerHTML = `
    <h3>Смена пароля</h3>

    <form id='myForm'> 
        <label for='passwordOld'>Введите старый пароль</label>
        <input type='password' id='passwordOld' placeholder='Введите старый пароль'>
        <p class='error'></p>

        <label for='passwordNew'>Введите новый пароль</label>
        <input type='password' id='passwordNew' placeholder='Введите новый пароль'>
        <p class='error'></p>

        <label for='passwordNewConfirm'>Подтвердите новый пароль</label>
        <input type='password' id='passwordNewConfirm' placeholder='Подтвердите новый пароль'>
        <p class='error'></p>    

        <button type="submit" id='confirm'>Подтвердить</button>
    </form>
`;

const form = document.getElementById('myForm'); 
const passwordOld = document.getElementById('passwordOld'); 
const passwordNew = document.getElementById('passwordNew');
const passwordNewConfirm = document.getElementById('passwordNewConfirm');

const users = { 
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
}

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');

    const oldPassValue = passwordOld.value.trim();
    const newPassValue = passwordNew.value.trim();
    const newPassConfirm = passwordNewConfirm.value.trim();

    let isValid = true;

    const userFound = Object.values(users).find(user => user.password === oldPassValue);
    if (!userFound) {
        passwordOld.nextElementSibling.textContent = 'Старый пароль неверен';
        isValid = false;
    }

    if (!passwordPattern.test(newPassValue)) {
        passwordNew.nextElementSibling.textContent = 'Пароль должен содержать минимум 8 символов, одну заглавную, одну строчную букву и цифру';
        isValid = false;
    }

    if (newPassValue !== newPassConfirm) {
        passwordNewConfirm.nextElementSibling.textContent = 'Пароли не совпадают';
        isValid = false;
    }

    if (isValid) {
        for (let key in users) {
            if (users[key].password === oldPassValue) {
                users[key].password = newPassValue;
                break;
            }
        }

        alert('Пароль успешно изменён!');
        form.reset();
        
        window.location.href = '/html//index.html';
    }
})