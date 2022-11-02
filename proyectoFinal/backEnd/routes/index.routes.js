const verifyToken = require('../middlewares/verifyToken');

module.exports = (app) => {


const ClienteRoutes = require('./cliente.routes');
const ProdColRoutes = require('./prodCol.routes');
const ProductoRoutes = require('./producto.routes');
const TrabajoRoutes = require('./trabajo.routes');
const TurnoRoutes = require('./turno.routes');
const UserRoutes = require('./user.routes');
const AuthRoutes = require('./auth.routes');
const FichaRoutes = require('./ficha.routes');


app.use("/clientes", verifyToken,  ClienteRoutes);
app.use("/prodColocado", verifyToken, ProdColRoutes);
app.use("/productos", verifyToken, ProductoRoutes);
app.use("/servicios", verifyToken, TrabajoRoutes);
app.use("/turnos", verifyToken, TurnoRoutes);
app.use("/user", verifyToken,  UserRoutes);
app.use("/login",  AuthRoutes);
app.use("/fichas", verifyToken, FichaRoutes);

}
