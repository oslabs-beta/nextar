const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const PORT = 8000;
// const dashboardController = require('./controller')

app.use(cors());
app.use(express.json());

// post request from tracing
app.post('/postTraceData', (req, res, next) => {
    console.log('POSTING!', req.body)

    fs.readFile(path.join(__dirname, '../models/data.json'), (err, data) => {
      const json = JSON.parse(data)
      json.push(req.body)
      fs.writeFile(path.join(__dirname, '../models/data.json'), JSON.stringify(json), (err) => {
        if(err) {
          return next(err)
        } else res.status(200).send('Successful!')
      })
    })
    // fs.appendFile(path.join(__dirname,'../models/data.json'),JSON.stringify(req.body), (err) => {
    //   if (err) {
    //     return next(err)
    //   } else res.status(200).send('Successful')
    // })
})

// get request from dashboard
app.get('/traceData', (req, res, next) => {
    console.log('GETTING')
    res.sendFile(path.join(__dirname, '../models/data.json'), (err) => {
      if(err) {
        console.log(err)
        return next(err)
      }
    })
})

// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});