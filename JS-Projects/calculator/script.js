let calculation = localStorage.getItem('calculation') || '';
function reset() {
  calculation = '';
  console.log(calculation);
  document.querySelector('.calculation').innerHTML = `${calculation}`
  localStorage.removeItem('calculation');
}
function updateCalculation(q) {
  calculation = calculation + q;
  localStorage.setItem('calculation', calculation);
  document.querySelector('.calculation').innerHTML = `${calculation}`;
}
