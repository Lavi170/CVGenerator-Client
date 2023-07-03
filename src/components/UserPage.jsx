import React from 'react'
import { Outlet, Link, useParams } from 'react-router-dom'
import './userpage.css'
function Userpage() {
  return (
    <div className='userpage'>
       <Outlet/>
    </div>
  )
}
export default Userpage;