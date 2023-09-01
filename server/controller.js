const path = require('path')
const dashboardController = {};

dashboardController.getTraceData = (req, res, next) => {
    try {
      res.sendFile(path.join(__dirname, './models/data.json'))
      
    }
    catch(err) {
        return next(err)
    }
    
}