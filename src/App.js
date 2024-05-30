import React from 'react';
import './App.css';
import UtilLayout from '../src/utils/UtilLayout';
import Login from '../src/utils/LoginForm';
import Register from "../src/utils/RegisterForm"
import ForgetPassword from "../src/utils/ForgetPassword"

import { Routes,Route } from 'react-router-dom';
import Home from './appPage/Home';

function App() {
  return (
    <div className="App">
        
        <Routes>
            <Route path="/" element={<UtilLayout/>}>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
          </Route>
        <Route path="/Forget-password" element={<ForgetPassword/>}/>
        <Route path="/app" element={<Home/>}/>

          </Routes>            
    </div>
  );
}

export default App;
