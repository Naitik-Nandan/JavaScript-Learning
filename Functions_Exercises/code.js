const multiply = (a, b) => a * b;
console.log(multiply(2, 3));
array = [-1, 2, 4];
let k = 0;
function posNo(numArray) {
    let no = 0;
    numArray.forEach(value => {
        if (value > 0)
            no++;
    })
    return no;
}

/* function posNo (numArray) {
    let no = 0;
    numArray.forEach(function (value) {
        if (value>0)
            no++;
    })
    return no;
}
    */

console.log(posNo(array));

function addNum(array, num) {
    const array1 = array.map(value => value + num)
    return array1;
}
console.log(addNum(array, 2));

const stringArray = ['egg', 'apple', 'egg' , 'egg'];
function removeEgg(array, word) {
    let k=0;
    let check;
    const newArray = array.filter(value => {
        if (value === word && k<2){
            k++;
            return false
        }
        else return (true);
})
    return newArray;
}
console.log(removeEgg(stringArray, 'egg'));