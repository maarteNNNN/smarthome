const sccClient = require('socketcluster-client')
const pins = require('../pins')

const socket = sccClient.create({
  hostname: '192.168.31.248',
  port: 8000,
})

socket.connect()

var gpio = require('gpio')
var gpio7 = gpio.export(7, {
  direction: gpio.DIRECTION.IN,
  ready: function () {
    console.log('ready')
  },
})

gpio7.on("change", function(val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log(val)
  socket.invoke(pins[7 - 1].name, { data: val })
});

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
