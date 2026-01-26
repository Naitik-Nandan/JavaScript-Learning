let array = [];
function todoList(todo) {
  array.push(todo);
  document.querySelector('.todo').value = '';
  console.log(array);

}
let array2 = [];

function todoList2(todo) {
  let i = 0;
  array2.push(todo);
  let todoList2HTML = '';
  while (i < array2.length) {
    const html = `<p>${array2[i]}</p>`;
    todoList2HTML += html;
    i++;
  }
  document.querySelector('.js-todoList2').innerHTML = todoList2HTML;
}
let array3 = [];
function todoList3(todo,dueDate) {
  let i = 0;
  array3.push({name: `${todo}` , due: `${dueDate}`});
  let todoList3HTML = '';
  while (i < (array3.length)) {
    const html = `<div>${array3[i].name}</div><div>${array3[i].due}</div><button onclick = "array3.splice(${i},1);
    deleteUpdationTodoList();" class="deleteButton">Delete</button>`;
    todoList3HTML += html;
    i++;
  }
  document.querySelector('.js-todoList3').innerHTML = todoList3HTML;
  console.log(todoList3HTML);
}
function deleteUpdationTodoList() {
  let todoList3HTML = '';
  let i = 0;
   while (i < (array3.length)) {
    const html = `<div>${array3[i].name}</div> <div>${array3[i].due}</div><button onclick = "array3.splice(${i},1);
    deleteUpdationTodoList();" class="deleteButton">Delete</button>`;
    todoList3HTML += html;
    i++;
  }
  if(array3.length == 0) {
    todoList3HTML = '';
  }
  document.querySelector('.js-todoList3').innerHTML = todoList3HTML;
  console.log(todoList3HTML);
}
