const users = require("../modals/userSchema");
const bcrypt = require("bcryptjs");

// register
exports.register = async (req, res) => {

    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        return res.status(401).json("Please Fill All The Data")
    }

    try {

        const preuser = await users.findOne({ email: email });

        if (preuser) {
            return res.status(401).json("This User is Already Exist In our Db")
        } else if (password !== cpassword) {
            return res.status(401).json("Password And Confirm Password Not match")
        } else {
            const user = new users({
                fname, email, password, confirmpassword: cpassword
            });

            // password hashing process

            await user.save();

            return res.status(201).json(user)
        }
    } catch (error) {
        return res.status(401).json(error)
    }
}

// login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(401).json("Please Fill All The Data")
        }

        const preuser = await users.findOne({ email: email });

        if (preuser) {
            const verifyUser = await bcrypt.compare(password, preuser.password);

            if (verifyUser) {
                // token generating
                const token = await preuser.Authorizationoken();

                return res.status(201).json({ preuser, token });
            } else {
                return res.status(401).json("invalid details")
            }
        } else {
            return res.status(401).json("invalid details")
        }

    } catch (error) {
        return res.status(401).json(error)
    }
}

// user valid
exports.uservalid = async (req, res) => {
    try {
        const validuser = await users.findOne({ _id: req.userId });
        res.status(201).json(validuser)
    } catch (error) {
        res.status(401).json(error)
    }
}

// user logout
exports.userlogout = async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        req.rootUser.save();

        res.status(201).json(req.rootUser)

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}

// get ALL User
exports.getAlluser = async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}

// delete All user
exports.deleteuser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteuser = await users.findByIdAndDelete({ _id: id });
        res.status(201).json(deleteuser)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get Single User
exports.singleuser = async (req, res) => {
    const { id } = req.params;
    try {
        const singleUSer = await users.findOne({ _id: id });
        res.status(201).json(singleUSer);
    } catch (error) {
        res.status(401).json(error)
    }
}

// update user
exports.updateuser = async (req, res) => {
    const { id } = req.params;
    const { fname, email } = req.body;

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            fname: fname, email, email
        }, { new: true });
        res.status(201).json(updateuser)
    } catch (error) {
        res.status(401).json(error)
    }
}