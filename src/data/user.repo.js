'use-strict'

const mysql = require('mysql');
const provider = require('./providers/postgres_provider');

const UserRepo = () => {
    const findAllUsers = async () => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");

            // con PostgresProvider providers
            let users = await provider.query("SELECT * FROM facturas");
            return users.rows;
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    const createUser = async ({ name, email, password }) => {
        try {
            // con MySQL providers
            // let sql = mysql.format("INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [name, email, password]);

            // con MySQL providers
            // return result.affectedRows > 0 ? {
            //     id: result.insertId, name, email, password
            // } : null;

            // con PostgresProvider providers
            let sql = mysql.format("INSERT INTO users(name, email, password) VALUES (?, ?, ?) RETURNING id", [name, email, password]);
            const result = await provider.query(sql);
            return result.rowCount > 0 ? {
                id: result.rows[0].id, name, email, password
            } : null;

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    return {
        findAll: findAllUsers,
        create: createUser,
    }
}

module.exports = UserRepo();