import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/Expertcompo/Answerq.css';
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';
const Answerq = () => {
  const navigate = useNavigate();
  const [solution, setsolution] = useState('');
  const [error, seterror] = useState([]);
  const location = useLocation();

  function answersubmit(e) {
    e.preventDefault();
    const { user, post } = location.state || {};
    const form = { solution, user, post };

    axios.post('http://localhost:9579/answerq', form)
      .then((res) => {
        if (res.status === 200) {
          alert('Answer submitted');
          navigate('/');
        }
      })
      .catch((err) => {
        seterror(err);
      });
  }

  return (
    <>
    <Expertheader/>
    <div className="answer-form-container">
      <h2>Submit Your Answer</h2>
      <form onSubmit={answersubmit}>
        <input
          type="text"
          name="solution"
          value={solution}
          onChange={(e) => setsolution(e.target.value)}
          placeholder="Type your answer here..."
          required
        />
        <button type="submit">Submit Answer</button>
      </form>
    </div>
    </>
  );
};

export default Answerq;
