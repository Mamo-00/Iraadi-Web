import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from '../assets/logo/page-logo.png';
import LogoIO from '../assets/logo/page-logo-icon-only.png';
import { BsBell } from 'react-icons/bs';
import { IoCreateOutline } from 'react-icons/io5';
import { RiGroupLine } from 'react-icons/ri';
import { BiLogIn } from 'react-icons/bi';
import '../styles.css';


const NavContainer = styled.nav`
  display: flex;
  
  padding: 10px 10px;
  align-items: center;
  max-width: 1010px;
  
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  font-family: 'Inconsolata', monospace, sans-serif;
  color: #fff;
  margin-right: 30px;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  &:last-child {
    margin-right: 5px;
  }

  @media (max-width: 767px) {
    margin-right: 35px;
  }
`;


const Navbar = ( {toggleShow} ) => {

  

  return (
    <NavContainer className="d-flex  mx-auto">
      <Link to="/*" className="me-auto" style={{ color: "#fff" }}>
        <img src={Logo} className="d-none d-sm-block me-1 logo" alt="Logo" style={{ height: "50px", width: "250px"  }}/>
        <img src={LogoIO} className="d-block d-sm-none me-1 logo" alt="Logo but icon only" style={{ height: "50px", width: "60px" }}/>
      </Link>
      <NavLinks className="d-flex ">
        <NavLink to="/link1" rel="noopener follow"> <BsBell className="icon-style" /> 
          <span className="d-none d-md-inline">Notification</span>
        </NavLink>
        <NavLink to="/link2" rel="noopener follow"> <IoCreateOutline className="fw-bold icon-style" />
          <span className="d-none d-md-inline">New Post</span>
        </NavLink>
        <NavLink to="/link3" rel="noopener follow"> <RiGroupLine className="icon-style" /> 
          <span className="d-none d-md-inline">About</span>
        </NavLink>
        <NavLink to="/login" rel="noopener follow" onClick={toggleShow}> <BiLogIn className="icon-style" />
          <span className="d-none d-md-inline">Login</span>
        </NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;