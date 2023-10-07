


const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncError")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
   
    const {token} = req.cookies;
    
// console.log(token)

    if(!token){
        return next(new ErrorHandler("Please Login to access Dashboard",401))
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET)
    // const decodeData = jwt.verify(token, "RONALDO")

   req.user =  await User.findById(decodeData.id);
  //  console.log(req.user)

   next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {//roles =admin if amin comes present in array then false as not operator
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };