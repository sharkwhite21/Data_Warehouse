let formCreate = document.getElementById('modal-newContact');

formCreate.addEventListener('submit', (e) => {
	validateFormCreate(e);
});

const validateFormCreate = (e) => {
	e.preventDefault();
	let form = e.target;
	let inputs = form.querySelectorAll('select, input');
	let sendForm = true;
	for (let i = 0; i < inputs.length; i++) {
		const value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert(form, 'Por favor llene todos los campos');
		}
		if (inputs[i].name === 'email') {
			let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
			if (!regex.test(value)) {
				sendForm = false;
				hideAlert(form);
				showAlert(form, 'Email invalido');
			}
		}
	}
	if (sendForm) {
		let data = {};
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].name !== 'countryId' && inputs[i].name !== 'regionId')
				data = { ...data, [inputs[i].name]: inputs[i].value };
		}
		hideAlert(form);
		createContact(data, form);
	}
};
const createContact = (data, form) => {
	fetch(`http://localhost:3000/contact/create`, {
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
				window.location = '/contactos.html';
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
