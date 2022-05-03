import { add, divide, multiply, percent, substract } from './operations';
import './style.css';


let actualValue: string = '';
let termA: number = 0;
let termB: number = 0;
let operator: string = '';
let isResult: boolean = false;

const bOperators: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.operator');
const bNumbers: NodeListOf<HTMLButtonElement> = document.querySelectorAll( '.number' );
const screen: HTMLDivElement = <HTMLDivElement>document.getElementById( 'display' );
const bClear: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'clear' );
const bBack: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'back' );
const bEqual: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'equal' );

bClear.addEventListener( 'click', clear );
bBack.addEventListener( 'click', backSpace );
bEqual.addEventListener( 'click', equal );
bNumbers.forEach( item => item.addEventListener( 'click', () => inputNumber( (item.innerHTML).trim() ) ));
bOperators.forEach( item => item.addEventListener( 'click', () => inputOperator( (item.innerHTML).trim() ) ));

function display(): void {
  screen.innerHTML = actualValue;
};

function inputNumber( item: string ): void {
  if( isResult && !operator.length ){
    clear();
  }
  if( item === '.' && actualValue.includes( '.' )) return
  actualValue = actualValue + item;
  display();
};

function inputOperator( item: string ): void {
  operator = item;
  actualValue = actualValue + item;
  isResult = false;
  display();
};

function clear(): void {
  actualValue = '';
  operator = '';
  isResult = false;
  display();
};

function backSpace(): void {
  actualValue = actualValue.slice( 0, -1 );
  display();
};

function operation( numA:  number, numB: number, fnOp: Function ): void {
  actualValue = fnOp( numA, numB );
  showResult();
};

function showResult(): void {
  operator = '';
  isResult = true;
  display();
};

function equal(): void {
  if( !operator.length || isResult ) return;
  // actualValue = eval(actualValue)
  const terms: string[] = actualValue.split( operator );
  if ( terms.length === 1 ) return;
  termA = Number( terms[0] );
  termB = Number( terms[1] );
  operation( termA, termB, getFnOperation() );
};

function getFnOperation(): Function {
  let fn: Function = add;
  switch( operator ) {
    case '+': 
            fn = add;
            break;
    case '-':
            fn = substract;
            break;
    case '*': 
            fn = multiply;
            break;
    case '/':
            fn = divide;
            break;
    case '%':
            fn = percent;
            break;
  };
  return fn;
};
