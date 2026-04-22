myArray = [];
        function addTodo () {
            myArray.push(document.querySelector('.input').value);
            document.querySelector('.input').value = '';
            console.log(myArray);
        }