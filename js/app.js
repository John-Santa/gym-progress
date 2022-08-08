//Variables
const form = document.querySelector('#formulario');
const progressList = document.querySelector('#progress-list');
let progress = {
    id: Date.now(),
    machineNumber: '',
    muscularGroup: '',
    size: '',
    backplate: '',
    range: '',
    weight: '',
    description: ''

}

let progressArray = [];

//Event Listeners
const eventListeners = () => {
    form.addEventListener('submit', addProgress);
    document.addEventListener('DOMContentLoaded', () => {
        progressArray = JSON.parse(localStorage.getItem('progress')) || [];
        showProgress();
    });
}


//Functions
const addProgress = (event) => {
    event.preventDefault();
    //Get values
    const machineNumber = document.querySelector('#machine-number').value;
    const muscularGroup = document.querySelector('#muscular-group').value;
    const weight = document.querySelector('#weight').value;

    //Validate
    if (machineNumber === '' || muscularGroup === '' || weight === '') {
        printError('Todos los campos son obligatorios');
        return;
    }

    progress.machineNumber = machineNumber;
    progress.muscularGroup = muscularGroup;
    progress.size = document.querySelector('#size').value;
    progress.backplate = document.querySelector('#backplate').value;
    progress.range = document.querySelector('#range').value;
    progress.weight = weight;
    progress.description = document.querySelector('#description').value;

    progressArray = [...progressArray, progress];

    //Show progress
    showProgress();
}

const printError = (error) => {
    const errorMessage = document.createElement('p');
    errorMessage.classList = 'error';
    errorMessage.appendChild(document.createTextNode(error));
    form.insertBefore(errorMessage, document.querySelector('.form-group'));
    setTimeout(() => {
        errorMessage.remove();
    } , 3000);
}

const showProgress = () => {
    cleanHTML();
    progressArray.forEach(progress => {
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('borrar-progreso');
        btnDelete.innerText = 'Eliminar';
        const tr = document.createElement('tr');

        btnDelete.addEventListener('click', () => {
            deleteProgress(progress);
        });

        tr.innerHTML = `
        <td>${progress.machineNumber}</td>
        <td>${progress.muscularGroup}</td>
        <td>${progress.size}</td>
        <td>${progress.backplate}</td>
        <td>${progress.range}</td>
        <td>${progress.weight}</td>
        <td>${progress.description}</td>
    `;
        tr.appendChild(btnDelete);
        progressList.appendChild(tr);
    });

    storageSincronized();
}

const cleanHTML = () => {
    while (progressList.firstChild) {
        progressList.removeChild(progressList.firstChild);
    }
}

const storageSincronized = () => {
    localStorage.setItem('progress', JSON.stringify(progressArray));
}

const deleteProgress = ({ id }) => {
    progressArray = progressArray.filter(progress => progress.id !== id);
    showProgress();
}

//Init
eventListeners();