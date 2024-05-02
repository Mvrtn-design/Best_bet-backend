const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const conection = require("./database");
const cors = require('cors');
require('dotenv').config();

const app = express();

const puerto = 3001;

//ajustes
app.set("port", process.env.PORT || puerto); //revisa si hay un puerto en el SO y si no será el 3000

app.listen(puerto, () => {
  console.log(`Running in port ${puerto}`);
  conection.connect(function (err) {
    if (err) throw err;
    console.log("DataBase connected");
  });
});
app.use(express.json());
app.use(cors());
app.use(myConnection(mysql,{
  host:     'm60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  user:     'vevpwwaybqat66vp',
  password: 's5lfcwmln0i58i3l',
  port:     '3306',//puerto por defecto
  database: 'u7gpim5n5ouso5qv'
},'single'/*de que manera se conecta uno al servidor*/))


app.use(express.urlencoded({extended: false}));  

//importando rutas
const rutas = require('./routes/main_routes');


//routes
app.use('/',rutas);
