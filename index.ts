import express from 'express';
import connection from './db/db.init';
const app = express();

connection.then(res => {
    console.log('res : ', res)
}).catch(err => {
    console.log('err : ', err);
})


app.get('/', (req, res, next) => {
    res.json({ name: 'hello'})
})

app.listen(process.env.PORT || 5000);