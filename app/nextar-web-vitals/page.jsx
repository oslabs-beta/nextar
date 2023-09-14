'use client';

import Link from 'next/link';
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
    .filter((endpoint) =>(endpoint !== '/nextar-dashboard'))
    .filter((endpoint) =>(endpoint !== '/nextar-web-vitals'))
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
  const inp = wvObj[value].inp;
  const ttfb = wvObj[value].ttfb;

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

  const INPindex = Math.ceil((inp.length - 1) * 0.75);
  const sortedInp = [...inp];
  const INP75 = sortedInp.sort((a, b) => a - b)[INPindex];

  const TTFBindex = Math.ceil((ttfb.length - 1) * 0.75);
  const sortedTtfb = [...ttfb];
  const TTFB75 = sortedTtfb.sort((a, b) => a - b)[TTFBindex];

  return (
    <main
      className={montserrat.className}
      style={{ backgroundColor: '#ffffea', height: window.outerHeight }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            // position: 'sticky',
            // top: '0',
            // backgroundColor: 'white'
          }}
        >
          <Image
            src={Logo}
            alt='Nextar Logo'
            width={88}
            quality={100}
            // placeholder='blur'
          />
          <h1>Web Vitals Dashboard</h1>
        </div>
        <hr />
        <br />
        <div
          style={{
            display: 'flex',
            marginLeft: '10px',
            marginTop: '10px',
            fontSize: '1.4rem',
          }}
        >
          Endpoint:&emsp;
          <select
            value={value}
            onChange={handleChange}
            style={{ width: '200px', fontSize: '1rem', padding: '1px' }}
            className={montserrat.className}
          >
            {options}
          </select>
          &emsp; &emsp;
          <button
            onClick={() => clearLS()}
            className={montserrat.className}
            style={{ fontSize: '1.1rem' }}
          >
            Clear Local Storage
          </button>
        </div>
      </div>
      <br />

      <div style={{ marginLeft: '20px' }}>
        <h2>CORE WEB VITALS</h2>
      </div>
      <div className='webvitals'>
        <div
          style={{
            display: 'flex',
            // flexDirection: 'row',
            justifyContent: 'space-around',
            // background: 'blue',
            flexWrap: 'wrap',
            // margin: '25px',
          }}
        >
          <div>
            <h3>Largest Contentful Paint (LCP)</h3>
            <h4>
              75th Percentile: {LCP75} {thresholds.lcp.unit}
            </h4>
            <h4>
              Most Recent: {lcp[lcp.length - 1]} {thresholds.lcp.unit}
            </h4>
            <NewGraph
              array={lcp}
              ni={thresholds.lcp.ni}
              poor={thresholds.lcp.poor}
            />
          </div>
          <div>
            <h3>Cumulative Layout Shift (CLS)</h3>
            <h4>
              75th Percentile: {CLS75} {thresholds.cls.unit}
            </h4>
            <h4>
              Most Recent: {cls[cls.length - 1]} {thresholds.cls.unit}
            </h4>
            <NewGraph
              array={cls}
              ni={thresholds.cls.ni}
              poor={thresholds.cls.poor}
            />
          </div>
          <div>
            <h3>First Input Delay (FID)</h3>
            <h4>
              75th Percentile: {FID75} {thresholds.fid.unit}
            </h4>
            <h4>
              Most Recent: {fid[fid.length - 1]} {thresholds.fid.unit}
            </h4>
            <NewGraph
              array={fid}
              ni={thresholds.fid.ni}
              poor={thresholds.fid.poor}
            />
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ marginLeft: '20px' }}>
          <hr />
          <h2>OTHER WEB VITALS</h2>
        </div>
        <div
          style={{
            display: 'flex',
            // flexDirection: 'row',
            justifyContent: 'space-around',
            // background: 'blue',
            flexWrap: 'wrap',
            // margin: '25px',
          }}
        >
          <div>
            <h3>First Contentful Paint (FCP)</h3>
            <h4>
              75th Percentile: {FCP75} {thresholds.fcp.unit}
            </h4>
            <h4>
              Most Recent: {fcp[fcp.length - 1]} {thresholds.fcp.unit}
            </h4>
            <NewGraph
              array={fcp}
              ni={thresholds.fcp.ni}
              poor={thresholds.fcp.poor}
            />
          </div>
          <div>
            <h3>Interaction to Next Paint (INP)</h3>
            <h4>
              75th Percentile: {INP75} {thresholds.inp.unit}
            </h4>
            <h4>
              Most Recent: {inp[inp.length - 1]} {thresholds.inp.unit}
            </h4>
            <NewGraph
              array={inp}
              ni={thresholds.inp.ni}
              poor={thresholds.inp.poor}
            />
          </div>
          <div>
            <h3>
              Time To First Byte (TTFB): {TTFB75} {thresholds.ttfb.unit}
            </h3>
            <h4>
              75th Percentile: {TTFB75} {thresholds.ttfb.unit}
            </h4>
            <h4>
              Most Recent: {ttfb[ttfb.length - 1]} {thresholds.ttfb.unit}
            </h4>
            <NewGraph
              array={ttfb}
              ni={thresholds.ttfb.ni}
              poor={thresholds.ttfb.poor}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
