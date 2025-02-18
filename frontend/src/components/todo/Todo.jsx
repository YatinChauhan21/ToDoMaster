import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './todo.css';
import Card from './Card';
import Update from "./Update";

let id = sessionStorage.getItem('id');
function Todo() {
  const [Inputs, setInputs] = useState({ title: '', body: '' });
  const [Array, setArray] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const show = () => {
    document.getElementById('textarea').style.display = 'block';
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error('Task Title and Body are required', { autoClose: 5000 });
    } else {
      if (id) {
        axios.post(`${window.location.origin}/api/v2/addTask`, { title: Inputs.title, body: Inputs.body, id: id })
          .then((response) => {
            console.log(response);
            setArray([response.data.list, ...Array]); // Prepend the new task to the array
            setInputs({ title: '', body: '' });
            toast.success('Task Added Successfully', { autoClose: 5000 });
          })
          .catch((error) => {
            console.error(error);
            toast.error('Failed to add task', { autoClose: 5000 });
          });
      } else {
        setArray([Inputs, ...Array]); // Prepend the new task to the array
        setInputs({ title: '', body: '' });
        toast.success('Task Added Successfully', { autoClose: 5000 });
        toast.error('Task is not saved. Please Sign Up', { autoClose: 5000 });
      }
    }
  };


  
    
  const del = async (id) => {
    if (!id) {
      // setArray(Array.filter(item => item._id !== id));
      toast.warn('Please signup to delete task', { autoClose: 5000 });
      return;
    }
    await axios.delete(`${window.location.origin}/api/v2/deleteTask/${id}`)
      .then((response) => {
        console.log(response);
        toast.success('Task Deleted Successfully', { autoClose: 5000 });
        setArray(Array.filter(item => item._id !== id));
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete task', { autoClose: 5000 });
      });
  };

  const dis = (value) => {
    document.getElementById('todo-update').style.display = value;
  };

  const update = (index) => {
    if (!sessionStorage.getItem('id')) {
      toast.error('Please login to update tasks', { autoClose: 5000 });
    
      return;
    }
    setUpdateTask(Array[index]);
    dis('block');
  };

  const handleUpdate = (updatedTask) => {
    setArray(Array.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios.get(`${window.location.origin}/api/v2/getTask/${id}`)
          .then((response) => {
            setArray(response.data.list);
          })
          .catch((error) => {
            console.error(error);
            toast.error('Failed to fetch tasks', { autoClose: 5000 });
          });
      };
      fetch();
    }
  }, []);

  return (
    <>
      <div className="todo my-5">
        <ToastContainer autoClose={5000} />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-2">
            <input
              type='text'
              placeholder="Title"
              className="my-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id='textarea'
              type='text'
              placeholder="Body"
              className="p-2 todo-inputs"
              name="body"
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <div className=" w-50 p-2 d-flex justify-content-end ">
            <button className="btn btn-primary " onClick={submit}>Add</button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container fluid">
            <div className="row ">
              {Array && Array.map((item, index) => (
                <div className="col-lg-3 col-9  mx-5 my-2" key={index}>
                  <Card
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delid={del}
             
                    display={dis}
                    updateId={() => update(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update " id="todo-update">
        <div className="container update">
          <Update display={dis} update={updateTask} onUpdate={handleUpdate} />
        </div>
      </div>
    </>
  );
}

export default Todo;