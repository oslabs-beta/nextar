'use client';

// import { FaasDocumentOperationValues } from '@opentelemetry/semantic-conventions';
import { useReportWebVitals } from 'next/web-vitals';
import { useState, useEffect, useRef } from 'react';

export function WebVitals() {
  // console.log(wvObj);

  // const [fcp, setFCP] = useState([]);
  // const [lcp, setLCP] = useState([]);
  // const [cls, setCLS] = useState([]);
  // const [fid, setFID] = useState([]);
  const [hasRan, setHasRan] = useState(false);

  // useEffect(() => {
  // setFCP(JSON.parse(localStorage.getItem('FCParray')) || []);
  // setLCP(JSON.parse(localStorage.getItem('LCParray')) || []);
  // setCLS(JSON.parse(localStorage.getItem('CLSarray')) || []);
  // setFID(JSON.parse(localStorage.getItem('FIDarray')) || []);
  // }, []);

  useReportWebVitals((metric) => {
    //check if webvitals object exists in local storage, otherwise set to update {}
    if (!localStorage.getItem('nextar-web-vitals')) {
      localStorage.setItem('nextar-web-vitals', JSON.stringify({}));
    }

    let wvObj = JSON.parse(localStorage.getItem('nextar-web-vitals'));

    const endpoint = location.pathname;

    if (!wvObj[endpoint]) {
      wvObj[endpoint] = { fcp: [], lcp: [], cls: [], fid: [] };
    }

    // console.log('METRIC', metric);
    switch (metric.name) {
      case 'FCP': {
        // console.log('FCP', metric.value);

        if (hasRan === false) {
          // const fcpVal = metric.value;
          const fcpVal = Math.round(metric.value * 1e2) / 1e2;

          //add metric to nextar-web-vitals local storage object
          if (!wvObj[endpoint]) {
            wvObj[endpoint] = {};
            wvObj[endpoint].fcp = [];
          }
          wvObj[endpoint].fcp.push(fcpVal);
          localStorage.setItem('nextar-web-vitals', JSON.stringify(wvObj));

          localStorage.setItem(
            'FCParray',
            JSON.stringify([
              ...(JSON.parse(localStorage.getItem('FCParray')) || []),
              fcpVal,
            ])
          );
          setHasRan(true);
        }

        break;
      }
      case 'LCP': {
        // console.log('LCP', metric.value)
        // handle LCP results
        if (hasRan === false) {
          const lcpVal = Math.round(metric.value * 1e2) / 1e2;

          //add metric to nextar-web-vitals local storage object
          if (!wvObj[endpoint]) {
            wvObj[endpoint] = {};
            wvObj[endpoint].lcp = [];
          }
          wvObj[endpoint].lcp.push(lcpVal);
          localStorage.setItem('nextar-web-vitals', JSON.stringify(wvObj));

          localStorage.setItem(
            'LCParray',
            JSON.stringify([
              ...(JSON.parse(localStorage.getItem('LCParray')) || []),
              lcpVal,
            ])
          );
          setHasRan(true);
        }
        break;
      }
      case 'CLS': {
        // handle CLS results
        // console.log('CLS', metric.value)
        if (hasRan === false) {
          const clsVal = Math.round(metric.value * 1e2) / 1e2;

          //add metric to nextar-web-vitals local storage object
          if (!wvObj[endpoint]) {
            wvObj[endpoint] = {};
            wvObj[endpoint].cls = [];
          }
          wvObj[endpoint].cls.push(clsVal);
          localStorage.setItem('nextar-web-vitals', JSON.stringify(wvObj));

          localStorage.setItem(
            'CLSarray',
            JSON.stringify([
              ...(JSON.parse(localStorage.getItem('CLSarray')) || []),
              clsVal,
            ])
          );
          setHasRan(true);
        }
        break;
      }
      case 'FID': {
        // handle FID results
        // console.log('FID', metric.value)
        if (hasRan === false) {
          const fidVal = Math.round(metric.value * 1e2) / 1e2;

          //add metric to nextar-web-vitals local storage object
          if (!wvObj[endpoint]) {
            wvObj[endpoint] = {};
            wvObj[endpoint].fid = [];
          }
          wvObj[endpoint].fid.push(fidVal);
          localStorage.setItem('nextar-web-vitals', JSON.stringify(wvObj));

          localStorage.setItem(
            'FIDarray',
            JSON.stringify([
              ...(JSON.parse(localStorage.getItem('FIDarray')) || []),
              fidVal,
            ])
          );
          setHasRan(true);
        }
        break;
      }
    }
  });
}
