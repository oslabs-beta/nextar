'use client';

import Link from 'next/link';
// import {performance, PerformanceObserver} from 'perf_hooks';
import Pic from '../../public/next.svg';
import CreateGraph from '@components/CreateGraph';
import NewGraph from '@components/NewGraph';
import { useEffect, useState } from 'react';
import Image from 'next/image'; //review the image documentation
import Logo from '@components/nextar-logo-text-yellow.png';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function Nextar() {
  const thresholds = {
    fcp: { ni: 1800, poor: 3000, unit: 'ms' },
    lcp: { ni: 2500, poor: 4000, unit: 'ms' },
    cls: { ni: 0.1, poor: 0.25, unit: '' },
    fid: { ni: 100, poor: 300, unit: 'ms' },
    inp: { ni: 200, poor: 500, unit: 'ms' },
    ttfb: { ni: 800, poor: 1800, unit: 'ms' },
  };
  console.log(thresholds);

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

  const clearLS = () => {
    localStorage.setItem('nextar-web-vitals', JSON.stringify({}));
    setWvObj(JSON.parse(localStorage.getItem('nextar-web-vitals')));
  };

  const [value, setValue] = useState('/');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const endpoints = Object.keys(wvObj)
    .filter((endpoint) => endpoint !== '/nextar')
    .sort();

  // // get all options for endpoints
  const options = [];
  endpoints.forEach((element) => {
    options.push(<option value={element}>{element}</option>);
  });

  //get arrays from object
  if (!wvObj[value]) {
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
          &emsp;
          <button onClick={() => clearLS()} className={montserrat.className}>
            Clear Local Storage
          </button>
        </div>
      </main>
    );
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
  const CLS75 = sortedCls.sort((a, b) => a - b)[CLSindex];

  return (
    <main
      className={montserrat.className}
      style={{ backgroundColor: '#ffffea' }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            // position: 'fixed',
          }}
        >
          <Image
            src={Logo}
            alt='Nextar Logo'
            width={88}
            quality={100}
            // placeholder='blur'
          />
          <h1 style={{ fontWeight: 'bold' }}>Web Vitals Dashboard</h1>
        </div>
        <hr />
        <br />
        <div style={{ display: 'flex', marginLeft: '10px', marginTop: '10px' }}>
          Endpoint:&emsp;
          <select
            value={value}
            onChange={handleChange}
            style={{ width: '200px' }}
          >
            {options}
          </select>
          &emsp;
          <button onClick={() => clearLS()} className={montserrat.className}>
            Clear Local Storage
          </button>
        </div>
      </div>

      <br />
      <div
        className='webvitals'
        style={{
          display: 'flex',
          // flexDirection: 'row',
          justifyContent: 'space-around',
          // background: 'blue',
          flexWrap: 'wrap',
          margin: '25px',
          height: window.outerHeight,
        }}
      >
        <div>
          <h5>First Contentful Paint (FCP): {FCP75} ms</h5>
          <NewGraph
            array={fcp}
            ni={thresholds.fcp.ni}
            poor={thresholds.fcp.poor}
          />
        </div>
        <div>
          <h5>Largest Contentful Paint (LCP): {LCP75}</h5>
          <NewGraph
            array={lcp}
            ni={thresholds.lcp.ni}
            poor={thresholds.lcp.poor}
          />
        </div>
        <div>
          <h5>First Input Delay (FID): {FID75}</h5>
          <NewGraph
            array={fid}
            ni={thresholds.fid.ni}
            poor={thresholds.fid.poor}
          />
        </div>
        <div>
          <h5>Cumulative Layout Shift(CLS): {CLS75}</h5>
          <NewGraph
            array={cls}
            ni={thresholds.cls.ni}
            poor={thresholds.cls.poor}
          />
        </div>
      </div>
    </main>
  );
}
