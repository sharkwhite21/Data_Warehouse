const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//ENV
const config = require('./config/index');
//Routes
const userRoutes = require('./componentes/usuarios/network');
const locationRoutes = require('./componentes/ubicacion/network');
const companyRoutes = require('./componentes/compania/network');
const contactRoutes = require('./componentes/contactos/network');

//Database
const db = require('./database/index');

//Express
const app = express();
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'by-content-type' }));
app.use(cors());
app.options('*', cors());
app.use(express.json());

//Routes Implementacion
app.use('/user', userRoutes);
app.use('/location', locationRoutes);
app.use('/company', companyRoutes);
app.use('/contact', contactRoutes);

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(':(');
});

//SERVER PORT
app.listen(config.port, () => {
	console.log(`Api escuchando en http://localhost:${config.port}`);
});