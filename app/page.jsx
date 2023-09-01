

import CountryContainer from '@components/CountryContainer'
// import styles from './page.module.css'
import {onCLS, onFID, onLCP} from 'web-vitals';
import {performance, PerformanceObserver} from 'perf_hooks';




const HomePage = () => {

  console.log('before po')
  setTimeout(()=>{

    const po = new PerformanceObserver((entryList) => {
      entryList.getEntries()
      
      
   }).observe({ type: "largest-contentful-paint", buffered: false })
   console.log(po)
   
  //  po.observe({ type: "largest-contentful-paint", buffered: true });
    
  },5000)

  return (
    <div>
    <CountryContainer/>
    </div>
  )
}

export default HomePage