import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../assets/Expertcompo/Postarticle.css';
import Expertheader from './Expertheader';
const Postart = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')
  const [error, seterror] = useState([])
  function submitted(e){
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user._id);
    const form = {title,content,userid:user._id};
    axios.post('http://localhost:9579/postart',form).then((res)=>{
      if(res.status == 200){
        alert('article submitted successfully');
        console.log('submitted');
        navigate('/')
      }
    }).catch((err)=>{
      if (err.response.data.errors) {
          const messages = err.response.data.errors.map(e => e.msg).join(', ')
          seterror(messages)
        } else if (err.response.data.error) {
          seterror(err.response.data.error)
        } else {
          seterror("Signup failed. Please try again.")
        }
    })
  }
  return (
    <>
    <Expertheader />
    <div className="postart-container">
      <h2>Post an Article</h2>
      <form onSubmit={submitted}>
        <input
          type="text"
          name="title"
          placeholder="Enter article title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <textarea
          name="content"
          placeholder="Enter article content"
          rows="6"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        />
        <button type="submit">Post Article</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
    </>
  )
}

export default Postart