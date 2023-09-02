import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/logo/iiraadi-site-logo-camel.png';

const LoginPage = () => {


  return (
    <div style={{ overflowX: 'hidden' }}>
      
      <Login />
    </div>
  );
};

export default LoginPage;