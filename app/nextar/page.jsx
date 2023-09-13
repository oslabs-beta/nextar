'use client';

import Link from 'next/link';
// import {performance, PerformanceObserver} from 'perf_hooks';
import Pic from '../../public/next.svg';
import CreateGraph from '@components/CreateGraph';
import { useEffect, useState } from 'react';
import Image from 'next/image'; //review the image documentation
import Logo from '@components/nextar-logo-text-yellow.png';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function Nextar() {
  const [wvObj, setWvObj] = useState({});

  useEffect(() => {
    // thoughts: combine these all as one big metric object with the different web vitals as keys
    // add in the special next.js web vitals

    // get all options for endpoints
    setWvObj(JSON.parse(localStorage.getItem('nextar-web-vitals')));
  }, []);

  window.onstorage = () => {
    // When local storage changes, reset wvObj
    setWvObj(JSON.parse(localStorage.getItem('nextar-web-vitals')));
  };

  const [value, setValue] = useState('/');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const endpoints = Object.keys(wvObj).filter(
    (endpoint) => endpoint !== '/nextar'
  );

  // // get all options for endpoints
  const options = [];
  endpoints.forEach((element) => {
    options.push(<option value={element}>{element}</option>);
  });

  //get arrays from object
  if (!wvObj[value]) {
    return;
  }
  const fcp = wvObj[value].fcp;
  const lcp = wvObj[value].lcp;
  const fid = wvObj[value].fid;
  const cls = wvObj[value].cls;

  const FCPindex = Math.ceil((fcp.length - 1) * 0.75);
  const sortedFcp = [...fcp];
  const FCP75 = sortedFcp.sort((a, b) => a - b)[FCPindex];

  const LCPindex = Math.ceil((lcp.length - 1) * 0.75);
  const sortedLcp = [...lcp];
  const LCP75 = sortedLcp.sort((a, b) => a - b)[LCPindex];

  const FIDindex = Math.ceil((fid.length - 1) * 0.75);
  const sortedFid = [...fid];
  const FID75 = sortedFid.sort((a, b) => a - b)[FIDindex];

  const CLSindex = Math.ceil((cls.length - 1) * 0.75);
  const sortedCls = [...cls];
  const CLS75 = sortedLcp.sort((a, b) => a - b)[CLSindex];

  return (
    <main className={montserrat.className}>
      <div style={{ display: 'flex' }}>
        <Image
          src={Logo}
          alt='Nextar Logo'
          width={88}
          quality={100}
          // placeholder='blur'
        />
        <h1>Web Vitals Dashboard</h1>
      </div>
      <br />
      <div style={{ display: 'flex', marginLeft: '10px' }}>
        Endpoint:&emsp;
        <select value={value} onChange={handleChange}>
          {options}
        </select>
      </div>

      <br />
      <div
        className='webvitals'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div>
          <div>
            <h2>First Contentful Paint (FCP): {FCP75}</h2>
            <CreateGraph array={fcp} />
          </div>
          <div>
            <h2>Largest Contentful Paint (LCP): {LCP75}</h2>
            <CreateGraph array={lcp} />
          </div>
        </div>
        <br />
        <div>
          <div>
            <h2>First Input Delay (FID): {FID75}</h2>
            <CreateGraph array={fid} />
          </div>
          <div>
            <h2>Cumulative Layout Shift(CLS): {CLS75}</h2>
            <CreateGraph array={cls} />
          </div>
        </div>
      </div>
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
  );
}
