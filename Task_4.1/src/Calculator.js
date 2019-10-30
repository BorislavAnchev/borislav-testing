export class Calculator {
  constructor(currentInput = '0', memoryField = '', resetInputFlag = true) {
    this.currentInput = currentInput;
    this.memoryField = memoryField;
    this.resetInputFlag = resetInputFlag;
  }

  onOperator(input) {
    if(/\+|-|\*|\//.test(input)) {
      if(this.resetInputFlag && /\+|-|\*|\/$/.test(this.memoryField)) {   // If the last pressed button was an operator,
        this.memoryField = this.memoryField.slice(0, this.memoryField.length - 1) + input; // Change the operator at the end of the expression.
        return this.memoryField;
      }
      else {
        this.resetInputFlag = true;
        this.memoryField += this.currentInput + input;
        return this.memoryField;
      }
    }
  }

  onDigit(input) {
    if(/\d/.test(input)) { // If the input is a number
      if(input === '0' && this.resetInputFlag) {  // No leading zeros.
        this.currentInput = '0';
        return this.currentInput;
      }
      else if(this.resetInputFlag) { // If it is the initial input or the last input was an operator,
        this.resetInputFlag = false; // we change the display value of the currentInput field.
        this.currentInput = input;
        return this.currentInput;
      }
      else {                        // If the last pressed button was a number and we press a number again,
        this.currentInput += input; // we form the new number.
        return this.currentInput;
      }
    }
    else {
      if(this.resetInputFlag) {      // If you press decimal point before specifying a number,
        this.resetInputFlag = false; // assume that number to be 0.
        this.currentInput = '0.'
        return this.currentInput;
      }
      else if(!/\./.test(this.currentInput)) { // If there is no decimal point present,
        this.currentInput += input;
        return this.currentInput;      // append it to the currentInput.
      }
      else {
        return this.currentInput; // If a decimal point is present, keep the currentInput as it is.
      }
    }
  }

  onEquals() {
    if(this.resetInputFlag && /\+|-|\*|\/$/.test(this.memoryField)) {            // If we press '=' after pressing an operator,
      this.currentInput = eval(this.memoryField.slice(0, this.memoryField.length - 1)); // evaluate the memoryField without the last symbol, which is operator.
      this.memoryField = '';
      return this.currentInput;
    }
    else {                                                     // If we press '=' after we pressed some number,
      this.currentInput = eval(this.memoryField + this.currentInput); // evaluate the memoryField and the currentInput.
      this.memoryField = '';
      this.resetInputFlag = true;
      return this.currentInput;
    }
  }

  onDelete() {
    if(this.resetInputFlag === false && this.currentInput.length > 0) { // If the last input was a number and if there is something to delete,
      if(this.currentInput.length === 1) {                              // If it is the last digit, change the current input to 0
        this.currentInput = '0';
        this.resetInputFlag = true;
        return this.currentInput;
      }
      else {
        this.currentInput = this.currentInput.slice(0, this.currentInput.length - 1); // If it is not the last digit - delete the last digit.
        return this.currentInput;
      }
    }
    else {                       // If there is nothing to delete,
      return this.currentInput;  // return the currentInput as it is.
    }
  }

  onClean() {
    this.currentInput = '0';
    this.memoryField = '';
    this.resetInputFlag = true;
    return this.currentInput;
  }
}