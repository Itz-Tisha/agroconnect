
import React from 'react'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './components/Login';
import Sign from './components/Sign';
import Farmer from './components/Farmer';
import Expert from './components/Expert';
import Postq from './components/Postq';
import Userprofile from './components/Userprofile';
import Articles from './components/Articles';
import Displayq from './components/displayq';
import Postart from './components/Postart';

import Answerq from './components/Answerq';
import Viewanswer from './components/Viewanswer';
import Editprofile from './components/Editprofile';
import TalkWithAnExpert from './components/TalkWithAnExpert';
import Chatwithexp from './components/Chatwithexp';
import Viewweather from './components/Viewweather';
function App() {

  return (
    <>
  
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/farmerpage" element={<Farmer/>} />
      <Route path="/expertpage" element={<Expert/>} />
      <Route path="/postq" element={<Postq/>} />
      <Route path="/userprofile" element={<Userprofile/>} />
      <Route path="/articles" element={<Articles/>} />
      <Route path="/Displayq" element={<Displayq/>}/>
      <Route path="/postart" element={<Postart/>}/>
      <Route path ="/viewweather" element={<Viewweather/>}/>
      <Route path ="/Answerq" element={<Answerq/>}/>
      <Route path ="/viewans" element={<Viewanswer/>}/>
      <Route path="/editprofile" element={<Editprofile/>}/>
      <Route path="/TalkwithExpert" element={<TalkWithAnExpert/>}/>
      <Route path="/chatwithexp" element={<Chatwithexp/>}/>
      <Route path="/viewweather" element={<Viewweather />} />
     </Routes>  

    
    </>
  )
}

export default App
