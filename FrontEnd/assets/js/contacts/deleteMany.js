let deleteManyButton = document.getElementById('delete-all-selected');

deleteManyButton.addEventListener('click', (e) => {
	deleteAll(e);
});
const deleteAll = (e) => {
	e.preventDefault();
	let checkboxes = document.getElementById('accordionContact').querySelectorAll("input[type='checkbox']");
	let ids = [];
	checkboxes.forEach((checkbox) => {
		if (checkbox.checked) {
			ids.push(parseInt(checkbox.value));
		}
	});
	contactDelete(ids);
};
