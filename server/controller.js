const path = require('path')
const util = require('util')
const dashboardController = {};

dashboardController.parseData = (req, res, next) => {
    try {
      span = req.body.resourceSpans[0].scopeSpans[0].spans[0]
      console.log('THESE ARE SPANS!', util.inspect(span, {showHidden: false, depth: null, colors:true}))
      const parsed = {};

        if (span.kind === 2) {
          parsed.id = span.spanId
          parsed.endpoint = span.attributes.find((pair) => pair.key === 'http.target')?.value?.stringValue
          parsed.source = 'Server'
          parsed.status = span.attributes.find((pair) => pair.key === 'http.status_code')?.value?.intValue
          parsed.method = span.attributes.find((pair) => pair.key === 'http.method')?.value?.stringValue
          parsed.startTime = Math.floor(span.startTimeUnixNano / 1e6)
          parsed.endTime = Math.floor(span.endTimeUnixNano / 1e6)
          parsed.duration = Math.floor((span.endTimeUnixNano - span.startTimeUnixNano) / 1e6)
    
          res.locals.parsed = parsed
          return next()
  
        } else if (span.kind === 3) {
          parsed.id = span.spanId
          parsed.endpoint = span.attributes.find((pair) => pair.key === 'net.peer.name')?.value?.stringValue
          parsed.source = 'External API Call'
          parsed.status = span.attributes.find((pair) => pair.key === 'http.status_code')?.value?.intValue
          parsed.method = span.attributes.find((pair) => pair.key === 'http.method')?.value?.stringValue
          parsed.startTime = Math.floor(span.startTimeUnixNano / 1e6)
          parsed.endTime = Math.floor(span.endTimeUnixNano / 1e6)
          parsed.duration = Math.floor((span.endTimeUnixNano - span.startTimeUnixNano) / 1e6)
  
          res.locals.parsed = parsed
          return next();
        }
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