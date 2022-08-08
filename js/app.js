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
        if (progressArray) {
            showProgress();
        }
    });
    progressList.addEventListener('click', deleteProgress);
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
    let html = '';
    progressArray.forEach(progress => {
        console.log(progress.id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${progress.machineNumber}</td>
        <td>${progress.muscularGroup}</td>
        <td>${progress.size}</td>
        <td>${progress.backplate}</td>
        <td>${progress.range}</td>
        <td>${progress.weight}</td>
        <td>${progress.description}</td>
        <td><button class="btn btn-danger btn-sm btn-delete" >Eliminar</button></td>
    `;
        progressList.appendChild(tr);
    });

    storageSincronized();
}

const storageSincronized = () => {
    localStorage.setItem('progress', JSON.stringify(progressArray));
}

const deleteProgress = (event) => {
    if (event.target.classList.contains('btn-delete')) {+
        event.target.parentElement.parentElement.remove();

    }
    console.log(progressArray);
}

//Init
eventListeners();