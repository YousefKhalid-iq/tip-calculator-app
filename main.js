
const tipBtns = document.querySelectorAll('.tip');
const resetBtn = document.querySelector('[data-reset]');
const billInput = document.querySelector('[data-bill]');
const customInput = document.querySelector('[data-custom]');
const peopleInput = document.querySelector('[data-people]');
const results = document.querySelectorAll('.value');

billInput.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
	btn.addEventListener('click', handleClick);
});
customInput.addEventListener('input', setTipCustomValue);
peopleInput.addEventListener('input', setPeopleCount);
resetBtn.addEventListener('click', reset);


let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

function setBillValue() {
	billValue = parseFloat(billInput.value);
	calcTips();
}

function handleClick(event) {
	 tipBtns.forEach(btn => {
	 	btn.classList.remove('btn-active')
			if(event.target.innerHTML == btn.innerHTML){
				btn.classList.add('btn-active');
				tipValue = parseFloat(btn.innerHTML)/100;
			}
		})

	customInput.value = '';
	calcTips();
}

function setTipCustomValue(){
	tipValue = parseFloat(customInput.value/100);

	tipBtns.forEach(btn => {
		btn.classList.remove('btn-active');
	})

	if(customInput.value !== '') {
		calcTips();
	}
}

function setPeopleCount() {

	peopleValue = parseFloat(peopleInput.value);

	let msg = document.querySelector('.error-msg')
	if (peopleValue <= 0) {
		msg.classList.add('show-error-msg')
		setTimeout(function() {
			msg.classList.remove('show-error-msg');
		}, 1500)
	}

	calcTips()
}

function calcTips() {
	if (peopleValue >=1) {
		let tipAmount = billValue * tipValue / peopleValue;
		let total = billValue * (tipValue + 1) / peopleValue;

		results[0].innerHTML = '$' + tipAmount.toFixed(2);
		results[1].innerHTML = '$' + total.toFixed(2);
	}
}

function reset() {
	billInput.value = 0;
	setBillValue();
	peopleInput.value = '1';
	customInput.value = '';
}