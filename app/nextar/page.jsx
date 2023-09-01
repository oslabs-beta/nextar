"use client"

import Link from 'next/link'
// import {performance, PerformanceObserver} from 'perf_hooks';
import Pic from '../../public/next.svg'
import Image from 'next/image'
// import { useState, useEffect, useRef } from "react";
import LineChart from '@components/LineChart'

export default function Nextar() {

  // FCP CREATOR
  const fcp = Math.round(JSON.parse(localStorage.getItem('web-vitals-extension-metrics')).fcp.value)
  console.log('test',fcp)

  const fcpArray = JSON.parse(localStorage.getItem('FCParray'));

      let newFCPArray;
      if(fcpArray){
        newFCPArray = [...fcpArray, fcp];
      } else {
        newFCPArray = [fcp];
      }

 localStorage.setItem('FCParray', JSON.stringify(newFCPArray.sort((a,b)=> a-b)));


 const FCPindex = Math.ceil(fcpArray.length*0.75);
 const FCP75 = newFCPArray.sort((a,b)=> a-b)[FCPindex]

  // LCP CREATOR
  const lcp = Math.round(JSON.parse(localStorage.getItem('web-vitals-extension-metrics')).lcp.value)
  console.log('test',lcp)

  const lcpArray = JSON.parse(localStorage.getItem('LCParray'));

      let newLCPArray;
      if(lcpArray){
        newLCPArray = [...lcpArray, lcp];
      } else {
        newLCPArray = [lcp];
      }

 localStorage.setItem('LCParray', JSON.stringify(newLCPArray.sort((a,b)=> a-b)));

 const LCPindex = Math.ceil(lcpArray.length*0.75);
 const LCP75 = newLCPArray.sort((a,b)=> a-b)[LCPindex]

  // CLS CREATOR
  const cls = JSON.parse(localStorage.getItem('web-vitals-extension-metrics')).cls.value
  console.log('test',cls)

  const clsArray = JSON.parse(localStorage.getItem('CLSarray'));

      let newCLSArray;
      if(clsArray){
        newCLSArray = [...clsArray, cls];
      } else {
        newCLSArray = [cls];
      }

 localStorage.setItem('CLSarray', JSON.stringify(newCLSArray.sort((a,b)=> a-b)));

  const CLSindex = Math.ceil(clsArray.length*0.75);
  const CLS75 = (newCLSArray.sort((a,b)=> a-b)[CLSindex]).toFixed(3)

   // FID CREATOR
   const fid = JSON.parse(localStorage.getItem('web-vitals-extension-metrics')).fid.value
   console.log('test',fid)
 
   const fidArray = JSON.parse(localStorage.getItem('FIDarray'));
 
       let newFIDArray;
       if(fidArray){
         newFIDArray = [...fidArray, fid];
       } else {
         newFIDArray = [fid];
       }
 
  localStorage.setItem('FIDarray', JSON.stringify(newFIDArray.sort((a,b)=> a-b)));


  const FIDindex = Math.ceil(fidArray.length*0.75);
  const FID75 = (newFIDArray.sort((a,b)=> a-b)[FIDindex]).toFixed(2)

  console.log('test in nextar dash');

  // const [fid, setFID] = useState(0);
  // const [LCP, setLCP] = useState(0);
  // const [lcpArray, setLcpArray] = useState([]);
  // const [CLS, setCLS] = useState(0);
  // let clsArray = [];

  // useEffect(() => {
  //   //LCP
  //  new PerformanceObserver((entryList) => {
  //     const entry = +(entryList.getEntries()[0].renderTime/1000).toFixed(3);
  //     setLCP(entry);

  //     const myArray = JSON.parse(localStorage.getItem('LCP array'));

  //     let newLCPArray;
  //     if(myArray){
  //       newLCPArray = [...myArray, entry];
  //     } else {
  //       newLCPArray = [entry];
  //     }

  //     setLcpArray(newLCPArray);
    
  //     localStorage.setItem('LCP array', JSON.stringify(newLCPArray));
  //  }).observe({ type: "largest-contentful-paint", buffered: true });

  //     // FID
  //   new PerformanceObserver((entryList) => {
  //      setFID(
  //        entryList.getEntries()[0].processingStart -
  //          entryList.getEntries()[0].startTime
  //      );
  //      localStorage.setItem('fid', Math.round(fid * 10) / 10);
  //    }).observe({ type: 'first-input', buffered: true });


  //    // CLS
  //    new PerformanceObserver((entryList) => {
  //      const entry = +entryList.getEntries()[0].value.toFixed(4);
  //      setCLS(entry);

  //      const clsArray = JSON.parse(localStorage.getItem('CLS array'));

  //     let newCLSArray;
  //     if(clsArray){
  //       newCLSArray = [...clsArray, entry];
  //     } else {
  //       newCLSArray = [entry];
  //     }

  //     localStorage.setItem('CLS array', JSON.stringify(newCLSArray));
  //    }).observe({ type: 'layout-shift', buffered: true });
  //   }, []);

  return (
    <main>
      <h1>Nextar Dashboard</h1>
      <h2>WEB VITALS</h2>
      <LineChart FCP75={FCP75} LCP75={LCP75} CLS75={CLS75} FID75={FID75}/>
      
      
<h2>SERVER NETWORK ACTIVITY</h2>
<table className='table auto sml-6 mr-6 flex flex-wrap'>
          {/* head */}
          <thead className='text-sm '>
            <tr className='sticky'>
              <th className='sticky'>Endpoint</th>
              <th className='sticky'>Type of Request</th>
              <th className='sticky'>Response Status</th>
              <th className='sticky'>Response Size</th>
              <th className='sticky'>Start Time</th>
              <th className='sticky'>Duration</th>
              <th>__</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
          </tbody>
        </table>
    </main>
  )
}


// <div className="card h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
// <h3>FCP</h3>
// <p>{FCP75}</p>
// </div>

// <div className="card">
// <h3>LCP</h3>
// {/* <p>{LCP} s</p> */}
// </div>

// <div className="card">
// <h3>CLS</h3>
// {/* <p>{CLS}</p> */}
// </div>

// <div className="card">
// <h3>FID</h3>
// {/* <p>{fid.toFixed(3)} ms</p> */}
// </div>

// <div className="flex justify-center my-8">
// <Link href="/tickets">
//   <button className="btn-primary">View Tickets</button>
// </Link>
// </div>