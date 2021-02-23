const deleteCompany = (idCompany) => {
	$('#modal-deleteCompany').modal('show');
	let button = document.getElementById('btn-delete-company');
	button.addEventListener('click', () => {
		companyDelete(idCompany);
	});
};

const companyDelete = (companyId) => {
	fetch(`http://localhost:3000/company/delete/${companyId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				window.location = '/companias.html';
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
