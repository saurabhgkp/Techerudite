const sequelize = require("../utils/database");
const { Sequelize } = require("sequelize");

const User = sequelize.define("Users", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },

    fName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    uniqueString: {
        type: Sequelize.STRING,

    },
    isVerified: {
        type: Sequelize.BOOLEAN, //  after user verified true   
        defaultValue: false,
    },

});
module.exports = User;




