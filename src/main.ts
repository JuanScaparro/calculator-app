import './style.css';


let actualValue: string = '0';
let operator: string = '';
let isResult: boolean = false;

const screen: HTMLDivElement = <HTMLDivElement>document.getElementById( 'display' );
const operation: HTMLDivElement = <HTMLDivElement>document.getElementById( 'operation' );
const bOperators: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.operator');
const bNumbers: NodeListOf<HTMLButtonElement> = document.querySelectorAll( '.number' );
const bClear: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'clear' );
const bBack: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'back' );
const bEqual: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'equal' );
const bPercent: HTMLButtonElement = <HTMLButtonElement>document.getElementById( 'percent' );

bClear.addEventListener( 'click', clear );
bBack.addEventListener( 'click', backSpace );
bEqual.addEventListener( 'click', equal );
bPercent.addEventListener( 'click', percent );
bNumbers.forEach( item => item.addEventListener( 'click', () => inputNumber( ( item.innerHTML ).trim() ) ));
bOperators.forEach( item => item.addEventListener( 'click', () => inputOperator( ( item.innerHTML ).trim() ) ));

function display(): void {
  screen.innerHTML = actualValue;
};

function displayOperation(): void {
  operation.innerHTML = actualValue + '=';
};

function clearDisplayOperation(): void {
  operation.innerHTML = '';
};

function inputNumber( item: string ): void {
  if( isResult && !operator.length ) clear();
  if( item === '.' && actualValue.includes( '.' )) return;
  checkZeroes( item );
  actualValue = actualValue === '0' ? item : actualValue + item;
  display();
};

function checkZeroes( item: string ): void {
  const isOperatorZero: boolean = actualValue.endsWith( operator + '0' );
  if( isOperatorZero && item !== '.' ) {
    actualValue = actualValue.slice( 0, -1 );
  };
};

function inputOperator( item: string ): void {
  if( isResult ) clearDisplayOperation();
  operator = item;
  actualValue = actualValue + item;
  isResult = false;
  display();
};

function clear(): void {
  actualValue = '0';
  operator = '';
  isResult = false;
  display();
  clearDisplayOperation();
};

function backSpace(): void {
  if(isResult) {
    clear();
    return;
  }
  actualValue = actualValue.slice( 0, -1 );
  display();
};


function showResult(): void {
  operator = '';
  isResult = true;
  display();
};

function equal(): void {
  if( actualValue.length < 3 || isResult ) return;
  displayOperation();
  actualValue = eval( actualValue );
  showResult();
};

function percent(): void {
  if( actualValue.length < 3 || isResult ) return;
  displayOperation();
  actualValue = String( eval( actualValue )/100 );
  showResult();
};

function init(): void {
  display();
};

init();