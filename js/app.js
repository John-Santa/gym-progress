//Variables
const form = document.querySelector('#form');
const btnSubmit = document.querySelector('#submit');
const cards = document.querySelector('#progress-cards');
let exercise = {
    id: Date.now(),
    name: '',
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
    submit.addEventListener('click', addExercise);
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('taining')) {
            training = JSON.parse(localStorage.getItem('taining'));
        }else{
            training = [];
        }
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

    exercise.name = document.querySelector('#exercise-name').value;
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
                    <h5 class="card-title">${exercise.name}</h5>
                    <p class="card-text">${exercise.machineNumber}-${exercise.muscularGroup}</p>
                    <p class="card-text">Size: ${exercise.size}</p>
                    <p class="card-text">Backplate: ${exercise.backplate}</p>
                    <p class="card-text">Range of motion: ${exercise.range}</p>
                    <p class="card-text">Weight per series: ${exercise.weight}</p>
                    <p class="card-text">Description: ${exercise.description}</p>
                    <button class="btn btn-danger">Delete</button>
                    <button class="btn btn-warning">Edit</button>
            </div>
        `;

        const btnDelete = div.querySelector('.btn-danger');
        btnDelete.addEventListener('click', () => {
            deleteProgress(exercise);
        });

        const btnEdit = div.querySelector('.btn-warning');
        btnEdit.addEventListener('click', () => {
            editProgress(exercise);
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

const editProgress = ({ id }) => {
    console.log(id);
    const exercise = training.find(exercise => exercise.id === id);
    form.querySelector('#exercise-name').value = exercise.name;
    form.querySelector('#machine-number').value = exercise.machineNumber;
    form.querySelector('#muscular-group').value = exercise.muscularGroup;
    form.querySelector('#size').value = exercise.size;
    form.querySelector('#backplate').value = exercise.backplate;
    form.querySelector('#range').value = exercise.range;
    form.querySelector('#weight').value = exercise.weight;
    form.querySelector('#description').value = exercise.description;
    form.querySelector('#update').removeAttribute('hidden');
    form.querySelector('#submit').setAttribute('hidden', true);
    form.querySelector('#update').addEventListener('click', () => {
        updateProgress(exercise);
    } );
}

const updateProgress = ({ id }) => {
    const exercise = training.find(exercise => exercise.id === id);
    exercise.name = document.querySelector('#exercise-name').value;
    exercise.machineNumber = document.querySelector('#machine-number').value;
    exercise.muscularGroup = document.querySelector('#muscular-group').value;
    exercise.size = document.querySelector('#size').value;
    exercise.backplate = document.querySelector('#backplate').value;
    exercise.range = document.querySelector('#range').value;
    exercise.weight = document.querySelector('#weight').value;
    exercise.description = document.querySelector('#description').value;
    form.querySelector('#submit').removeAttribute('hidden');
    form.querySelector('#update').setAttribute('hidden', true);
    showProgress();
}

const deleteProgress = ({ id }) => {
    training = training.filter(progress => progress.id !== id);
    showProgress();
}


//Init
eventListeners();