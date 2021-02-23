const express = require("express");
const autenticate = require("../../middlewares/autentication");

const { 
    getAllContacts, 
    getContact, 
    updateContactById, 
    deleteContactById, 
    createContact 
} = require("./controller");

//USERS ROUTES

const router = express.Router();

router.get('/getall', autenticate, (req, res) => {
	getAllContacts()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:id', (req, res) => {
	const { id } = req.params;
	getContact(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/create', autenticate, (req, res) => {
	const reqUser = req.body;
	createContact(reqUser)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.patch('/update/:id', autenticate, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	console.log(data);
	updateContactById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/delete/', autenticate, (req, res) => {
	const data = req.body;
	deleteContactById(data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

module.exports = router;