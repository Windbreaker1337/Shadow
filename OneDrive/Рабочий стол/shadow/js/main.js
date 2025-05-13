const modalProf = document.getElementById('modalWindProf');
const modalMusic = document.getElementById('modalMusic');
const imgProf = document.getElementById('profile');
const choiceMusicBtn = document.getElementById('choiceMusic');
const closeMusicBtn = document.getElementById('closeMusic');
const closeProfBtn = document.getElementById('closeProf');
const player = document.getElementById('myPlayer');


choiceMusicBtn.addEventListener('click', () => { 
    modalMusic.style.display = 'flex'; 
})

imgProf.addEventListener('click', () => { 
    modalProf.style.display = 'flex';
    blurBg.style.display = 'none'
})

closeMusicBtn.addEventListener('click', () => { 
    modalMusic.style.display = 'none';
});

closeProfBtn.addEventListener('click', () => { 
    modalProf.style.display = 'none';
})

window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        modalMusic.style.display = 'none';
        modalProf.style.display = 'none';
    }
})

window.addEventListener('click', (e) => {
    if (!modalMusic.contains(e.target) && !choiceMusicBtn.contains(e.target)) {
        modalMusic.style.display = 'none';
    }
    if (!modalProf.contains(e.target) && !imgProf.contains(e.target)) {
        modalProf.style.display = 'none';
    }
})

function playSound(url) { 
    player.src = url ; 
    player.play()
}


const redact = document.getElementById('redact');
const modalRedact = document.getElementById('modalRedact');
const blurBg = document.getElementById('blurBackground')
const closeRed = document.getElementById('closeRed');

redact.addEventListener('click' , () => { 
    modalRedact.style.display = 'flex';
    blurBg.style.display = 'block'; 
})

closeRed.addEventListener('click' , () => { 
    modalRedact.style.display = 'none'; 
    blurBg.style.display = 'none';
})

window.addEventListener('keyup' , (e) => { 
    if(e.key = 'Escape'){ 
        modalRedact.style.display = 'none';
        blurBg.style.display = 'none';
    }
})

document.getElementById('fileInp').addEventListener('change', changeAvatar);

function changeAvatar(e) { 
    const file = e.target.files[0];
    if(file && file.type.startsWith('image/')){ 
        const reader = new FileReader(); 
        reader.onload = function(event) { 
            document.getElementById('profile').src = event.target.result;
        }
        reader.readAsDataURL(file); 
    }
}

const btnRib = document.getElementById('ribbon');
const btnChats = document.getElementById('chats');
const btnCalls = document.getElementById('calls');
const btnFriends = document.getElementById('friends');
const btnMusic = document.getElementById('music');


btnRib.addEventListener('click' , function() { 
   window.location.href = 'childHtmlMarckups/ribbon.html'
})

btnChats.addEventListener('click' , function() { 
    window.location.href = 'childHtmlMarckups/chats.html'
})

btnCalls.addEventListener('click' , function() { 
    window.location.href = 'childHtmlMarckups/calls.html'
})

btnFriends.addEventListener('click' , function() { 
    window.location.href = 'childHtmlMarckups/friends.html'
})

btnMusic.addEventListener('click' , function(){ 
    window.location.href = 'childHtmlMarckups/music.html'
} )

const aboutProject = document.getElementById('aboutProject');

aboutProject.addEventListener('click' , () => { 
      let modal = document.querySelector(".modalAbout");
    if (!modal) {
        modal = document.createElement("div");
        modal.className = "modalAbout";
        modal.innerHTML = `
          <div>
         <p>Привычный интерфейс, похожий на соцсеть, в которой ты провёл годы.</p>
        <p>Те же чаты, друзья, статусы и истории — но без привязки к тебе.</p>
        <p>Здесь ты можешь быть кем угодно. Или никем.</p>
        <p>Меняй псевдоним, почту, пароль — даже следы прошлой активности исчезнут, если ты этого хочешь.</p>

        <p><strong>Shadow — твой профиль существует ровно столько, сколько ты ему позволяешь.</strong></p>

        <ul>
            <li>Общайся свободно, не раскрывая лица</li>
            <li>Создавай новую личность за пару кликов</li>
            <li>Удаляй активность, данные и связи — полностью или частично</li>
            <li>Оставайся в тени, пока сам не решишь выйти из неё</li>
        </ul>
        <button id='closeAbout'>Закрыть</button> 
        </div>
        `;
        document.body.appendChild(modal);
        blurBg.style.display = 'block';

        document.getElementById("closeAbout").addEventListener("click", function () {
            modal.remove();
            blurBg.style.display = 'none';
        });

        document.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.remove();
                blurBg.style.display = 'none';
            }
        });

        document.addEventListener('keyup' , (e) => { 
            if(e.key === 'Escape'){ 
                modal.remove();
                blurBg.style.display = 'none'
            }
        })
}})

const leaveAccount = document.getElementById('leaveAccount'); 

leaveAccount.addEventListener('click' , () => { 
    window.location.href = 'reglogin/register.html'
})

const  addAccount = document.getElementById('addAccount'); 

addAccount.addEventListener('click' , () => { 
    window.location.href = 'reglogin/login.html'
})

const disabeplace = document.getElementById('disabeplace');

disabeplace.addEventListener('click' , () => { 
    const rightMenu = document.querySelector('.rightMenu')
    rightMenu.remove()
})

const complaints = document.getElementById('help');

complaints.addEventListener('click' , () => { 
    window.location.href = 'childHtmlMarckups/complaints.html'
})

const dataAccount = document.getElementById('dataAccount');

dataAccount.addEventListener('click' , () => { 
    window.location.href = 'childHtmlMarckups/dataAccount.html'
})

const choiceDesign = document.getElementById('choiceDesign')

choiceDesign.addEventListener('click' , () => { 
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modalDesignChoice';
    blurBg.style.display = 'block';
    modalDiv.innerHTML = `
        <button id="blackTheme">Черная тема</button>
        <button id="whiteTheme">Белая тема</button>

        <p>Настроить совю тему:</p>
        <button id="sesstings">Настроить</button>
        
        
        <button id="closeTheme">Заркыть</button>
        `;
    document.body.appendChild(modalDiv);

    document.getElementById('closeTheme').addEventListener('click' , () => { 
        blurBg.style.display = 'none';
        modalDiv.remove();
    })

    window.addEventListener('keyup' , (e) => { 
        if(e.key === 'Escape'){ 
            blurBg.style.display = 'none';
            modalDiv.remove();
        }
    })

    document.addEventListener('click' , (e) => { 
    if (e.target === modalDiv){
        blurBg.style.display = 'none';
        modalDiv.remove();
    }
    })
})

const changeName = document.getElementById('changeName');

changeName.addEventListener('click' , () => { 
    window.location.href = 'change/name.html'
})

const changeEmail = document.getElementById('changeEmail');

changeEmail.addEventListener('click' , () => { 
    window.location.href = 'change/email.html'
})

const changePass = document.getElementById('changePass');

changePass.addEventListener('click' , () => { 
    window.location.href = 'change/password.html'
})