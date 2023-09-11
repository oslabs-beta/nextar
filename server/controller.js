const path = require('path')
const util = require('util')
const dashboardController = {};

dashboardController.parseData = (req, res, next) => {
    try {
      spans = req.body.resourceSpans[0].scopeSpans[0].spans
      // console.log('THESE ARE SPANS!', util.inspect(spans, {showHidden: false, depth: null, colors:true}))

      spans.forEach((span) => {
        const parsed = {};

        if (span.kind === 2) {
        
          parsed.endpoint = span.attributes.find((pair) => pair.key === 'http.target')?.value?.stringValue
          parsed.status = span.attributes.find((pair) => pair.key === 'http.status_code')?.value?.intValue
          parsed.method = span.attributes.find((pair) => pair.key === 'http.method')?.value?.stringValue
          parsed.startTime = span.startTimeUnixNano
          parsed.endTime = span.endTimeUnixNano
          parsed.duration = parsed.endTime - parsed.startTime 
    
          res.locals.parsed = parsed
          return next()
  
        } else if (span.kind === 3) {
  
          parsed.endpoint = span.attributes.find((pair) => pair.key === 'net.peer.name')?.value?.stringValue
          parsed.status = span.attributes.find((pair) => pair.key === 'http.status_code')?.value?.intValue
          parsed.method = span.attributes.find((pair) => pair.key === 'http.method')?.value?.stringValue
          parsed.startTime = span.startTimeUnixNano
          parsed.endTime = span.endTimeUnixNano
          parsed.duration = parsed.endTime - parsed.startTime
  
          res.locals.parsed = parsed
          return next();
        }

      }) 
    }
   catch(error) {
    const err = {
        log: "Error occurred in parseData middleware" + error,
        status: 500,
        message: {err: "Unknown server error"}
    }
    return next(err)
   }
};

module.exports = dashboardController;