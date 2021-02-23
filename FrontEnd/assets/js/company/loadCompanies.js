let data = parseJwt(window.localStorage.getItem('token'));
let token = JSON.parse(window.localStorage.getItem('token')).token;

if (!data || !token) {
	window.location = '/';
} else {
	if (!data.isAdmin) {
		let usuarios = document.getElementById('user-nav-button');
		usuarios.style.display = 'none';
	}
	fetch('http://localhost:3000/company/getall', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();
		if (response.status === 200) {
			let container = document.getElementById('company-list');

			container.innerHTML = '';
			data.forEach((company) => {
				let { id, name, address, email, city_name, country_name, phone } = company;
				let template = `<div class="company-list-item row">
				<div class="col-md-4 mb-2 mb-md-0">
					<p>${name}</p>
					<p>${email}</p>
				</div>
				<div class="col-md-3 mb-2 mb-md-0">
					<p>${city_name}</p>
					<p>${country_name}</p>
				</div>
				<div class="col-md-2 mb-2 mb-md-0">
					<p>${address}</p>
					<p>${phone}</p>
				</div>
				<div class="col-md-3 company-list-item-buttons">
					<button class="btn btn-danger" onClick="deleteCompany(${id})">Eliminar</button>
					<button class="btn btn-primary" onClick="editCompany(${id})">Editar</button>
				</div>
			</div>`;
				container.insertAdjacentHTML('beforeend', template);
			});
		} else if (response.status === 500) {
			alert(data.message);
		} else if (response.status === 401) {
			window.location = '/';
		} else {
			/* window.location = '/'; */
		}
	});
	fetch(`http://localhost:3000/location/cities`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();
		let container = document.getElementById('city-Input-create-company');
		let container2 = document.getElementById('city-input-edit-company');
		container.innerHTML = '';
		data.cities.forEach((city) => {
			let template = `<option value="${city.id}">${city.name}</option>`;
			container.insertAdjacentHTML('beforeend', template);
			container2.insertAdjacentHTML('beforeend', template);
		});
	});
}
