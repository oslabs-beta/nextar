import { useEffect } from 'react';
import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
  Legend,
} from 'chart.js';

export default function LineChart(props) {
  useEffect(() => {
    Chart.register(
      CategoryScale,
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      Filler,
      Legend
    );
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: JSON.parse(localStorage.LCParray).map((el, i) => i + 1),
        datasets: [
          {
            data: JSON.parse(localStorage.LCParray),
            label: 'Actual',
            borderColor: 'rgb(62,149,205)',
            backgroundColor: 'rgb(62,149,205,0.1)',
            // fill: true,
          },
          {
            data: JSON.parse(localStorage.LCParray).map((el) => 2500),
            label: 'Good',
            borderColor: 'rgb(60,186,159)',
            backgroundColor: 'rgb(60,186,159,0.1)',
            fill: true,
          },
          {
            data: JSON.parse(localStorage.LCParray).map((el) => 4000),
            label: 'Needs Improvement',
            borderColor: 'rgb(255,165,0)',
            backgroundColor: 'rgb(255,165,0,0.1)',
            fill: true,
          },
          {
            data: JSON.parse(localStorage.LCParray).map((el) =>
              Math.max(6000, ...JSON.parse(localStorage.LCParray))
            ),
            label: 'Poor',
            borderColor: 'rgb(196,88,80)',
            backgroundColor: 'rgb(196,88,80,0.1)',
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 400,
          },
        },
      },
    });

    const ctx1 = document.getElementById('CLSChart').getContext('2d');
    const CLSChart = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: JSON.parse(localStorage.CLSarray).map((el, i) => i + 1),
        datasets: [
          {
            data: JSON.parse(localStorage.CLSarray),
            label: 'Actual',
            borderColor: 'rgb(62,149,205)',
            backgroundColor: 'rgb(62,149,205,0.1)',
            // fill: true,
          },
          {
            data: JSON.parse(localStorage.CLSarray).map((el) => 1.2),
            label: 'Good',
            borderColor: 'rgb(60,186,159)',
            backgroundColor: 'rgb(60,186,159,0.1)',
            fill: true,
          },
          {
            data: JSON.parse(localStorage.CLSarray).map((el) => 1.666),
            label: 'Needs Improvement',
            borderColor: 'rgb(255,165,0)',
            backgroundColor: 'rgb(255,165,0,0.1)',
            fill: true,
          },
          {
            data: JSON.parse(localStorage.CLSarray).map((el) =>
              Math.max(3.00, ...JSON.parse(localStorage.CLSarray))
            ),
            label: 'Poor',
            borderColor: 'rgb(196,88,80)',
            backgroundColor: 'rgb(196,88,80,0.1)',
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 0.5,
          },
        },
      },
    });

    const ctx2 = document.getElementById('FIDChart').getContext('2d');
    const FIDChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: JSON.parse(localStorage.FIDarray).map((el, i) => i + 1),
        datasets: [
          {
            data: JSON.parse(localStorage.FIDarray),
            label: 'Actual',
            borderColor: 'rgb(62,149,205)',
            backgroundColor: 'rgb(62,149,205,0.1)',
            // fill: true,
          },
          {
            data: JSON.parse(localStorage.FIDarray).map((el) => 100),
            label: 'Good',
            borderColor: 'rgb(60,186,159)',
            backgroundColor: 'rgb(60,186,159,0.1)',
            fill: true,
          },
          {
            data: JSON.parse(localStorage.FIDarray).map((el) => 300),
            label: 'Needs Improvement',
            borderColor: 'rgb(255,165,0)',
            backgroundColor: 'rgb(255,165,0,0.1)',
            fill: true,
          },
          {
            data: JSON.parse(localStorage.FIDarray).map((el) =>
              Math.max(600, ...JSON.parse(localStorage.FIDarray))
            ),
            label: 'Poor',
            borderColor: 'rgb(196,88,80)',
            backgroundColor: 'rgb(196,88,80,0.1)',
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 0.5,
          },
        },
      },
    });


    const ctx3 = document.getElementById('FCPChart').getContext('2d');
    const FCPChart = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: JSON.parse(localStorage.FCParray).map((el, i) => i + 1),
        datasets: [
          {
            data: JSON.parse(localStorage.FCParray),
            label: 'Actual',
            borderColor: 'rgb(62,149,205)',
            backgroundColor: 'rgb(62,149,205,0.1)',
            // fill: true,
          },
          {
            data: JSON.parse(localStorage.FCParray).map((el) => 1800),
            label: 'Good',
            borderColor: 'rgb(60,186,159)',
            backgroundColor: 'rgb(60,186,159,0.1)',
            fill: true,
          },
          {
            data: JSON.parse(localStorage.FCParray).map((el) => 3000),
            label: 'Needs Improvement',
            borderColor: 'rgb(255,165,0)',
            backgroundColor: 'rgb(255,165,0,0.1)',
            fill: true,
          },
          {
            data: JSON.parse(localStorage.FCParray).map((el) =>
              Math.max(5000, ...JSON.parse(localStorage.FCParray))
            ),
            label: 'Poor',
            borderColor: 'rgb(196,88,80)',
            backgroundColor: 'rgb(196,88,80,0.1)',
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 10,
          },
        },
      },
    });
  }, []);

  return (
    <>
      {/* Filled line chart */}
      <div className='w-[500px] h-screen flex mx-auto my-auto'>
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit  shadow-xl'>
          <h2>Largest Contentful Paint (LCP): {props.FCP75}ms (75th percentile)</h2>
          <canvas id='myChart'></canvas>
          <h2>Cumulative Layout Shift (CLS): {props.CLS75} (75th percentile)</h2>
          <canvas id='CLSChart'></canvas>
          <h2>First Input Delay (FID): {props.FID75}ms (75th percentile)</h2>
          <canvas id='FIDChart'></canvas>
          <h2>First Contentful Paint (FCP): {props.FCP75}ms (75th percentile)</h2>
          <canvas id='FCPChart'></canvas>
        </div>
      </div>
    </>
  );
}
