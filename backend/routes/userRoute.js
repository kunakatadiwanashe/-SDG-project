const express = require('express')
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: "user  already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        res.status(200).send({ message: "user created", success: true })
    } catch (error) {
         res.status(500).send({ message: "error creating user", success: false, error});
    }
})


router.post('/signin', async (req, res) => {
    try {

    } catch (error) {

    }
})

module.exports = router