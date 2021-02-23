let form = document.getElementById('modal-newUser-form');

form.addEventListener('submit', (e) => {
	validateForm(e);
});
const validateForm = (e) => {
	e.preventDefault();
	let form = e.target;
	let inputs = e.target.querySelectorAll('input, select');
	let passInput = document.getElementById('passInput');
	let confirmPass = document.getElementById('confirmPassInput');
	let sendForm = true;
	for (let i = 0; i < inputs.length; i++) {
		let value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert('Por favor llene todos los campos');
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
		hideAlert();
		showAlert('Las contraseñas no coinciden');
	}
	if (sendForm) {
		hideAlert();
		fetchUser(inputs);
	}
};
const fetchUser = (inputs) => {
	let token = JSON.parse(window.localStorage.getItem('token')).token;
	let data = {};
	for (let i = 0; i < inputs.length - 1; i++) {
		data = { ...data, [inputs[i].name]: inputs[i].value };
	}
	fetch('http://localhost:3000/user/create', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status !== 200) {
				showAlert(data.message);
			} else if (response.status === 200) {
				window.location = '/usuarios.html';
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

function showAlert(text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-danger">${text}</small>`);
	}
}
function showAlertSuccess(text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-success">${text}</small>`);
	}
}
function hideAlert() {
	let child = form.getElementsByTagName('small');
	if (child.length) {
		child[0].remove();
	}
}
