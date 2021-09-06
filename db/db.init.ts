import { createConnection } from 'typeorm';
import { Location } from '../src/entities/location';
import { Session } from '../src/entities/session';
import { User } from '../src/entities/user';
import { Vote } from '../src/entities/vote';

const connection = createConnection({
    type: 'sqlite',
    database: __dirname + '/db.sqlite',
    synchronize: false,
    logging: true,
    entities: [
        User,
        Location,
        Vote,
        Session
    ]
})

export default connection;