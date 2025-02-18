import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update({ display, update, onUpdate }) {
    const [Inputs, setInputs] = useState({
        title: update?.title || '',
        body: update?.body || ''
    });

    useEffect(() => {
        if (update && update._id) {
            setInputs({ title: update.title, body: update.body });
        }
    }, [update]);

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async () => {
        
        if (!update || !update._id) {
            console.error("Error: Task ID is undefined");
            toast.error("Task ID is missing. Cannot update.");
            return;
        }

        try {
            const response = await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`, {
                title: Inputs.title,
                body: Inputs.body
            });

            toast.success("Task Updated Successfully");
            console.log("Update Response:", response.data);
            display('none'); // Hide the update form after successful update
            onUpdate(response.data.list); // Update the state in the parent component
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task");
        }
    };

    return (
        <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
           
            <h3>Update your Task</h3>

            <input type='text'
                className='todo-inputs my-4 w-100 p-3'
                value={Inputs.title}
                onChange={change}
                name='title'
            />

            <textarea
                className='todo-inputs w-100 p-3'
                value={Inputs.body}
                name='body'
                onChange={change}
            />

            <div>
                <button className='btn btn-primary my-4' onClick={submit}>Update</button>
                <button className='btn btn-danger my-4 mx-3'
                    onClick={() => display('none')}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Update;