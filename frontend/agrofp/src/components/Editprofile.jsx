import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';
import '../assets/Editprofile.css';
import { useNavigate } from 'react-router-dom';
const Editprofile = () => {
  const [user, setuser] = useState(null);
  const [username, setusername] = useState('');
   const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setuser(userData);
      axios.post('http://localhost:9579/userprofile', { userid: userData._id }).then((res) => {
        if (res.status === 200) {
          setuser(res.data.user);
          
        }
      }).catch(err => {
        console.log("Something went wrong!!");
      });
    }
  }, []);

  function edit(e) {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user'));
    const form = { userid: userData._id, username };
    axios.post('http://localhost:9579/editprofile', form)
      .then((res) => {
        if (res.status === 200) {
          console.log("submitted");
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
  <>
    {user ? (
      <>
        {user.usertype === 'farmer' ? <Farmerheader /> : <Expertheader />}
        <form onSubmit={edit} className="edit-form fade-in">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <button type='submit'>Edit Profile</button>
        </form>
      </>
    ) : (
      <p>Loading...</p> // or just return null
    )}
  </>
);

}

export default Editprofile;
