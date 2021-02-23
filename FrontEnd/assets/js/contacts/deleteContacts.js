const deleteContact = (idCompany) => {
	$('#modal-deleteContact').modal('show');
	let button = document.getElementById('btn-delete-contact');
	button.addEventListener('click', () => {
		contactDelete([idCompany]);
	});
};

const contactDelete = (companyId) => {
	let data = companyId;
	fetch(`http://localhost:3000/contact/delete`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(data),
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				window.location = '/contactos.html';
			} else if (response.status === 401) {
				window.location = '/';
			} else {
				alert(data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};