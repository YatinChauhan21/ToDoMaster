const express = require('express');
const app = express();
const path = require('path');
require("./db/connection");
const auth = require("./routes/auth");
const list  = require("./routes/list")
const cors = require('cors');

app.use(express.json());
app.use(cors());
const port = 3000;


app.use("/api/v1", auth)
app.use("/api/v2", list)

app.get("/",(req, res)=>{
    app.use(express.static(path.resolve(__dirname, 'frontend', 'dist')));
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
})
app.get("/todo", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});