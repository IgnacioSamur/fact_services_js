'use-strict'

const { Pool } = require('pg')

const PostgresProvider = () => {
    let pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        max: 20,
        idleTimeoutMillis: 30000
    })

    //console.log(pool);

    const query = async (sql) => {
        return new Promise((resolve, reject) => {
            pool.connect(function (err, client, done) {
                console.log(client);
                if (err) reject(err)
                client.query(sql, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            });
        })
    }

    return {
        query
    }
}

module.exports = PostgresProvider();
