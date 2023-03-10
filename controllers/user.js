
const User = require('../models/User')

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const mailVarification = require("../utils/mailVerification")



exports.register = async (req, res) => {
    const { fName, lName, email, password, role } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    try {
        const userInDB = await User.findOne({ email: email });
        console.log(email, userInDB);
        if (!userInDB) {
            const data = new User({ fName, lName, email, password: hashpassword, role });
            await data.save();
            var userId = data.id


            //mail send function here

            mailVarification.mailerFun(email, fName, userId)

            res.status(201).json({
                message: "verification mail is sent Successfully",
                status: " verification panding",

            });

        } else {
            res.status(200).json({
                message: "this email is Alredy Used",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};

exports.verify = async (req, res) => {

    try {
        const { userId, uniqueString } = req.params
        const isKey = await User.findOne({ id: userId });
        console.log("isKey", isKey.uniqueString);
        // console.log("======+++++", userId, "++++++", uniqueString);
        const isData = await bcrypt.compare(uniqueString, isKey.uniqueString);
        if (isData) {
            isKey.isActive = true
            await isKey.save();
            const token = jwt.sign({ userId: userId }, "saurabh", {
                expiresIn: "10000h",
            });
            return res.status(201).json({
                message: "verification  Successfully",
                status: " verifed ",
                token: token,
            });
        }
        else {
            return res.status(500).json({
                message: "something went wrong",

            });
        }


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const data = await User.findOne({
        where: { email: email, isActive: true },
    });

    try {
        const isData = await bcrypt.compare(password, data.password);
        console.log(isData);
        if (data && isData) {
            const token = jwt.sign({ userId: data.id }, "saurabh");
            return res.status(200).json({
                status: 1,
                token: token,
            });
        } else {
            res.send("user not found");
        }
    } catch (err) {
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};

exports.Adminlogin = async (req, res) => {
    const { email, password } = req.body;

    const data = await User.findOne({
        where: { email: email, isActive: true, role: "admin" },
    });

    try {
        const isData = await bcrypt.compare(password, data.password);
        console.log(isData);
        if (data && isData) {
            const token = jwt.sign({ userId: data.id }, "saurabh");
            return res.status(200).json({
                status: 1,
                token: token,
            });
        } else {
            res.send("user not found");
        }
    } catch (err) {
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};






