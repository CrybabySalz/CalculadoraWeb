var result = document.getElementById('result');
var historyList = document.getElementById('history');
let history = JSON.parse(localStorage.getItem('history')) || [];
var executed = false;

function appendNumber(number) {
  if (executed) {
    executed = false;
    result.value = '';
  }
  result.value += number;
}

function appendOperator(operator) {
  result.value += operator;
}

function calculate() {
  var expression = result.value;
  var answer;
  try {
    answer = eval(expression);
  } catch (error) {
    answer = 'Error';
  }

  result.value = answer;
  renderHistory();
  executed = true;

  // Mostrar el resultado en el historial
  var calculation = expression + ' = ' + answer;
  var listItem = document.createElement('li');
  listItem.textContent = calculation;
  historyList.appendChild(listItem);
  console.log(history);
  history.push(calculation);
  localStorage.setItem('history', JSON.stringify(history));
}

function clearResult() {
  result.value = '';
}

function deleteLastCharacter() {
  result.value = result.value.slice(0, -1);
}

function clearHistory() {

  while (historyList.firstChild)
  {
    historyList.removeChild(historyList.firstChild)
  }
  history = [];
  localStorage.removeItem('history');
  renderHistory();
  
}

function renderHistory() {
  historyList.innerHTML = '';
  for (var i = 0; i < history.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = history[i];
    historyList.appendChild(listItem);
  }
}

// Escuchar el evento de pulsación de teclas
document.addEventListener('keydown', function(event) {
  var key = event.key;
  if (key >= '0' && key <= '9') {
    // Borrar resultado anterior al ingresar un nuevo número
    if (result.value === 'Error' || result.value === 'Infinity') {
      result.value = '';
    }
    appendNumber(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    appendOperator(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLastCharacter();
  }
});

renderHistory();


