const knex = require("knex");

const db = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        database: "user_express"
    }
});

module.exports = db;
