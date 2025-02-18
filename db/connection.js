const mongoose = require('mongoose');

const DbConnection = async(req,res)=>{
   try {
    await  mongoose.connect('mongodb+srv://yatinchauhan:ToDo123@todo.it2ps.mongodb.net/?retryWrites=true&w=majority&appName=ToDo')
   .then(()=>{
    console.log('Connected to MongoDB');
   })
   } catch (error) {
    console.error(error)
    
   }
};

module.exports = DbConnection();