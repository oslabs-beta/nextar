const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const PORT = 8000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server:server})

// const dashboardController = require('./controller')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

wss.on('connection', function connection(ws){
  console.log('CONNECTED TO NEXTAR DASHBOARD!')
})

app.post('/postTraceData', (req, res) => {
  const trace = req.body
  console.log(trace)

  wss.clients.forEach((client) => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(trace))
    }
  })
  res.status(200)
})

// global error handler
app.use('/', (err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


server.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});