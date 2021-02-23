const editRegion = (id) => {
	fetch(`http://localhost:3000/location/region/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				let form = document.getElementById('modal-editRegion-form');
				let input = form.querySelectorAll('input')[0];
				input.value = data.region.name;
				$('#modal-EditRegion').modal('show');
				form.addEventListener('submit', (e) => {
					validateFormEditReg(e, id);
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
const validateFormEditReg = (e, id) => {
	e.preventDefault();
	let sendForm = true;
	let form = e.target;
	let input = e.target.querySelectorAll('input')[0];

	let value = input.value;
	if (!value) {
		sendForm = false;
		showAlert(form, 'El campo no puede estar vacio');
	}

	if (sendForm) {
		let data = {
			name: input.value,
		};
		hideAlert(form);
		regionEdit(data, form, id);
	}
};
const regionEdit = (data, form, id) => {
	fetch(`http://localhost:3000/location/region/update/${id}`, {
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
