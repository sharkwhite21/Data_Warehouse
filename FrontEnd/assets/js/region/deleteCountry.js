const deleteCountry = (idCountry) => {
	$('#modal-deleteCountry').modal('show');
	let button = document.getElementById('btn-delete-country');
	button.addEventListener('click', () => {
		countryDelete(idCountry);
	});
};

const countryDelete = (countryId) => {
	fetch(`http://localhost:3000/location/country/delete/${countryId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				window.location = '/region.html';
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
