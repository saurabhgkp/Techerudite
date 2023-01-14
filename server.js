const express = require('express')
const cors = require('cors')
const app = express()
var logger = require("morgan");
var sequelize = require("./utils/database");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(logger("dev"));

// routers
const router = require('./routes/user')
app.use('/user', router)





const PORT = process.env.PORT || 8080







// sequelize
//   .sync({ alter: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})