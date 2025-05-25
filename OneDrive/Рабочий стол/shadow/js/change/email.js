const button = document.getElementById('change');
const modal = document.getElementById('modal');
const blurBg = document.querySelector('.blurBg');

button.addEventListener('click', () => {
    modal.style.display = 'flex';
    blurBg.style.display = 'block';
})

// initialize the database 
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
}

document.addEventListener('DOMContentLoaded', () => {
    modal.innerHTML = ` 
        <form id="myForm">
            <label>Подтвердите свою старую почту</label>
            <input id="confirmEmail" type="text" placeholder="Подтвердите почту">
            <p class="error"></p>

            <div></div>
            
            <input id="newEmail" type="email" placeholder="Введите новую почту">
            <p class="error"></p>

            <button id="confirm">Подтвердить</button>
            <button id="close">Закрыть</button>
        </form>
    `

    const form = document.getElementById('myForm')
    const confirmEmail = document.getElementById('confirmEmail')
    const newEmail = document.getElementById('newEmail')
    const confirmBtn = document.getElementById('confirm')
    const closeBtn = document.getElementById('close')
    const errors = document.querySelectorAll('.error')

    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault()

        const oldEmailValue = confirmEmail.value.trim()
        const newEmailValue = newEmail.value.trim()

        errors[0].textContent = ''
        errors[1].textContent = ''

        let foundUser = null

        for (let key in db) {
            if (db[key].email === oldEmailValue) {
                foundUser = db[key]
                break
            }
        }

        if (!foundUser) {
            errors[0].textContent = 'Почты нет в базе данных'
            return
        }

        if (!newEmailValue) {
            errors[1].textContent = 'Введите новую почту'
            return
        }

        if (newEmailValue === oldEmailValue) {
            errors[1].textContent = 'Новая почта совпадает со старой'
            return
        }

        foundUser.email = newEmailValue

        modal.style.display = 'none'
        blurBg.style.display = 'none'

        alert('Почта успешно изменена')
    })

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault()
        modal.style.display = 'none'
        blurBg.style.display = 'none'
    })
})

