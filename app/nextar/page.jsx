"use client"

import Link from 'next/link'
// import {performance, PerformanceObserver} from 'perf_hooks';
import Pic from '../../public/next.svg'
import Image from 'next/image'
import { useState, useEffect, useRef } from "react";

export default function Nextar() {
  console.log('test in nextar dash');

  const [fid, setFID] = useState(0);
  const [LCP, setLCP] = useState(0);
  const [lcpArray, setLcpArray] = useState([]);
  const [CLS, setCLS] = useState(0);
  // let clsArray = [];

  useEffect(() => {
    //LCP
   new PerformanceObserver((entryList) => {
      const entry = +(entryList.getEntries()[0].renderTime/1000).toFixed(3);
      setLCP(entry);

      const myArray = JSON.parse(localStorage.getItem('LCP array'));

      let newLCPArray;
      if(myArray){
        newLCPArray = [...myArray, entry];
      } else {
        newLCPArray = [entry];
      }

      setLcpArray(newLCPArray);
    
      localStorage.setItem('LCP array', JSON.stringify(newLCPArray));
   }).observe({ type: "largest-contentful-paint", buffered: true });

      // FID
    new PerformanceObserver((entryList) => {
       setFID(
         entryList.getEntries()[0].processingStart -
           entryList.getEntries()[0].startTime
       );
       localStorage.setItem('fid', Math.round(fid * 10) / 10);
     }).observe({ type: 'first-input', buffered: true });


     // CLS
     new PerformanceObserver((entryList) => {
       const entry = +entryList.getEntries()[0].value.toFixed(4);
       setCLS(entry);

       const clsArray = JSON.parse(localStorage.getItem('CLS array'));

      let newCLSArray;
      if(clsArray){
        newCLSArray = [...clsArray, entry];
      } else {
        newCLSArray = [entry];
      }

      localStorage.setItem('CLS array', JSON.stringify(newCLSArray));
     }).observe({ type: 'layout-shift', buffered: true });
    }, []);

  return (
    <main>
      <img
        src={Pic}
        alt='big pic'
      />
      <h2>Nextar Dashboard</h2>
      <p>Search Engine Optimization</p>
 
      <div className="card h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h3>FCP</h3>
        <p>FCP Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam. Dolores omnis possimus quam soluta rerum illo laborum ullam pariatur molestiae, modi beatae corrupti.</p>
      </div>

      <div className="card">
        <h3>LCP</h3>
        <p>{LCP} s</p>
      </div>

      <div className="card">
        <h3>CLS</h3>
        <p>{CLS}</p>
      </div>

      <div className="card">
        <h3>FID</h3>
        <p>{fid.toFixed(3)} ms</p>
      </div>

      <div className="flex justify-center my-8">
        <Link href="/tickets">
          <button className="btn-primary">View Tickets</button>
        </Link>
      </div>


      
    </main>
  )
}