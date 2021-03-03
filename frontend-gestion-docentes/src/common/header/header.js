import React, { useState ,Fragment } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AlignLeft, LogOut } from 'react-feather';
import { logoutApi } from '../../services'

const Header = ({setRefreshCheckLogin}) => {
  const [sidebar, setSidebar] = useState(false);

  
 

 const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.remove('open');
      document.querySelector(".page-sidebar").classList.remove('open');
    } else {
      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.add('open');
      document.querySelector(".page-sidebar").classList.add('open'); 
    }
  }

  const logout = () => {

    logoutApi();
    setRefreshCheckLogin(true);

}

  return (
    <Fragment>
      <div className="page-main-header" >
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper">
              <Link to='/home'>
                <img className="img-fluid" src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="mobile-sidebar d-block">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <a href="#javascript" onClick={() => openCloseSidebar()}>
                  <AlignLeft />
                </a>
              </label>
            </div>
          </div>
          <div className="nav-right col p-0 d-flex justify-content-end">
            <a href="/" onClick={logout}>
                  <LogOut />
                </a>
          </div>        
        </div>
      </div>
    </Fragment>
  )
};
export default Header;