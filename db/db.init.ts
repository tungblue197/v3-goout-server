import { createConnection } from 'typeorm';

const connection = createConnection({
    type: 'sqlite',
    database: './db/db.sqlite',
    synchronize: true,
    logging: true
})

export default connection;