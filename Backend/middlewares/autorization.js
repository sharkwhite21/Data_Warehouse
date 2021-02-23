const autorization = (req, res, next) => {
	const { isAdmin } = req.user;
	if (isAdmin !== 1) {
		res.status(403).json({ message: 'no tiene permiso para acceder' });
	} else {
		next();
	}
};
module.exports = autorization;