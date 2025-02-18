const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs");

//sign up
router.post("/register", async (req, res) => {
    try {
        const {email, username , password} = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({email, username, password: hashpassword});
        await user.save()
        .then(() => {
            res.status(200).json({ message: "signup successful"});
        })
    } catch (error) {
        res.status(200).json({ message: "user already Exist with this email" });
        
    }
})

//sign in
router.post("/SignIn", async (req, res) => {
    try {
        const user  = await User.findOne({email: req.body.email});
        if(!user) {
            res.status(200).json({ message: "Please sign up first" });
        }
        const IsPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password);
            if (!IsPasswordCorrect) {
                res.status(200).json({ message: "Invalid credentials" });
            }
            const {password, ...others} = user._doc; 
            //to extract the password from user._doc whick stores actual data in the _doc property and store the rest of the properties in an object called others 
            res.status(200).json({others}); 
            //res.status(200)= Sets the HTTP status code of the response to 200, which means "OK" or "successful request
            // json({others}) Sends a JSON response containing only the others object


    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
})

module.exports = router;