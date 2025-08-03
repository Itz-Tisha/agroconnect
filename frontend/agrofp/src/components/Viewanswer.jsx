import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../assets/Viewanswer.css';
import Farmerheader from './Farmerheader';
import Expertheader from './Expertheader';
const Viewanswer = () => {
  const type = localStorage.getItem('usertype');
    const location = useLocation();
    const [usertype, setusertype] = useState(type)
 const [ans, setans] = useState([])
 const [error, seterror] = useState([])
 useEffect(() => {
  if (!location.state || !location.state.questionId) {
    seterror("No question selected.");
    return;
  }

  const form = { questionId: location.state.questionId };
  console.log(form); 
  axios.post('http://localhost:9579/viewans', form)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setans(res.data.ans);
      }
    })
    .catch((err) => {
      seterror("Something went wrong.");
    });
}, []);


  return (
   <>
   {usertype === 'expert' ? <Expertheader /> : <Farmerheader /> }
  <div className="answer-container">
    {error.length > 0 && <div className="error">Failed to load answers</div>}

    {ans.map((answer, idx) => (
      <div className="answer-card" key={idx}>
       
        {answer.solution}
      </div>
    ))}
  </div>
</>

  )
}

export default Viewanswer