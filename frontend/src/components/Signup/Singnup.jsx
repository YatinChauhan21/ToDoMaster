import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate();
  const [input, setInput] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/register`,input)
    .then((response)=>{
      if (response.data.message=== 'user already Exist with this email'){
        alert(response.data.message);
        
      }else{
        alert(response.data.message);
        console.log(response);
        console.log(input);
        setInput({ 
          email: '', 
          username: '', 
          password: '' 
        });
        history("/login")
      }
      // Handle success response from backend
    });

  };

  return (
    <div className="signup container w-45 px-5 mx-auto">
      <h1 className='text-center my-5'>Sign Up</h1>
      <h6 className='text-center'>Signup here to continue</h6>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={input.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className='btn btn-primary w-100'>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
