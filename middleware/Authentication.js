const jwt = require("jsonwebtoken");
const secretKey = "zKz7RbFmz7gJC5thzKz7RbFmz7gJC5thzKz7RbFmz7gJC5th"
const users = require("../modals/userSchema");

const Authentication = async (req, res, next) => {

    try {
        const token = req.headers.authorization;

        const verifyUser = jwt.verify(token, secretKey);

        const validuser = await users.findOne({ _id: verifyUser._id });

        if (!validuser) throw new Error("invalid user");

        req.token = token
        req.rootUser = validuser
        req.userId = validuser._id

        next();
    }

    catch (error) {
        res.status(401).json({ status: 401, message: "Unauthorized no token provide" })
    }

};

module.exports = Authentication;