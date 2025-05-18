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
