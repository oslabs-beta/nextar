'use client'
import React, { useState, useEffect } from 'react'
import ActivityRow from '@components/ActivityRow.jsx'


const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(async() => {
        try {
            console.log('fetching data')
            const results = [];
            const response = await fetch('http://localhost:8000/traceData');
            const traces = await response.json();
    
            for (let trace of traces) {
                const result = {};
                result.requestName = trace.resourceSpans[0].scopeSpans[0].spans[0].attributes[3].value.stringValue
                result.origin = trace.resourceSpans[0].scopeSpans[0].spans[0].kind
                result.startTime = trace.resourceSpans[0].scopeSpans[0].spans[0].startTimeUnixNano
                result.endTime = trace.resourceSpans[0].scopeSpans[0].spans[0].endTimeUnixNano
                result.httpMethod = trace.resourceSpans[0].scopeSpans[0].spans[0].attributes[2].value.stringValue
                result.httpStatus = trace.resourceSpans[0].scopeSpans[0].spans[0].attributes[4].value.intValue
                results.push(result)
            }
            setData(() => [...results])
          }
          catch(error) {
            console.log(error)
          }
    }, 10000)
    console.log('data', data)
    return () => clearInterval(interval)
  }, [data])


  return (
    <div>
        <table>
            <thead>
                <tr>
                  <th>Resource</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Kind</th>
                  <th>Duration</th>
                </tr>
                {data.map((datem, index) => (
                    <ActivityRow key={index} result={datem}/>
                ))}
            </thead>
        </table>
    </div>
  )
}

export default Dashboard;