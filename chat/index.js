import { Server } from "socket.io";
const io = new Server(server);
io.listen(8000);

const users = {}

io.on("connection", socket => {
    socket.on("new-user-joined", name => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name)
    })

    socket.on('send', message => {
        socket.broadcast.emit("recieve", {message : message, name : user[socket.id]})
})})