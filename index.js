const express = require("express")
const cors = require("cors")
const app = express();
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');



const port = 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models")
db.sequelize.sync()

const contacts = [
  {
    name: "amir",
    phone: "085482938471",
  },
  {
    name: "budi",
    phone: "086452738493",
  },
];

// routes
app.get("/contact", function (req, res) {
  res.send(contacts);
});

app.put("/test/:nama", (req, res) => {
  console.log(req.params.nama);
  const data ={
    "name" : "kelompok 2",
    "message" : "App started"
  }

  res.json(req.params.nama);

//logging
res.json(data);
console.log(data);
console.error("salah");
}); 
  
//Coding Pak Septian
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// const uploadRoutes = require('./app/routes/web1');
// app.use('/api', uploadRoutes);


// secured routes
require("./app/routes/user.route")(app)
require("./app/routes/fasilitas.routes")(app)
require("./app/routes/kamar.routes")(app)
require("./app/routes/JenisKamar.routes")(app)
require("./app/routes/admin.routes")(app)
require("./app/routes/transaksi.routes")(app)


const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});