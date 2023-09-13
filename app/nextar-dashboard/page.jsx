'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const socketURL = 'ws://localhost:8000';

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const data = useRef([])
  const firstStartTime = useRef(null);
  const lastEndTime = useRef(null);
  const totalDuration = useRef(0);

  const handleSocket = useCallback(() => {
    const socket = new WebSocket(socketURL);

    socket.onopen = () => {
      console.log('Connection open!')
    };
  
    socket.onmessage = (event) => {
      const span = JSON.parse(event.data)

      data.current.push(span)
      data.current.sort((a,b) => a.startTime - b.startTime)

      if (firstStartTime.current === null || data.current[0].startTime < firstStartTime.current) {
        firstStartTime.current = data.current[0].startTime
      }

      lastEndTime.current = Math.max(...data.current.map(obj => obj.endTime))

      totalDuration.current = lastEndTime.current - firstStartTime.current;

      const newRows = [];

      for (const item of data.current) {
        const row = {...item}
        row.startTime -= firstStartTime.current
        row.totalDuration = totalDuration.current

        console.log('start time', row.startTime, 'row duration', row.duration, 'total duration', totalDuration.current)

        row.coords = []
        const marginLeft = (row.startTime / totalDuration.current) * 100
        const width = (row.duration / totalDuration.current) * 100
        row.coords.push(marginLeft, width)

        console.log(row.coords)

        newRows.push(row)
      }

      setRows(newRows)
    }
  }, [])


  useEffect(() => {
    handleSocket();
  }, []);

  return (
    <div>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Endpoint</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Duration(ms)</TableCell>
                <TableCell>Waterfall</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{row.endpoint}</TableCell>
                  <TableCell>{row.source}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>
                    <div style={{visibility:'visible', marginLeft:`${row.coords[0]}%`, width:`${row.coords[1]}%`, height: '50%', color:'transparent', backgroundColor:'blue'}}>|</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}

export default Dashboard;





