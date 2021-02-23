let data = parseJwt(window.localStorage.getItem('token'));
let token = JSON.parse(window.localStorage.getItem('token')).token;

if (!data || !token) {
	window.location = '/';
} else {
	if (!data.isAdmin) {
		let usuarios = document.getElementById('user-nav-button');
		usuarios.style.display = 'none';
	}
	fetch('http://localhost:3000/contact/getall', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();
		if (response.status === 200) {
			let container = document.getElementById('accordionContact');
			container.innerHTML = '';
			data.forEach((contact) => {
				const {
					id,
					name,
					last_name,
					occupation,
					phone,
					email,
					address,
					city_name,
					country_name,
					company_name,
				} = contact;
				let template = `	<div class="card">
                <div class="card-header" id="heading-${id}">
                    <h2 class="mb-0">
                        <input type="checkbox"  value="${id}" />
                        <a
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse-${id}"
                            aria-expanded="true"
                            aria-controls="collapse-${id}"
                        >
                            <div>
                                <p>Nombre:</p>
                                <p>${name} ${last_name}</p>
                            </div>
                            <div>
                                <p>Email:</p>
                                <p>${email}</p>
                            </div>
                            <div class="action-buttons">
                                <button class="btn btn-danger" onClick="deleteContact(${id})">Eliminar</button>
                                <button class="btn btn-primary"  onClick="editContact(${id})">Editar</button>
                            </div>
                            <img src="./assets/img/icon-down.svg" alt="flecha abajo" />
                        </a>
                    </h2>
                </div>
                <div id="collapse-${id}" class="collapse" aria-labelledby="heading-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 mb-3">
                                <p>Pais/Región:</p>
                                <p>${city_name}</p>
                                <small>${country_name}</small>
                            </div>
                            <div class="col-6 mb-3">
                                <p>Compañia:</p>
                                <p>${company_name}</p>
                            </div>
                            <div class="col-6  mb-3">
                                <p>Cargo:</p>
                                <p>${occupation}</p>
                            </div>
                            <div class="col-6  mb-3">
                                <p>Direccion:</p>
                                <p>${address}</p>                                
                            </div>
                            <div class="col-6">
                                <p>Telefono:</p>
                                <p>${phone}</p>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
				container.insertAdjacentHTML('beforeend', template);
				let checkboxes = document.getElementById('accordionContact').querySelectorAll("input[type='checkbox']");
				checkboxes.forEach((checkbox) => {
					checkbox.addEventListener('change', (e) => {
						activateButton(e);
					});
				});
			});
		} else if (response.status === 500) {
			alert(data.message);
		} else if (response.status === 401) {
			window.location = '/';
		} else {
			/* window.location = '/'; */
		}
	});
	fetch('http://localhost:3000/company/getall', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();

		let container = document.getElementById('create-contact-company-select');
		let container2 = document.getElementById('edit-contact-company-select');
		data.forEach((company) => {
			let template = `<option value="${company.id}">${company.name}</option>`;
			container.insertAdjacentHTML('beforeend', template);
			container2.insertAdjacentHTML('beforeend', template);
		});
	});
	fetch('http://localhost:3000/location/regions', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();
		let container = document.getElementById('create-contact-region-select');
		let container2 = document.getElementById('edit-contact-region-select');
		data.regions.forEach((region) => {
			let template = `<option value="${region.id}">${region.name}</option>`;
			container.insertAdjacentHTML('beforeend', template);
			container2.insertAdjacentHTML('beforeend', template);
		});
		container.addEventListener('change', (e) => {
			getCountries(e);
		});
		container2.addEventListener('change', (e) => {
			getCountries2(e);
		});
	});

	const getCountries = (e) => {
		let id = e.target.value;
		fetch(`http://localhost:3000/location/${id}/countries`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		}).then(async (response) => {
			let data = await response.json();
			let container = document.getElementById('create-contact-country-select');
			container.innerHTML = '';
			container.insertAdjacentHTML('beforeend', '<option selected>Elija un pais...</option>');
			data.countries.forEach((country) => {
				let template = `<option value="${country.id}">${country.name}</option>`;
				container.insertAdjacentHTML('beforeend', template);
			});
			container.addEventListener('change', (e) => {
				getCities(e);
			});
		});
	};

	const getCountries2 = async (e) => {
		let id = e.target.value;
		let response = await fetch(`http://localhost:3000/location/${id}/countries`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		if (response) {
			let data = await response.json();
			let container = document.getElementById('edit-contact-country-select');
			container.innerHTML = '';
			container.insertAdjacentHTML('beforeend', '<option selected>Elija un pais...</option>');
			data.countries.forEach((country) => {
				let template = `<option value="${country.id}">${country.name}</option>`;
				container.insertAdjacentHTML('beforeend', template);
			});
			container.addEventListener('input', (e) => {
				getCities2(e);
			});
		}
	};
	const getCities = (e) => {
		let id = e.target.value;
		fetch(`http://localhost:3000/location/${id}/cities`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		}).then(async (response) => {
			let data = await response.json();
			let container = document.getElementById('create-contact-city-select');
			container.innerHTML = '';
			container.insertAdjacentHTML('beforeend', '<option selected>Elija una ciudad...</option>');
			data.cities.forEach((city) => {
				let template = `<option value="${city.id}">${city.name}</option>`;
				container.insertAdjacentHTML('beforeend', template);
			});
		});
	};
	const getCities2 = (e) => {
		let id = e.target.value;
		fetch(`http://localhost:3000/location/${id}/cities`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		}).then(async (response) => {
			let data = await response.json();
			let container = document.getElementById('edit-contact-city-select');
			container.innerHTML = '';
			container.insertAdjacentHTML('beforeend', '<option selected>Elija una ciudad...</option>');
			data.cities.forEach((city) => {
				let template = `<option value="${city.id}">${city.name}</option>`;
				container.insertAdjacentHTML('beforeend', template);
			});
		});
	};
}

const activateButton = (e) => {
	let checkboxes = document.getElementById('accordionContact').querySelectorAll("input[type='checkbox']");
	let buttonDelete = document.getElementById('delete-all-selected');
	buttonDelete.removeAttribute('style');
	checkboxes.forEach((checkbox) => {
		if (checkbox.checked) {
			buttonDelete.style.display = 'block';
		}
	});
};
