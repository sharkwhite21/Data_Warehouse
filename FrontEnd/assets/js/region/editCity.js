const editCity = (id) => {
	fetch(`http://localhost:3000/location/city/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				let form = document.getElementById('modal-editCity-form');
				let inputs = form.querySelectorAll('input, select');
				for (let i = 0; i < inputs.length; i++) {
					switch (inputs[i].name) {
						case 'countryId':
							let options = inputs[i].querySelectorAll('option');
							for (let i = 0; i < options.length; i++) {
								if (parseInt(options[i].value) === data.city.countryId) {
									options[i].selected = true;
								}
							}
							break;

						default:
							inputs[i].value = data.city.name;
							break;
					}
				}
				$('#modal-editCity').modal('show');
				form.addEventListener('submit', (e) => {
					validateFormEditCity(e, id);
				});
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
const validateFormEditCity = (e, id) => {
	e.preventDefault();
	let sendForm = true;
	let form = e.target;
	let inputs = e.target.querySelectorAll('input, select');

	for (let i = 0; i < inputs.length; i++) {
		let value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert(form, 'El campo no puede estar vacio');
		}
	}

	if (sendForm) {
		let data = {
			countryId: inputs[0].value,
			name: inputs[1].value,
		};
		hideAlert(form);
		cityEdit(data, form, id);
	}
};
const cityEdit = (data, form, id) => {
	fetch(`http://localhost:3000/location/city/update/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status !== 200) {
				showAlert(form, data.message);
			} else if (response.status === 200) {
				window.location = '/region.html';
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
