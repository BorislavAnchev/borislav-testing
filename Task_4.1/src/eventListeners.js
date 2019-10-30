import { Calculator } from './Calculator';

const calc = new Calculator();
const currentInput = document.getElementById('currentInput');
const memoryField = document.getElementById('memoryField');

const buttons = ['button1', 'button2', 'button3',
                'button4', 'button5', 'button6',
                'button7', 'button8', 'button9',
                'button0', 'buttonC', 'buttonDel',
                'buttonPlus', 'buttonMinus', 'buttonEquals',
                'buttonMultiplication', 'buttonDivision',
                'buttonDecimal'];

buttons.forEach(function(item) {
  document.getElementById(item).addEventListener('click', function() {
    if(this.value === '.') {
      currentInput.value = calc.onDigit('.');
    }
    else if(/\+|-|X|\//.test(this.value)) {
      if(this.value === 'X') {
        memoryField.value = calc.onOperator('*');
      }
      else {
        memoryField.value = calc.onOperator(this.value);
      }
    }
    else if(/\d/.test(this.value)) {
      currentInput.value = calc.onDigit(this.value);
    }
    else if(this.value === 'C') {
      currentInput.value = calc.onClean();
      memoryField.value = '';
    }
    else if(this.value === '<') {
      currentInput.value = calc.onDelete();
    }
    else if(this.value === '=') {
      currentInput.value = calc.onEquals();
      memoryField.value = '';
    }
  })
});