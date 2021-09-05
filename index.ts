import express from 'express';
import connection from './db/db.init';
import { User } from './src/entities/user';
import mainRouter from './src/routers'
const app = express();

connection.then(res => {
    console.log('res : ', res)
}).catch(err => {
    console.log('err : ', err);
})

app.use(mainRouter)


app.listen(process.env.PORT || 5000);