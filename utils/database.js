const Sequelize = require("sequelize");

const sequelizeConnect = new Sequelize(
    "db_name",
    "db_usename",
    "Password",
    {
        dialect: "mysql",
        host: "sql6.fre******.com",
        // logging:false
    }
);


module.exports = sequelizeConnect;