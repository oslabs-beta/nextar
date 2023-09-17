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
  const goodTag = (
    <p
      style={{
        color: 'green',
        backgroundColor: '#57e96466',
        padding: '4px',
        border: 'solid green 1px',
      }}
    >
      Good
    </p>
  );

  const niTag = (
    <p
      style={{
        color: '#e1ad01 ',
        backgroundColor: '#FFFF0066',
        padding: '4px',
        border: 'solid #F6BE00 1px',
      }}
    >
      Needs Improvement
    </p>
  );

  const poorTag = (
    <p
      style={{
        color: 'red ',
        backgroundColor: '#fad1d0',
        padding: '4px',
        border: 'solid red 1px',
      }}
    >
      Poor
    </p>
  );

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
    .filter((endpoint) => endpoint !== '/nextar-web-vitals')
    .filter((endpoint) => endpoint !== '/nextar-dashboard')
    .sort();

  // // get all options for endpoints
  const options = [];
  endpoints.forEach((element) => {
    options.push(<option value={element}>{element}</option>);
  });

  //get arrays from object
  if (!wvObj[value]) {
    return (
      <main
        className={montserrat.className}
        style={{
          backgroundColor: '#ffffea',
          height: window.outerHeight + 500,
        }}
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
              padding: '10px',
              backgroundColor: 'rgb(247, 218, 33)',
              opacity: '.8',
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
              style={{
                fontSize: '.9rem',
                // border: 'solid #E1C237 1px',
                borderRadius: '25px',
                backgroundColor: 'black',
                color: 'white',
              }}
            >
              Reset Data
            </button>
          </div>
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
      style={{ backgroundColor: '#ffffea', height: window.outerHeight + 500 }}
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
            padding: '10px',
            backgroundColor: 'rgb(247, 218, 33)',
            opacity: '.8',
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
            style={{
              fontSize: '.9rem',
              // border: 'solid #E1C237 1px',
              borderRadius: '25px',
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            Reset Data
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
            <div style={{ display: 'flex' }}>
              <h4>
                75th Percentile: {LCP75} {thresholds.lcp.unit}
              </h4>
              &emsp;
              {LCP75 < thresholds.lcp.ni ? goodTag : ''}
              {LCP75 > thresholds.lcp.ni && LCP75 < thresholds.lcp.poor
                ? niTag
                : ''}
              {LCP75 > thresholds.lcp.poor ? poorTag : ''}
            </div>
            <div style={{ display: 'flex' }}>
              <h4>
                Most Recent: {lcp[lcp.length - 1]} {thresholds.lcp.unit}
              </h4>
              &emsp;
              {lcp[lcp.length - 1] < thresholds.lcp.ni ? goodTag : ''}
              {lcp[lcp.length - 1] > thresholds.lcp.ni &&
              lcp[lcp.length - 1] < thresholds.lcp.poor
                ? niTag
                : ''}
              {lcp[lcp.length - 1] > thresholds.lcp.poor ? poorTag : ''}
            </div>
            <NewGraph
              array={lcp}
              ni={thresholds.lcp.ni}
              poor={thresholds.lcp.poor}
            />
          </div>
          <div>
            <h3>Cumulative Layout Shift (CLS)</h3>
            <div style={{ display: 'flex' }}>
              <h4>
                75th Percentile: {CLS75} {thresholds.cls.unit}
              </h4>
              &emsp;
              {CLS75 < thresholds.cls.ni ? goodTag : ''}
              {CLS75 > thresholds.cls.ni && CLS75 < thresholds.cls.poor
                ? niTag
                : ''}
              {CLS75 > thresholds.cls.poor ? poorTag : ''}
            </div>
            <div style={{ display: 'flex' }}>
              <h4>
                Most Recent: {cls[cls.length - 1]} {thresholds.cls.unit}
              </h4>
              &emsp;
              {cls[cls.length - 1] < thresholds.cls.ni ? goodTag : ''}
              {cls[cls.length - 1] > thresholds.cls.ni &&
              cls[cls.length - 1] < thresholds.cls.poor
                ? niTag
                : ''}
              {cls[cls.length - 1] > thresholds.cls.poor ? poorTag : ''}
            </div>
            <NewGraph
              array={cls}
              ni={thresholds.cls.ni}
              poor={thresholds.cls.poor}
            />
          </div>
          <div>
            <h3>First Input Delay (FID)</h3>
            <div style={{ display: 'flex' }}>
              <h4>
                75th Percentile: {FID75} {thresholds.fid.unit}
              </h4>
              &emsp;
              {FID75 < thresholds.fid.ni ? goodTag : ''}
              {FID75 > thresholds.fid.ni && FID75 < thresholds.fid.poor
                ? niTag
                : ''}
              {FID75 > thresholds.fid.poor ? poorTag : ''}
            </div>
            <div style={{ display: 'flex' }}>
              <h4>
                Most Recent: {fid[fid.length - 1]} {thresholds.fid.unit}
              </h4>
              &emsp;
              {fid[fid.length - 1] < thresholds.fid.ni ? goodTag : ''}
              {fid[fid.length - 1] > thresholds.fid.ni &&
              fid[fid.length - 1] < thresholds.fid.poor
                ? niTag
                : ''}
              {fid[fid.length - 1] > thresholds.fid.poor ? poorTag : ''}
            </div>
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
            <div style={{ display: 'flex' }}>
              <h4>
                75th Percentile: {FCP75} {thresholds.fcp.unit}
              </h4>
              &emsp;
              {FCP75 < thresholds.fcp.ni ? goodTag : ''}
              {FCP75 > thresholds.fcp.ni && FCP75 < thresholds.fcp.poor
                ? niTag
                : ''}
              {FCP75 > thresholds.fcp.poor ? poorTag : ''}
            </div>
            <div style={{ display: 'flex' }}>
              <h4>
                Most Recent: {fcp[fcp.length - 1]} {thresholds.fcp.unit}
              </h4>
              &emsp;
              {fcp[fcp.length - 1] < thresholds.fcp.ni ? goodTag : ''}
              {fcp[fcp.length - 1] > thresholds.fcp.ni &&
              fcp[fcp.length - 1] < thresholds.fcp.poor
                ? niTag
                : ''}
              {fcp[fcp.length - 1] > thresholds.fcp.poor ? poorTag : ''}
            </div>
            <NewGraph
              array={fcp}
              ni={thresholds.fcp.ni}
              poor={thresholds.fcp.poor}
            />
          </div>
          <div>
            <h3>Interaction to Next Paint (INP)</h3>
            <div style={{ display: 'flex' }}>
              <h4>
                75th Percentile: {INP75} {thresholds.inp.unit}
              </h4>
              &emsp;
              {INP75 < thresholds.inp.ni ? goodTag : ''}
              {INP75 > thresholds.inp.ni && INP75 < thresholds.inp.poor
                ? niTag
                : ''}
              {INP75 > thresholds.inp.poor ? poorTag : ''}
            </div>
            <div style={{ display: 'flex' }}>
              <h4>
                Most Recent: {inp[inp.length - 1]} {thresholds.inp.unit}
              </h4>
              &emsp;
              {inp[inp.length - 1] < thresholds.inp.ni ? goodTag : ''}
              {inp[inp.length - 1] > thresholds.inp.ni &&
              inp[inp.length - 1] < thresholds.inp.poor
                ? niTag
                : ''}
              {inp[inp.length - 1] > thresholds.inp.poor ? poorTag : ''}
            </div>
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
            <div style={{ display: 'flex' }}>
              <h4>
                75th Percentile: {TTFB75} {thresholds.ttfb.unit}
              </h4>
              &emsp;
              {TTFB75 < thresholds.ttfb.ni ? goodTag : ''}
              {TTFB75 > thresholds.ttfb.ni && TTFB75 < thresholds.ttfb.poor
                ? niTag
                : ''}
              {TTFB75 > thresholds.ttfb.poor ? poorTag : ''}
            </div>
            <div style={{ display: 'flex' }}>
              <h4>
                Most Recent: {ttfb[ttfb.length - 1]} {thresholds.ttfb.unit}
              </h4>
              &emsp;
              {ttfb[ttfb.length - 1] < thresholds.ttfb.ni ? goodTag : ''}
              {ttfb[ttfb.length - 1] > thresholds.ttfb.ni &&
              ttfb[ttfb.length - 1] < thresholds.ttfb.poor
                ? niTag
                : ''}
              {ttfb[ttfb.length - 1] > thresholds.ttfb.poor ? poorTag : ''}
            </div>
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
