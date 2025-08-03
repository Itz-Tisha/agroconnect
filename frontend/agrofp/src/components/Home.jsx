import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Home.css'
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [usertype, setUsertype] = useState('');
  const [islogin, setIslogin] = useState(false);
  const [isfarmer, setIsfarmer] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUsertype = localStorage.getItem('usertype');
    const storedIslogin = localStorage.getItem('islogin');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUsertype) {
      setUsertype(storedUsertype);
      if (storedUsertype === 'farmer') {
        setIsfarmer(true);
      }
    }
    if (storedIslogin) {
      setIslogin(storedIslogin === 'true');
    }
  }, []);

  return (
    <>
     {isfarmer ? (
              <Farmerheader/>
            ) : (
              <Expertheader/>
            )} 
    

      <header className="hero-section">
        <h1>Welcome to AgroConnect</h1>
        <p>Connecting Farmers and Agricultural Experts</p>

        {islogin && (
          <div className="user-info">
            <p>Hello, {user ? user.name : 'User'}!</p>
            <p>Your user type is: {usertype}</p>
            {/* {isfarmer ? (
              <button onClick={goToFarmerPage}>Go to Farmer Page</button>
            ) : (
              <button onClick={goToExpertPage}>Go to Expert Page</button>
            )} */}
          </div>
        )}
      </header>

      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          AgroConnect is a platform that bridges the gap between farmers and agricultural experts.
          Our goal is to empower farmers with expert advice, resources, and a supportive community to boost sustainable farming practices.
        </p>
      </section>

      <footer id="contact" className="footer">
        <p>© 2025 AgroConnect. All rights reserved.</p>
        <p>Contact us at: support@agroconnect.com</p>
      </footer>
    </>
  );
};

export default Home;
