require("dotenv").config();

module.exports = {
    development: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "tamko_project_database_development",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql",
    },
};
