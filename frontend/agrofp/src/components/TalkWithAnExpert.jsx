import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/Farmercompo/Talwithexp.css'
import Farmerheader from './Farmerheader';
const TalkWithAnExpert = () => {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);

  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios
      .get('http://localhost:9579/getAllexp')
      .then((res) => {
        setExperts(res.data.expert);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Pass expert data + user ID
  function talkwithexp(expert) {
    navigate('/Chatwithexp', {
      state: {
        expertId: expert._id,
        expertName: expert.name,
        userId: userData._id
      }
    });
  }

 return (
    <>
    <Farmerheader/>
  <div className="talk-container">
    <h2>Talk with an Expert</h2>
    {experts.length === 0 ? (
      <p>No experts available right now.</p>
    ) : (
      <ul className="expert-list">
        {experts.map((expert, index) => (
          <li className="expert-item" key={index}>
            <strong>{expert.name}</strong> – {expert.expertise}
            <br />
            <button onClick={() => talkwithexp(expert)}>
              Talk with {expert.name}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
  </>
);

};

export default TalkWithAnExpert;
