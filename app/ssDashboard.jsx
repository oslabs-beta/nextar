import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Box from '@mui/material/Box'
import { MaterialReactTable } from 'material-react-table'

const socketURL = 'ws://localhost:8000';

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const data = useRef([])
  const firstStartTime = useRef(null);
  const lastEndTime = useRef(null);
  const totalDuration = useRef(0);
  const colors = ['green', 'yellow', 'red', 'gray']

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

        row.bgColor = ''

        if (row.status >= 200 && row.status <= 299) {
          row.bgColor = 'green'
        } else if (row.status >= 300 && row.status <= 399) {
          row.bgColor = 'orange'
        } else if (row.status >= 400 && row.status <= 599) {
          row.bgColor = 'red'
        } else {
          row.bgColor = 'gray'
        }

        const mLeft = (row.startTime / totalDuration.current) * 100
        const boxWidth = (row.duration / totalDuration.current) * 100

        row.waterfallBlock = <Box sx={{marginLeft:`${mLeft}%`, width:`${boxWidth}%`, backgroundColor: row.bgColor, color:'transparent'}}>|</Box>

        console.log(row.waterfallBlock)

        newRows.push(row)
      }

      setRows(newRows)
    }
  }, [])


  useEffect(() => {
    handleSocket();
  }, []);

  const columns = useMemo(() => [
    { 
      accessorKey: 'endpoint', 
      header: 'Endpoint',
      size: 100, 
    },
    {
      accessorKey: 'source',
      header: 'Source',
      size: 30,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 30,
    },
    {
      accessorKey: 'method',
      header: 'Method',
      size: 30,
    },
    {
      accessorKey: 'startTime',
      header: 'Start Time (ms)',
      size: 30,
    },
    {
      accessorKey: 'duration',
      header: 'Duration (ms)',
      size: 30,
    },
    {
      accessorKey: 'waterfallBlock',
      header: 'Waterfall',
      size: 250
    }
  ], [],)

  return (
    <MaterialReactTable 
      columns={columns}
      data={rows}
      defaultColumn={{
        maxSize: 500,
        minSize: 15,
      }}
      enableColumnResizing
      columnResizeMode="onChange" 
    />
  );
}

export default Dashboard;
