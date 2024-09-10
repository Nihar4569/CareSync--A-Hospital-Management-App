import React, { useContext } from 'react'
import { Context } from '..'

export default function Dashboard() {
  const {userData,setUserData} = useContext(Context)

  return (
    <div>{`Welcome ${userData.name}`}</div>
  )
}
