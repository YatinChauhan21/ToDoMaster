import React from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Signup from './components/Signup/singnup';
import Todo from './components/todo/Todo';
import Home from './components/home/home';
import Login from './components/Signup/Login';
import About from './components/about/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch  } from 'react-redux';
import {authActions} from './store';
import Footer from './components/footer/Footer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = (sessionStorage.getItem('id'))
   if (id){
    dispatch(authActions.login())
   }
  }, [])
  
  return (
   <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Todo" element={<Todo />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        {/* <Route path="/todo" element={<Todo />} /> */}
      </Routes>
   <Footer />
      </>
  );
}

export default App;
