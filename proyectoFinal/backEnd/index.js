const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()



let corsOptions = {
    origin: ["http://localhost:4000"],
  };




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const db = require('./database/models');


//routes
require('./routes/index.routes')(app);

db.sequelize.sync({ alter: false }).then(() => {
    console.log('Tablas creadas correctamente');
}
).catch(error => {
    console.log(error);
});
app.listen(3000, () => {
    console.log('Servidor Funcionando');
});