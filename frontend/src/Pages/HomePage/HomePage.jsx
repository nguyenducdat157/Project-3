import React, { useEffect } from 'react';
import MainContent from '../../Components/MainContent/MainContent';
import NavBar from '../../Components/NavBar/Navbar';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = (props) => {
  return !localStorage.getItem('token') ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <NavBar />
      <MainContent />
    </div>
  );
};

export default HomePage;
