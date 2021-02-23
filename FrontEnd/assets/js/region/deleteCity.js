const deleteCity = (idCity) => {
	$('#modal-deleteCity').modal('show');
	let button = document.getElementById('btn-delete-city');
	button.addEventListener('click', () => {
		cityDelete(idCity);
	});
};

const cityDelete = (cityId) => {
	fetch(`http://localhost:3000/location/city/delete/${cityId}`, {
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
