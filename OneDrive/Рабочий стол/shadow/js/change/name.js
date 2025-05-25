const button = document.getElementById('confrim');
const inpNewName = document.getElementById('nameInp');
const pass = document.getElementById('password');
const email = document.getElementById('email'); 
const modal = document.getElementById('modal');
const error = document.querySelector('.error');
const form = document.getElementById('changeName');
const confirmData = document.getElementById('confirmData');
// initialization data base 

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

form.addEventListener('submit' , (e) => { 
    e.preventDefault();
    const newName = inpNewName.value.trim().toLowerCase();
    const nameObj = Object.values(users).some(user => user.name.toLowerCase() === newName); 
    if(nameObj){ 
        error.textContent = 'Псевдоним занят';
        inpNewName.value = '';
        return;
    }else { 
        modal.style.display = 'flex';
        inpNewName.value = '';
        error.textContent = '';
        const valuePass = pass.value.trim();
        const valueEmail = email.value.trim();
        if( valuePass.length > 1 && valueEmail.length > 1){ 
            pass.value = '';
            email.value = '';
            confirmData.addEventListener('click' , () => {
                modal.style.display = 'none'; 
                window.location.href = '/html/childHtmlMarckups/ribbon.html'
            })
        }
    }
})