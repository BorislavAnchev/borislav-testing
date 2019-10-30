import { Calculator } from './Calculator';

const calc = new Calculator();

afterEach(() => {calc.onClean()});

describe('The calculator object', () => {
  it('should produce 8 as the result of 3+5', () => {
    calc.onDigit('3');
    calc.onOperator('+');
    calc.onDigit('5');
    expect(calc.onEquals()).to.equal(8);
  });

  it('should not append a decimal point to the current input, if a decimal point is already present in it', () => {
    calc.onDigit('3');
    calc.onDigit('.');
    calc.onDigit('5');
    expect(calc.onDigit('.')).to.equal('3.5');
  });

  it('should append the decimal point to a zero, if there is no previous input', () => {
    expect(calc.onDigit('.')).to.equal('0.');
  });

  it('should append a decimal point to the current input, if a decimal point is not present in it', () => {
    calc.onDigit('3');
    expect(calc.onDigit('.')).to.equal('3.');
  });

  it('should change the operator at the end of the expression', () => {
    calc.onDigit('3');
    calc.onOperator('+');
    expect(calc.onOperator('-')).to.equal('3-');
  });

  it('should update the expression when an operator is pressed after a digit', () => {
    calc.onDigit('3');
    calc.onOperator('+');
    calc.onDigit('5');
    expect(calc.onOperator('-')).to.equal('3+5-');
  });

  it('should set the new display value on input after operator, calculation and memory clear', () => {
    calc.onDigit('3');
    calc.onOperator('+')
    expect(calc.onDigit('5')).to.equal('5');
    calc.onEquals();
    expect(calc.onDigit('1')).to.equal('1');
    calc.onClean();
    expect(calc.onDigit('2')).to.equal('2');
  });

  it('should not append any more zeroes and swap the current display value with the new input if the current display value is only a 0', () => { // No leading zeroes.
    expect(calc.onDigit('0')).to.equal('0');
    expect(calc.onDigit('5')).to.equal('5');
  });
});
  


  
 
  