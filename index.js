const express = require('express')
const {createServer} = require('node:http')
const {Server} = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static('public'))

// io.on('connection', (socket) => {
//   console.log('a user connected')
// })

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})

io.on('connection', (socket) => {
  socket.on('lis', (msg) => {
    io.emit('Lis', msg)
  })
})

io.on('connection', (socket) => {
  socket.on('mad', (msg) => {
    io.emit('Mad', msg)
  })
})

io.on('connection', (socket) => {
  socket.on('bcn', (msg) => {
    io.emit('Bcn', msg)
  })
})
