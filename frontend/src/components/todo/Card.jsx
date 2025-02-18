import React from 'react';
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";

function Card({ title, body, id, delid, display, updateId }) {
    return (
        <div className="p-3 todo-cards" >
            <div>
                <h5>{title}</h5>
                <p className='todo-card-p'>
                    {body.substring(0, 77)}...
                </p>
                <div className='d-flex justify-content-around'>
                    <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 '
                        onClick={() => {
                            display("block");
                            if (typeof updateId === "function") {
                                updateId();  // ✅ Call update function correctly
                            } else {
                                console.error("updateId is not a function", updateId);
                            }
                        }}
                    >
                        <GrDocumentUpdate className='card-icons' />Update
                    </div>
                    <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger '
                        onClick={() => {
                            console.log("Deleting Task ID:", id); 
                            delid(id)}
                        }>
                        <MdDelete className='card-icons del' />Delete
                    </div>
                    {/* <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 card-icons'
                        onClick={() => markAsDone(id)}
                    >
                        <AiOutlineFileDone className='card-icons' />
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Card;






// import React from 'react';
// import { MdDelete } from "react-icons/md";
// import { GrDocumentUpdate } from "react-icons/gr";
// import { AiOutlineFileDone } from "react-icons/ai";



// function Card({ title, body, id, delid, display, updateId }) {
//     return (
//         <div className='p-3 todo-cards'>
//             <div>
//                 <h5>{title}</h5>
//                 <p className='todo-card-p'>
//                     {body.substring(0, 77)}...
//                 </p>
//                 <div className='d-flex justify-content-around'>
//                     <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 '
//                         onClick={() => {
//                             display("block");
//                             if (typeof updateId === "function") {
//                                 updateId();  // ✅ Call update function correctly
//                             } else {
//                                 console.error("updateId is not a function", updateId);
//                             }
//                         }}
//                     >
//                         <GrDocumentUpdate className='card-icons' />Update
//                     </div>
//                     <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger '
//                         onClick={() => {
//                             console.log("Deleting Task ID:", id); 
//                             delid(id)}
//                         }>
//                         <MdDelete className='card-icons del' />Delete
//                     </div>
//                     <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 card-icons'
                    
//                     >
//                         <AiOutlineFileDone />
//                         </div>
                   
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Card;
