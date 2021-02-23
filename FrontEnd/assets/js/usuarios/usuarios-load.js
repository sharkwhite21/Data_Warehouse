let data = parseJwt(window.localStorage.getItem('token'));
let token = JSON.parse(window.localStorage.getItem('token')).token;

if (!data || !data.isAdmin) {
	window.location = '/';
} else {
	fetch('http://localhost:3000/user/getall', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();
		if (response.status === 200) {
			let container = document.getElementById('user-list');
			container.innerHTML = '';
			data.forEach((user) => {
				let { id, name, last_name, email, isAdmin } = user;
				if (!isAdmin) {
					isAdmin = 'No';
				} else {
					isAdmin = 'Si';
				}
				let template = `<div class="users-list-item row">
				<div class="col-md-4 mb-2 mb-md-0">
					<p>Nombre</p>
					<p>${name} ${last_name}</p>
				</div>
				<div class="col-md-3 mb-2 mb-md-0">
					<p>correo</p>
					<p>${email}</p>
				</div>
				<div class="col-md-2 mb-2 mb-md-0">
					<p>Admin</p>
					<p>${isAdmin}</p>
				</div>
				<div class="col-md-3 users-list-item-buttons">
					<button class="btn btn-danger mr-2" onClick="deleteUser(${id})">Eliminar</button>
					<button class="btn btn-primary" onClick="editUser(${id})">Editar</button>
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
}
