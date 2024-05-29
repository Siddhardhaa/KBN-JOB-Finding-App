const router = require('express').Router();
const bcrypt = require('bcrypt');
const {UserP} =require('../model/SchemaP')
const {UserS} =require('../model/SchemaF')

const jwt = require('jsonwebtoken');

//register route for job seeker
router.post("/registerS", async (req, res) => {
    let { name, username, email, password } = req.body;
    //check the user already exist with this email
    const takenEmail = await UserS.findOne({ username: username });
    if (takenEmail) {
        return res.status(405).json("username already exists");
    } else {
        password = await bcrypt.hash(req.body.password, 10);
        const newUser = new UserS({
            name,
            username,
            email,
            password,
        });
        await newUser.save();
        return res.json("user account created sucessfully");
    }
    console.log("register")
});
//register route for job poster
router.post("/registerP", async (req, res) => {
    let { name, username, email, password } = req.body;
    //check the user already exist with this email
    const takenEmail = await UserP.findOne({ username: username });
    if (takenEmail) {
        return res.status(405).json("username already exists");
    } else {
        password = await bcrypt.hash(req.body.password, 10);
        const newUser = new UserP({
            name,
            username,
            email,
            password,
        });
        await newUser.save();
        return res.json("user account created sucessfully");
    }
});
    //login job seeker user
router.post("/loginS", async (req, res) => {
    try {
        const { username, password } = req.body;
        //confirm the user is register or not
        const userexist = await UserS.findOne({ username: username });
        if (!userexist) {
            return res.status(404).json('user not found');
        }
        bcrypt.compare(password, userexist.password).then((isCorrect) => {
            if (isCorrect) {
                let payload = {
                    user: {
                        id: userexist.id
                    }
                }
                jwt.sign(payload, 'newsecreate', { expiresIn: 360000000 }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({ token: token, name: userexist.name });
                });
            }
            else {
                return res.status(405).json('password is incorrect');
            }
        }
        );
    } catch (error) {
        return res.status(500).json("server error")
    }
});

  //login  job poster user
  router.post("/loginP", async (req, res) => {
    try {
        const { username, password } = req.body;
        //confirm the user is register or not
        const userexist = await UserP.findOne({ username: username });
        if (!userexist) {
            return res.status(404).json('user not found');
        }
        bcrypt.compare(password, userexist.password).then((isCorrect) => {
            if (isCorrect) {
                let payload = {
                    user: {
                        id: userexist.id
                    }
                }
                jwt.sign(payload, 'newsecreate', { expiresIn: 360000000 }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({ token: token, name: userexist.name });
                });
            }
            else {
                return res.status(405).json('password is incorrect');
            }
            
        }
        );
    } catch (error) {
        return res.status(500).json("server error")
    }
});

module.exports = router;
