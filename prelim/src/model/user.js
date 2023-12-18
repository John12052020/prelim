const db = require("../db");

async function insert(data) {
    const result = await db("tbl_user").insert(data);
    return result;
}

async function findById(id) {
    const result = await db("tbl_user").select().where("user_id", id);
    return result;
}

async function findByEmail(email) {
    const result = await db("tbl_user").select().where("email", email);
    return result;
}

async function deleteById(id) {
    const result = await db("tbl_user").delete().where("user_id", id);
    return result;
}

async function updateById(id, data) {
    const result = await db("tbl_user").update(data).where("user_id", id);
    return result;
}

module.exports = {
    insert,
    findById,
    findByEmail,
    deleteById,
    updateById,
};
