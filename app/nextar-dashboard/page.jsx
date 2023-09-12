'use client'
import React, { useState, useEffect } from 'react'
import ActivityRow from '@components/ActivityRow.jsx'
const socketURL = 'ws://localhost:8000';


const Dashboard = () => {
  const [data, setData] = useState('hi');
  const socket = new WebSocket(socketURL);

  socket.onopen = () => {
    console.log('Connection open!')
  };

  socket.onmessage = (event) => {
    const trace = JSON.parse(event.data)
    console.log('here is the trace data', trace)
    setData(event.data);
  }

  return (
    <div>
        {data}
    </div>
  )
}

export default Dashboard;