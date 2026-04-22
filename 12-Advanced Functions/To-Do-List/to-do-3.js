myArray = JSON.parse(localStorage.getItem('to-do-array')) || [];
renderToDoList();

document.querySelector('.add').addEventListener('click', addTodo);
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
    myArray.forEach((ob, i) => {
        document.querySelector('.to-do-list').innerHTML += `<div>${ob.name}</div>
        <div>${ob.date}</div>
        <button class="delete">Delete</button>`;
    });
    document.querySelectorAll('.delete').forEach((dltButton, index) => {
    dltButton.addEventListener('click', () => {
        deleteToDo(index);
    })
});
    localStorage.setItem('to-do-array', JSON.stringify(myArray));
}



function deleteToDo(i) {
    myArray.splice(i, 1);
    renderToDoList();
}