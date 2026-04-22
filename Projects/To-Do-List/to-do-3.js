myArray = JSON.parse(localStorage.getItem('to-do-array')) || [];
renderToDoList();
function addTodo() {
    myArray.push({
        name: document.querySelector('.input').value,
        date: document.querySelector('.datePicker').value
    });
    document.querySelector('.input').value = '';
    document.querySelector('.datePicker').value = '';
    renderToDoList();
}

function renderToDoList() {
    document.querySelector('.to-do-list').innerHTML = ``;
    for (let i = 0; i < myArray.length; i++) {
        document.querySelector('.to-do-list').innerHTML += `<div>${myArray[i].name}</div>
        <div>${myArray[i].date}</div>
        <button onclick="deleteToDo(${i});" class="delete">Delete</button>`;
    }
    localStorage.setItem('to-do-array', JSON.stringify(myArray));
}

function deleteToDo(i) {
    myArray.splice(i, 1);
    renderToDoList();
}