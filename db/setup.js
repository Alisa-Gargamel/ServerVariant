const pool = require('./index')

async function createTables(pool) {
    try {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            
        `;
        const createTovarTable = `
            CREATE TABLE IF NOT EXISTS tovar (
                id SERIAL PRIMARY KEY,
                cena VARCHAR(255) NOT NULL,
                razmer VARCHAR(255) NOT NULL,
                sostav VARCHAR(255) NOT NULL,
                kolichestvo INT,
                opisanie VARCHAR(255)                                        
        )`;
        const createKorzinaTable =`
            CREATE TABLE IF NOT EXISTS korzina (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                tovar_id INT NOT NULL,
                summa float NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (tovar_id) REFERENCES tovar (id) ON UPDATE CASCADE ON DELETE CASCADE
        )`;
        const createZakazTable =`
            CREATE TABLE IF NOT EXISTS zakaz (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                korzina_id INT NOT NULL,
                summaItog INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (korzina_id) REFERENCES tovar (id) ON UPDATE CASCADE ON DELETE CASCADE
        )`;


        await pool.query(createUsersTable);
        console.log('Users table created.');

        await pool.query(createTovarTable);
        console.log('Tovar table created.');

        await pool.query(createKorzinaTable);
        console.log('Korzina table created.');

        await pool.query(createZakazTable);
        console.log('Zakaz table created.');
    } catch(error){
        console.error('Error creating tables:', error.message)
    }
}

module.exports = createTables;
