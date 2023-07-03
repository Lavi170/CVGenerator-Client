import React from 'react'
import { Outlet, Link, useParams} from "react-router-dom";
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
const Layout = () => {
  const navigate = useNavigate()
  const [isUserLogged, setIsUserLogged] = useState(localStorage.getItem("user"));
    
    function userLogOut() {
        localStorage.clear()
        // window.location.reload();
    }
  return (
    <div>
        <div></div>
         <nav className="nav-bar">
         {isUserLogged != undefined ?
                    <div id="user-signed-in">
                        <div onClick={() => {userLogOut(); navigate("");window.location.reload() }} className="log-out"> <LogoutIcon/> </div>
                    </div>
                    :
                    <Link className='nav-link' to="/">
                       Login
                    </Link>
                }
                {isUserLogged != undefined &&
                  <div className="right-side-nav-bar">
      <Link className="nav-link" to="homepage">
           Home
          </Link>
      <Link className="nav-link" to="template">
           Create CV
          </Link>
      <Link className="nav-link" to="myProfile">
           View My CV's
          </Link>
          </div>}
          </nav>
          <div id='outlet'>
          <Outlet/>
          </div>
          </div>
          
  )
}

export default Layout
