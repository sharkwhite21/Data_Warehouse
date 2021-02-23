const deleteUser = (id) => {
	let token = JSON.parse(window.localStorage.getItem('token')).token;
	fetch(`http://localhost:3000/user/delete/${id}`, {
		method: 'DELETE',
		headers: {
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
