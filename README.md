# Nextar ![Version](https://img.shields.io/badge/version-1.0.0-blue)  
Nextar is an open-source developer tool for Next.js developers to provide server-side network request metrics along with detailed charts on Google's [core web vitals](https://web.dev/metrics/), in order to assist with development when working with server side rendered components.

_Note: Nextar is only compatible with versions of Next.js 13 and above_

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Additional Information](#additional-information)
- [Authors](#authors)
- [Tech Stack](#tech)

## <a name="features"></a>Features

<b>Nextar</b> provides two dashboards:
- Server Side Activity (Endpoint, Type of Request, Response Status, Response Size, Start Time, Duration) with waterfall view
- Web Vitals (FCP, LCP, CLS, FID)

## <a name="getting-started"></a>Getting Started
1. In your terminal, install the Nextar NPM package  
    ```
    npm install nextarjs
    ```
3. Run the following to create the Nextar files  
     ```
     npx nextar-create
     ```
5. In your package.json, add the following to scipts:  
     ```
   "nextar": "node --require ./server/server.js & next dev",
     ```
7. in your terminal run the following command:  
     ```
   npm run nextar
     ```
Open your dashboards by going to your hosted website and navigating to the two dashboard endpoints:
    http://localhost:3000/nextar-dashboard
    http://localhost:3000/nextar

## <a name="usage"></a>Usage
Insert gifs here...

## <a name="additional-information"></a>Additional Information
FID will be replaced with NIS in March 2024.

## <a name="authors"></a> Authors
#### Amulya Uppala | [Github](https://github.com/amoomoo) | [LinkedIn](https://www.linkedin.com/in/amulya-uppala/)
#### Andrew Lee | [Github](https://github.com/anwle115) | [LinkedIn](https://www.linkedin.com/in/andrew-w-lee/)
#### Isabelle Ro | [Github](https://github.com/isabellero1) | [LinkedIn](https://www.linkedin.com/in/isabelle-ro-25b009230/)
#### Julia Shi | [Github](https://github.com/juliajshi) | [LinkedIn](https://www.linkedin.com/in/juliacshi/)

## <a name="tech"></a> Tech Stack
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![WebSocket](https://img.shields.io/badge/WS-Websocket-2ea44f?style=for-the-badge&logo=appveyor)
![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-3d348b?style=for-the-badge&logo=opentelemetry&logoColor=white)
![d3js](https://img.shields.io/badge/d3-red?style=for-the-badge&logo=d3.js)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
