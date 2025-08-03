import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/Farmercompo/Chatwithexp.css'; // Make sure this path is correct
import Farmerheader from './Farmerheader';

const Chatwithexp = () => {
  const { state } = useLocation();
  const expertId = state.expertId;
  const expertName = state.expertName;
  const userId = state.userId;

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [questions, setquestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { expertId, userId, expertName, message };

    axios.post('http://localhost:9579/Chat', form)
      .then((res) => {
        if (res.status === 200) {
          console.log('done');
          setquestions((prev) => [...prev, { message }]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setMessage('');
  };

  useEffect(() => {
    const form = { expertId, userId, expertName, message };
    axios.post('http://localhost:9579/getquestions', form)
      .then((res) => {
        if (res.status === 200) {
          setquestions(res.data.questions);
          console.log(res.data.questions);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    <Farmerheader/>
    <div className="chat-container">
      <h2 className="chat-header">Chat with <span>{expertName}</span></h2>

      <div className="message-box">
        {questions.length === 0 ? (
          <p className="no-messages">No messages yet.</p>
        ) : (
          questions.map((q, i) => (
            <div key={i} className="message">
              <p>{q.message}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
    </>
  );
};

export default Chatwithexp;
