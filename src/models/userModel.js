import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username!"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken : String,
    verifyTokenExpiry: Date,

})

//Generating a JWT token for Authorization
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
const User = mongoose.models.users || mongoose.model("users", userSchema); //if user collection is already created then use that else create one as user.

export default User;
