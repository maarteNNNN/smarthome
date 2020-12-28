const sccClient = require('socketcluster-client')

const socket = sccClient.create({
  hostname: '192.168.31.38',
  port: 8000,
})

socket.connect()

;(async () => {
  for await (let { error } of socket.listener('error')) {
    console.error(error)
  }
})()

;(async () => {
  for await (let event of socket.listener('connect')) {
    console.log('Socket is connected')
  }
})()
