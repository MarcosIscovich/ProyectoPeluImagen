const db = require("../database/models");
const { all } = require("../routes/turno.routes");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

exports.getAllTurnos = (req, res) => {
	db.TurnoModel.findAll({
		include: [
			{
				model: db.ClienteModel,
				as: "cliente",
				attributes: ["nombre"],
			},
			{
				model: db.TrabajoModel,
				as: "trabajo",
				attributes: ["nombre", "precio"],
			},
		],
	})
		.then((turnos) => {
			res.status(200).send(turnos);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
};

exports.getTurno = (req, res) => {
	
	const clienteId = req.params.id;
	db.TurnoModel.findAll({
		where: {
			clienteId,
		},
		include: [
			{
				model: db.ClienteModel,
				as: "cliente",
				attributes: ["nombre"],
			},
			{
				model: db.TrabajoModel,
				as: "trabajo",
				attributes: ["nombre", "precio"],
			},
		],
	})
		.then((turno) => {
			res.status(200).send(turno);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
};

exports.createTurno = (req, res) => {
	try {
		
		const {
			precio,
			hora_desde,
			hora_hasta,
			clienteId,
			trabajoId,
			fecha_concurrencia,
		} = req.body;
		console.log("BODY", fecha_concurrencia);
		db.TurnoModel.create({
			precio,
			fecha_concurrencia,
			hora_desde,
			hora_hasta,
			clienteId,
			trabajoId,
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

exports.updateTurno = (req, res) => {
	try {
		console.log(req.body);
		const {
			id,
			precio,
			hora_desde,
			hora_hasta,
			clienteId,
			trabajoId,
			fecha_concurrencia,
		} = req.body;
		db.TurnoModel.update(
			{
				precio,
				fecha_concurrencia,
				hora_desde,
				hora_hasta,
				clienteId,
				trabajoId,
			},
			{
				where: {
					id,
				},
			}
		)
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

exports.deleteTurno = (req, res) => {
	const id = req.params.id;
	console.log(id);
	db.TurnoModel.destroy({
		where: {
			id,
		},
	})
		.then((turno) => {
			res.status(200).json(turno);
		})
		.catch((error) => {
			res.send(error);
		});
};

exports.turnosSelected = (req, res) => {
  const { fechainicio, fechafin } = req.body;
  console.log("FECHA HOY", fechainicio);
  console.log("FECHA MES", fechafin);
	db.TurnoModel.findAll({
		where: {
			fecha_concurrencia: {
				[Op.between]: [fechainicio, fechafin],
			},
		},
		include: [
			{
				model: db.ClienteModel,
				as: "cliente",
				attributes: ["nombre"],
			},
			{
				model: db.TrabajoModel,
				as: "trabajo",
				attributes: ["nombre", "precio"],
			},
		],
	})
		.then((turnos) => {
			
			res.status(200).send(turnos);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
};
