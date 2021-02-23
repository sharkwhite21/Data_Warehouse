const express = require("express");
const autenticate = require("../../middlewares/autentication");
const autorization = require("../../middlewares/autorization")

const { 
	createUser, 
	loginUser, 
	updateUserById, 
	deleteUserById, 
	getAllUsers, 
	getUser 
} = require("./controller");

//USERS ROUTES
const router = express.Router();

router.get('/getall', autenticate, autorization, (req, res) => {
	getAllUsers()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:id', (req, res) => {
	const { id } = req.params;
	getUser(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/create', autenticate, autorization, (req, res) => {
	const reqUser = req.body;
	createUser(reqUser)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.post('/access', (req, res) => {
	console.log(req.body);
	const { password, email } = req.body;
	loginUser(password, email)
		.then((jwt) => {
			res.status(200).json(jwt);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.patch('/update/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	console.log(data);
	updateUserById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/delete/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	console.log(id);
	deleteUserById(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

module.exports = router;