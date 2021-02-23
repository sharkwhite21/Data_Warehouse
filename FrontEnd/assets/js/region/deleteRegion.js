const deleteRegion = (idRegion) => {
	$('#modal-deleteRegion').modal('show');
	let button = document.getElementById('btn-delete-region');
	button.addEventListener('click', () => {
		regionDelete(idRegion);
	});
};

const regionDelete = (regionId, form) => {
	fetch(`http://localhost:3000/location/region/delete/${regionId}`, {
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
    