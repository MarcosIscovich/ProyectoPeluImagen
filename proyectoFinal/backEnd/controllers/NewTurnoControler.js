const db = require("../database/models");
const { all } = require("../routes/newturno.routes");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

exports.createNewTurno = async (req, res) => { 
    
	try {
		const { nombre, telefono, fecha } = req.body;

		db.NewTurno.create({
			nombre,
            telefono,
            fecha
		})
			.then((turno) => {
				res.status(200).send(turno);
			})
			.catch((error) => {
				res.status(500).send(error);
			});
	} catch (error) {
		res.status(500).send(error);
	}
};