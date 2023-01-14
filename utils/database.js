const Sequelize = require("sequelize");

const sequelizeConnect = new Sequelize(
    "sql6590547",
    "sql6590547",
    "GjSYB4ZH6g",
    {
        dialect: "mysql",
        host: "sql6.freesqldatabase.com",
        // logging:false
    }
);


module.exports = sequelizeConnect;