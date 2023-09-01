'use client'
import React from 'react'

const ActivityRow = (props) => {
  const {requestName, origin, httpMethod, httpStatus } = props.result
  console.log('this is propsresult', props.result)
  return (
    <tr>
        <td>{requestName}</td>
        <td>{httpMethod}</td>
        <td>{httpStatus}</td>
        <td>{origin}</td>
    </tr>
  )
}

export default ActivityRow