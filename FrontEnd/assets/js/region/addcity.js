const addCity = (idCountry) => {
	$('#modal-newCity').modal('show');
	let form = document.getElementById('modal-newCity-form');
	form.addEventListener('submit', (e) => {
		validateFormCit(e, idCountry);
	});
};
const validateFormCit = (e, idCountry) => {
	e.preventDefault();
	let input = e.target.querySelectorAll('input')[0];
	let form = e.target;
	if (!input.value) {
		showAlert(form, 'Por favor ingrese el nombre de la ciudad');
	} else {
		let data = {
			countryId: idCountry,
			name: input.value,
		};
		hideAlert(form);
		sendCity(data, form);
	}
};
const sendCity = (data, form) => {
	fetch(`http://localhost:3000/location/city/create`, {
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