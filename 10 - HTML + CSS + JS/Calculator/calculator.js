let calculation = localStorage.getItem('key1') || '';

    function updateCalculation(value) {
      calculation += value;
      localStorage.setItem('key1', calculation);
      document.querySelector('.calc').innerHTML = calculation;
    }