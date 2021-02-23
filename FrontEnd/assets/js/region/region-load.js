let data = parseJwt(window.localStorage.getItem('token'));
let token = JSON.parse(window.localStorage.getItem('token')).token;
if (!data || !token) {
	window.location = '/';
} else {
	if (!data.isAdmin) {
		let usuarios = document.getElementById('user-nav-button');
		usuarios.style.display = 'none';
	}
	fetch('http://localhost:3000/location/regions', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();

		if (response.status === 200) {
			let select = document.getElementById('edit-country-modal-select');
			data.regions.forEach((region) => {
				let regionContainer = document.getElementById('accordionRegion');
				let template = `<div class="card">
				<div class="card-header" id="region${region.id}-heading">
					<h2 class="mb-0">
						<a
							class="btn btn-link btn-block text-left collapsed"
							type="button"
							data-toggle="collapse"
							data-target="#region${region.id}"
							aria-expanded="true"
							aria-controls="region${region.id}"
						>
							<p>${region.name}</p>
							<div class="buttons">
								<button class="btn btn-primary mr-2" onClick=editRegion(${region.id})>Editar</button>
								<button class="btn btn-danger mr-2"  onClick=deleteRegion(${region.id})>Eliminar</button>
								<button class="btn btn btn-success mr-2" onClick=addCountry(${region.id})>
									Agregar Pais
								</button>
							</div>
							<img src="./assets/img/icon-down.svg" alt="flecha abajo" />
						</a>
					</h2>
				</div>
				<div id="region${region.id}" class="collapse" aria-labelledby="region${region.id}-heading">
					<div class="card-body" id="card-body-region${region.id}">
			
						
					</div>
				</div>
			</div>`;
				regionContainer.insertAdjacentHTML('beforeend', template);
				select.insertAdjacentHTML('beforeend', `<option value="${region.id}">${region.name}</option>`);
				getCountries(region);
			});
		} else if (response.status === 500) {
			alert(data.message);
		} else {
			window.location = '/';
		}
	});
}
const getCountries = (region) => {
	fetch(`http://localhost:3000/location/${region.id}/countries`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let select = document.getElementById('edit-city-modal-select');
		let data = await response.json();
		if (response.status === 200) {
			data.countries.forEach((country) => {
				let container = document.getElementById(`card-body-region${region.id}`);
				let template = `<div class="card">
				<div class="card-header" id="region${region.id}-country${country.id}-heading">
					<h2 class="mb-0">
						<a
							class="btn btn-link btn-block text-left collapsed"
							type="button"
							data-toggle="collapse"
							data-target="#region${region.id}-country${country.id}"
							aria-expanded="true"
							aria-controls="collapse-1"
						>
							<p>${country.name}</p>
							<div class="buttons">
								<button class="btn btn-primary mr-2" onClick=editCountry(${country.id})>Editar</button>
								<button class="btn btn-danger mr-2"  onClick=deleteCountry(${country.id})>Eliminar</button>
								<button class="btn btn btn-success mr-2" onClick=addCity(${country.id})>
									Agregar Ciudad
								</button>
							</div>
							<img src="./assets/img/icon-down.svg" alt="flecha abajo" />
						</a>
					</h2>
				</div>
				<div id="region${region.id}-country${country.id}" class="collapse" aria-labelledby="region${region.id}-country${country.id}-heading">
					<div class="card-body" id="card-body-region${region.id}-country${country.id}"></div>
				</div>
			</div>`;
				container.insertAdjacentHTML('beforeend', template);
				select.insertAdjacentHTML('beforeend', `<option value="${country.id}">${country.name}</option>`);
				getCities(country.id, region.id);
			});
		} else if (response.status === 500) {
			alert(data.message);
		} else {
			window.location = '/';
		}
	});
};
const getCities = (idCountry, idRegion) => {
	fetch(`http://localhost:3000/location/${idCountry}/cities`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();

		if (response.status === 200) {
			let container = document.getElementById(`card-body-region${idRegion}-country${idCountry}`);

			data.cities.forEach((city) => {
				let template = `	<div class="accordion-deep">
				<p>${city.name}</p>
				<div class="buttons">
					<button class="btn btn-primary mr-2" onClick=editCity(${city.id})>Editar</button>
					<button class="btn btn-danger mr-2"  onClick=deleteCity(${city.id})>Eliminar</button>
				</div>
			</div>`;
				container.insertAdjacentHTML('beforeend', template);
			});
		} else if (response.status === 500) {
			alert(data.message);
		} else {
			window.location = '/';
		}
	});
};