//Variables
const form = document.querySelector('#form');
const cards = document.querySelector('#progress-cards');
let exercise = {
    id: Date.now(),
    machineNumber: '',
    muscularGroup: '',
    size: '',
    backplate: '',
    range: '',
    weight: '',
    description: ''

}

let training = [];
//Event Listeners
const eventListeners = () => {
    form.addEventListener('submit', addExercise);
    document.addEventListener('DOMContentLoaded', () => {
        training = JSON.parse(localStorage.getItem('training')) || [];
        showProgress();
    });
}


//Functions
const addExercise = (event) => {
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

    exercise.machineNumber = machineNumber;
    exercise.muscularGroup = muscularGroup;
    exercise.size = document.querySelector('#size').value;
    exercise.backplate = document.querySelector('#backplate').value;
    exercise.range = document.querySelector('#range').value;
    exercise.weight = weight;
    exercise.description = document.querySelector('#description').value;

    training = [...training, exercise];
    //clean form
    form.reset();
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
    training.forEach(exercise => {

        const div = document.createElement('div');
        div.classList.add('col-sm-4');
        div.classList.add('spacing');

        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${exercise.machineNumber}-${exercise.muscularGroup}</h5>
                    <p class="card-text">Size: ${exercise.size}</p>
                    <p class="card-text">Backplate: ${exercise.backplate}</p>
                    <p class="card-text">Range of motion: ${exercise.range}</p>
                    <p class="card-text">Weight per series: ${exercise.weight}</p>
                    <p class="card-text">Description: ${exercise.description}</p>
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>
        `;

        const btnDelete = div.querySelector('button');
        btnDelete.addEventListener('click', () => {
            deleteProgress(exercise);
        });
        cards.appendChild(div);
    });

    storageSincronized();
}

const cleanHTML = () => {
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
}

const storageSincronized = () => {
    localStorage.setItem('taining', JSON.stringify(training));
}


const deleteProgress = ({ id }) => {
    training = training.filter(progress => progress.id !== id);
    showProgress();
}
//Init
eventListeners();