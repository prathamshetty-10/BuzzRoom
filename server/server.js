import WebSocket from "ws";

const server = new WebSocket.Server({ port: '3000' })

server.on('connection', socket => {
    //listening for a message
    socket.on('message', message => {
        //const b = Buffer.from(message)
        //console.log(b.toString())
        socket.send(`${message}`)//message listened n sent back to whoever sent this
    })
})