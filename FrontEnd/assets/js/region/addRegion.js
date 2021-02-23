let formNewReg = document.getElementById('modal-newRegion-form');

formNewReg.addEventListener('submit', (e) => {
	validateFormReg(e);
});
const validateFormReg = (e) => {
	e.preventDefault();
	let sendForm = true;
	let form = e.target;
	let inputs = e.target.querySelectorAll('input');
	for (let i = 0; i < inputs.length; i++) {
		let value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert(form, 'Debe ingresar el nombre de la nueva region');
		}
	}
	if (sendForm) {
		hideAlert(form);
		createRegion(inputs, form);
	}
};

const createRegion = (inputs, form) => {
	let data = {};
	for (let i = 0; i < inputs.length; i++) {
		data = { ...data, [inputs[i].name]: inputs[i].value };
	}
	fetch(`http://localhost:3000/location/region/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(data),
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				window.location = '/region.html';
			} else if (response.status === 401) {
				window.location = '/';
			} else {
				showAlert(form, data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
function showAlert(form, text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-danger">${text}</small>`);
	}
}

function hideAlert(form) {
	let child = form.getElementsByTagName('small');
	if (child.length) {
		child[0].remove();
	}
}