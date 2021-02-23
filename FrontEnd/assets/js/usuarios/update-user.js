const editUser = (id) => {
	let token = JSON.parse(window.localStorage.getItem('token')).token;
	let form = document.getElementById('modal-editUser-form');
	fetch(`http://localhost:3000/user/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status !== 200) {
				showAlertEdit(data.message);
			} else if (response.status === 200) {
				putValues(data, form);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
function putValues(data, form) {
	let inputs = form.querySelectorAll('input ,select');
	if (data.isAdmin === 0) {
		data.user.isAdmin = false;
	} else {
		data.user.isAdmin = true;
	}
	for (let i = 0; i < inputs.length; i++) {
		switch (inputs[i].name) {
			case 'name':
				inputs[i].value = data.user.name;
				break;
			case 'last_name':
				inputs[i].value = data.user.last_name;

				break;
			case 'email':
				inputs[i].value = data.user.email;
				break;
			case 'isAdmin':
				inputs[i].value = data.user.isAdmin;
				break;

			default:
				break;
		}
	}
	$('#modal-editUser').modal('show');
	const { id } = data.user;
	form.addEventListener('submit', (e) => {
		validateFormEdit(e, id);
	});
}
const validateFormEdit = (e, id) => {
	e.preventDefault();
	let form = e.target;
	let inputs = e.target.querySelectorAll('input, select');
	let passInput = document.getElementById('passInput');
	let confirmPass = document.getElementById('confirmPassInput');
	let sendForm = true;
	for (let i = 0; i < inputs.length - 2; i++) {
		let value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlertEdit('Por favor llene todos los campos');
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
	if (passInput.value !== confirmPass.value) {
		sendForm = false;
		hideAlertEdit();
		showAlertEdit('Las contraseñas no coinciden');
	}
	if (sendForm) {
		hideAlertEdit();
		updateUser(inputs, id);
	}
};
const updateUser = (inputs, id) => {
	let token = JSON.parse(window.localStorage.getItem('token')).token;
	let data = {};
	for (let i = 0; i < inputs.length - 1; i++) {
		data = { ...data, [inputs[i].name]: inputs[i].value };
	}
	fetch(`http://localhost:3000/user/update/${id}`, {
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
				showAlertEdit(data.message);
			} else if (response.status === 200) {
				window.location = '/usuarios.html';
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
function showAlertEdit(text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-danger">${text}</small>`);
	}
}
function hideAlertEdit() {
	let child = form.getElementsByTagName('small');
	if (child.length) {
		child[0].remove();
	}
}
