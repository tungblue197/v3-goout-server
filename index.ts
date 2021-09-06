import express, { ErrorRequestHandler } from 'express';
import connection from './db/db.init';
import mainRouter from './src/routers'
import bodyParser from 'body-parser';
import cors from 'cors'
import socketIO, { Socket } from 'socket.io'
import http from 'http'
import SocketServer from './src/socket';
import { User } from './src/entities/user';
import { Session } from './src/entities/session';
const app = express();
const server = http.createServer(app)

const io = new socketIO.Server(server, {
    cors: {
        origin: '*'
    }
});

connection.then(async res => {
    console.log('res : ----------->')
}).catch(err => {
    console.log('err : ', err);
})

let rooms: any = {};
//<---------socket io ------->

io.on('connection', socket => {
    socket.on('join', async (data: { userId: string, sessionId: string }, cb) => {
        try {
            const { sessionId, userId } = data;
            if (!sessionId || !userId) return;
            if (rooms[sessionId] && userId) {
                //có
                const userExist = rooms[sessionId].users.find((u: any) => u === userId);
                if (!userExist) {
                    rooms[sessionId].users.push(userId)
                    const users = await User.findByIds(rooms[sessionId].users)
                    console.log(users)
                    socket.join(sessionId)
                    cb(rooms[sessionId], users);
                    socket.broadcast.to(sessionId).emit('joined', rooms[sessionId], users);
                }
            } else {
                //không
                if (!userId && !sessionId) return;
                rooms[sessionId] = {
                    votes: [],
                    users: [userId]
                }
                Session.findOne({ id: sessionId }).then(s => {
                    if (s) {
                        let second = (s.timeout || 0) * 60
                        if (second > 0) {
                            const interval = setInterval(() => {
                                second--;
                                io.to(sessionId).emit('countdown', second)
                                if (second <= 0) {
                                    clearInterval(interval)
                                }
                            }, 1000)
                        }
                    }
                })
                const users = await User.findByIds(rooms[sessionId].users)
                socket.join(sessionId)

                cb(rooms[sessionId], users);
                socket.broadcast.to(sessionId).emit('joined', rooms[sessionId], users);
            }
        } catch (error) {
            cb(null, null)
        }
        socket.on('vote', ({ userId, locationId, sessionId }: { userId: string, locationId: string, sessionId: string }) => {
            if(!rooms[sessionId]) return;
            if (userId && locationId && sessionId) {
                const userVoted = rooms[sessionId].votes.find((v: any) => v.userId === userId);
                if (userVoted) {
                    rooms[sessionId] = rooms[sessionId].votes.map((v: any) => {
                        if(v.userId === userId) return ({ ...v, locationId })
                        return v
                    })
                }else{
                    rooms[sessionId].votes.push({ userId, locationId})
                }
                io.to(sessionId).emit('voted', rooms[sessionId])
            }

        })
    })
})

//<---------end socket io ------>





app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(mainRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
        return res.status(500).json(err);
    } else {
        return res.status(500).json('unknow');
    }
}


app.use(errorHandler);

server.listen(process.env.PORT || 5000);