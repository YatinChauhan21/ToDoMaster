const router = require('express').Router();
const User = require("../models/user");
const List = require("../models/list");

// 🟢 Create Task (POST)
router.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        const newList = new List({ title, body, user: existingUser });
        await newList.save();
        existingUser.list.push(newList);
        await existingUser.save();

        return res.status(200).json({ list: newList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!" });
    }
});

// 🟡 Update Task (PUT)
// router.put('/updateTask/:id', async (req, res) => {
//     try {
//         const { title, body } = req.body;
       

//         const list = await List.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
//         list.save().then(()=>{
//             res.status(200).json({ message: 'Task updated successfully' });
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error!" });
//     }
// });
// 🟡 Update Task (PUT)
// 🟡 Update Task (PUT)
router.put('/updateTask/:id', async (req, res) => {
    try {
        const { title, body } = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, { title, body }, { new: true });

        if (!list) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', list });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Server error!" });
    }
});

// 🔴 Delete Task (DELETE)
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Received delete request for:", id); // ✅ Debugging

        const result = await List.findByIdAndDelete(id); // ✅ Fix: Use `List` instead of `TaskModel`
        if (!result) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error!" });
    }
});


// 🟢 Get Tasks by User ID
router.get('/getTask/:id', async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

        if (list.length === 0) {
            return res.status(200).json({ message: "No tasks found" });
        }

        res.status(200).json({ list });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!" });
    }
});

// router.put('/markAsDone/:id', async (req, res) => {
//     try {
//       const list = await List.findByIdAndUpdate(req.params.id, { isDone: true }, { new: true });
  
//       if (!list) {
//         return res.status(404).json({ message: 'Task not found' });
//       }
  
//       res.status(200).json({ message: 'Task marked as done successfully', list });
//     } catch (error) {
//       console.error("Error marking task as done:", error);
//       res.status(500).json({ message: "Server error!" });
//     }
//   });
  

module.exports = router;


// const router = require('express').Router();
// const User = require("../models/user")
// const List = require("../models/list")

// //create opertions : POST 
// router.post('/addTask', async (req, res) => {
//     try {
//         const {title, body, id} = req.body;
//         const existingUser = await User.findById(id);
//         if (existingUser) {
//             const newList = new List({title, body, user: existingUser});
//             await newList.save().then(()=> res.status(200).json({list: newList}));
//             existingUser.list.push(newList);
//             await existingUser.save();

//         }
//     } catch (error) {
//         console.log(error)
        
//     }

// })

// //update opertions : GET 

// router.put('/updateTask/:id', async (req, res) => {
//     try {
//         const {title, body, email} = req.body;
//         console.log("Request email:", email);
//         const existingUser = await User.findOne({email});
//         console.log("Existing user:", existingUser); 
//         if (existingUser) {
//             const list = await List.findByIdAndUpdate(req.params.id,{title,body});
//             list.save().then(()=> res.status(200).json({message: 'Task updated successfully'}));

//         }
//     } catch (error) {
//         console.log(error)
        
//     }

// })

// //delete opertions : DELETE
// router.delete('/deleteTask/:id', async (req, res) => {
//     try {
//         const {email} = req.body;
//         console.log("Request email:", email);
//         const existingUser = await User.findOneAndUpdate({email},{$pull: {list: req.params.id}});
//         console.log("Existing user:", existingUser); 
//         if (existingUser) {
//             const list = await List.findByIdAndDelete(req.params.id).then(()=> res.status(200).json({message: 'Task deleted successfully'}));

//         }
//     } catch (error) {
//         console.log(error)
        
//     }

// })

// //getTaskById  :
// router.get('/getTask/:id', async (req, res) => {
//     try {
//         const list  = await List.find({user: req.params.id}).sort({createdAt: -1});
//         if (list.length !==0){
//             res.status(200).json({list: list});

//         }
//         else{
//             res.status(200).json({message: 'Task not found'});
//         }

        
//     } catch (error) {
//         console.log(error)
        
//     }

// })

// module.exports = router;