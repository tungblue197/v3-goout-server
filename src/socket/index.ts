import { Server } from "socket.io";

class SocketServer {
    public io: Server | null = null;
    constructor(io: Server){
        this.io = io;
        console.log(this.io)
    }

}

export default SocketServer;