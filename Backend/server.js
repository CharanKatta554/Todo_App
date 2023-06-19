const express = require("express");
const cors = require("cors");
const todoRouter=require("./app/routes/todo.routes");
require('./app/redis/todo.redis');
const app = express();
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// var corsOptions = {
//   origin: "http://localhost:8081"
// };    

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use('/api', todoRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});