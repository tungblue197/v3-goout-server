import express from 'express';
import connection from './db/db.init';
import mainRouter from './src/routers'
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();

connection.then(res => {
    console.log('res : ', res)
}).catch(err => {
    console.log('err : ', err);
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(mainRouter)


app.listen(process.env.PORT || 5000);