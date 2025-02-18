import React from 'react'
import './home.css'
import { useNavigate } from "react-router-dom";

function home() {
    const navigate = useNavigate();
  return (
    <div className=" container   home">
    {/* Title & Tagline */}
    <div className='element '>
    <h1 className="text-4xl font-bold text-blue-600 mb-2">
      Welcome to TaskMaster!
    </h1>
    <p className="text-lg text-gray-600 mb-6">
      "Stay organized. Stay productive. Get things done!"
    </p>

    <button className='btn btn-primary' onClick={() => navigate("/todo")}>ToDo</button>

    </div>
       
    </div>
  )
}

export default home
