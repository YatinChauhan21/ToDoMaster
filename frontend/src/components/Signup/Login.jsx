import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
const SignIn = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/SignIn`,input)
    .then((response)=>{
    
        console.log(response.data.others._id);
        sessionStorage.setItem('id', response.data.others._id)
        dispatch(authActions.login(response.data.others._id));
        history('/todo')
        
        window.location.reload();
      })
      

  };

  return (
    <div className="signup container w-45 px-5 mx-auto">
      <h1 className='text-center my-5'>Login</h1>
      <h6 className='text-center'>Login to your account</h6>
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

export default SignIn;
