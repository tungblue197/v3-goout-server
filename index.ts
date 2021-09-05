import express from 'express';
import connection from './db/db.init';
import { User } from './src/entities/user';
const app = express();

connection.then(res => {
    console.log('res : ', res)
}).catch(err => {
    console.log('err : ', err);
})


app.get('/', async (req, res, next) => {
    const result = await User.find()
    return res.json(result)
})

app.listen(process.env.PORT || 5000);