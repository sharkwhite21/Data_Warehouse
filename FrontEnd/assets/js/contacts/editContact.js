const editContact = (id) => {
	fetch(`http://localhost:3000/contact/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let { contact } = await response.json();
			if (response.status === 200) {
				let form = document.getElementById('modal-editContact-form');
				let inputs = form.querySelectorAll('input, select');
				for (let i = 0; i < inputs.length; i++) {
					switch (inputs[i].name) {
						case 'regionId':
							inputs[i].value = contact.country_regionId;
							let countryResponse = await fetch(
								`http://localhost:3000/location/${contact.country_regionId}/countries`,
								{
									method: 'GET',
									headers: {
										'Content-Type': 'application/json',
										Authorization: 'Bearer ' + token,
									},
								}
							);
							if (countryResponse) {
								let data = await countryResponse.json();
								let container = document.getElementById('edit-contact-country-select');
								container.innerHTML = '';
								container.insertAdjacentHTML('beforeend', '<option selected>Elija un pais...</option>');
								data.countries.forEach((country) => {
									let template = `<option value="${country.id}">${country.name}</option>`;
									container.insertAdjacentHTML('beforeend', template);
								});
							}
							break;
						case 'countryId':
							inputs[i].value = contact.country_id;
							let cityResponse = await fetch(`http://localhost:3000/location/${contact.country_id}/cities`, {
								method: 'GET',
								headers: {
									'Content-Type': 'application/json',
									Authorization: 'Bearer ' + token,
								},
							});
							if (cityResponse) {
								let data = await cityResponse.json();
								let container = document.getElementById('edit-contact-city-select');
								container.innerHTML = '';
								container.insertAdjacentHTML('beforeend', '<option selected>Elija una ciudad...</option>');
								data.cities.forEach((city) => {
									let template = `<option value="${city.id}">${city.name}</option>`;
									container.insertAdjacentHTML('beforeend', template);
								});
							}
							break;
						case 'cityId':
							inputs[i].value = contact.cityId;

							break;
						case 'companyId':
							console.log(contact);
							inputs[i].value = contact.companyId;

							break;
						case 'last_name':
							inputs[i].value = contact.last_name;

							break;
						case 'occupation':
							inputs[i].value = contact.occupation;

							break;
						case 'name':
							inputs[i].value = contact.name;
							break;
						case 'address':
							inputs[i].value = contact.address;
							break;
						case 'phone':
							inputs[i].value = contact.phone;
							break;
						case 'email':
							inputs[i].value = contact.email;
							break;

						default:
							break;
					}
				}
				$('#modal-editContact').modal('show');
				form.addEventListener('submit', (e) => {
					validateFormEditContact(e, contact.id);
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
const validateFormEditContact = (e, id) => {
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
		contactEdit(data, form, id);
	}
};
const contactEdit = (data, form, id) => {
	fetch(`http://localhost:3000/contact/update/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 401) {
				window.location = '/';
			} else if (response.status === 200) {
				window.location = '/contactos.html';
			} else {
				showAlert(form, data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
