import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";



// login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn't Exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET) // here we have to provide salt using that our data will be encypted
}



// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // checking is user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format and strng pwd
        if (!validator.isEmail(email)) { // is this check the users email is a valid or not
            return res.json({ success: false, message: "Please enter validate email" })
        }
        // check pwd is greater than 8 digit
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter strong password" })
        }
        // if this if-statement is executed means email is valid in that case ww will create one account .
        // before creating the account we will encrypt the password to encrypt the password so we will use bycrpt package

        // hashing user pwd
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })


        const user = await newUser.save()
        // after saving this data we will store that user in this user variable after that we will create the token.
        // we will send the token using the response to the user lets come here and here we will create one function that is create token
        const token = createToken(user._id)
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }
}

export { loginUser, registerUser };
