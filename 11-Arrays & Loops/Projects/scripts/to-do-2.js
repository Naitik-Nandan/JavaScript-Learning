myArray = [];
function addTodo() {
    myArray.push(document.querySelector('.input').value);
    document.querySelector('.input').value = '';
    document.querySelector('.to-do-list').innerHTML = ``;
    for (let i = 0; i < myArray.length; i++) {
        document.querySelector('.to-do-list').innerHTML += `<p>${myArray[i]}<p>`;
    }
}