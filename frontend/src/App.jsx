/*
    App.jsx
    This file contains the main App component, which defines the basic routes for the application using react-router-dom.
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // react-router-dom is used for routing that let's you handle navigation between pages.
import Home from './pages/Home';
import Jobs from './pages/Jobs';
// import Account from './pages/Account';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

const App = () => {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/jobs" element = {<Jobs/>}/>
        {/* <Route path = "/account" element = {<Account/>}/> */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path = "*" element = {<NotFound/>}/>   
      </Routes>
      {/* <Footer/> */}
    </Router>
  )
};

export default App;
