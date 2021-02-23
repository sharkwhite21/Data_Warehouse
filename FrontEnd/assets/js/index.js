let inputs = document.getElementsByTagName('input');
let form = document.getElementById('form-session');
for (let i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('input', (e) => {
		handleInput(e);
	});
}

const handleInput = (e) => {
	let input = e.target;
	let label = input.nextElementSibling;
	if (input.focus() || input.value) {
		label.classList.add('top');
	} else {
		label.classList.remove('top');
	}
};
//Form Validation
form.addEventListener('submit', (e) => {
	submitHandler(e);
});

const submitHandler = (e) => {
	e.preventDefault();
	let form = e.target;
	let inputs = e.target.getElementsByTagName('input');
	if (inputs[0].value && inputs[1].value) {
		hideAlert();
		let data = {
			[inputs[0].name]: inputs[0].value,
			[inputs[1].name]: inputs[1].value,
		};
		fetch('http://localhost:3000/user/access', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async (response) => {
				let data = await response.json();
				if (response.status !== 200) {
					showAlert(data.message);
				} else if (response.status === 200) {
					console.log(data);
					window.localStorage.setItem('token', JSON.stringify(data));
					window.location = '/contactos.html';
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} else {
		showAlert('Por favor ingrese usuario y contraseña');
	}
};
function showAlert(text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-danger">${text}</small>`);
	}
}
function hideAlert() {
	let child = form.getElementsByTagName('small');
	if (child.length) {
		child[0].remove();
	}
}