let selectAllButton = document.getElementById('selectAll-contacts');
selectAllButton.addEventListener('click', (e) => {
	selectAllCheckboxes(e);
});
const selectAllCheckboxes = (e) => {
	e.preventDefault();
	let text = e.target.innerHTML;
	if (text === 'Seleccionar todo') {
		e.target.innerHTML = 'Deseleccionar todo';
		let checkboxes = document.getElementById('accordionContact').querySelectorAll("input[type='checkbox']");
		checkboxes.forEach((checkbox) => {
			checkbox.checked = true;
			let event = new Event('change');
			checkbox.dispatchEvent(event);
		});
	} else {
		e.target.innerHTML = 'Seleccionar todo';
		let checkboxes = document.getElementById('accordionContact').querySelectorAll("input[type='checkbox']");
		checkboxes.forEach((checkbox) => {
			checkbox.checked = false;
			let event = new Event('change');
			checkbox.dispatchEvent(event);
		});
	}
};
