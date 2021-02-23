const addCountry = (idRegion) => {
	$('#modal-newCountry').modal('show');
	let form = document.getElementById('modal-newCountry-form');
	form.addEventListener('submit', (e) => {
		validateFormCoun(e, idRegion);
	});
};
const validateFormCoun = (e, idRegion) => {
	e.preventDefault();
	let input = e.target.querySelectorAll('input')[0];
	let form = e.target;
	if (!input.value) {
		showAlert(form, 'Por favor ingrese el nombre de el pais');
	} else {
		let data = {
			regionId: idRegion,
			name: input.value,
		};
		hideAlert(form);
		sendCountry(data, form);
	}
};
const sendCountry = (data, form) => {
	fetch(`http://localhost:3000/location/country/create`, {
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
