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


app.use("/clientes", ClienteRoutes);
app.use("/prodColocado", ProdColRoutes);
app.use("/producto", ProductoRoutes);
app.use("/trabajo", TrabajoRoutes);
app.use("/turno", TurnoRoutes);
app.use("/user",  UserRoutes);
app.use("/login", AuthRoutes);
app.use("/ficha", FichaRoutes);

}
