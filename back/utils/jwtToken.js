
const sendToken = (user, statuscode,res)=>{

    const token = user.getJWTToken();

    // console.log(token)

   
    const options = {
        expire: new Date(
            // Date.now + process.env.COOKIE_EXPIRE*24*60*100*60
            Date.now +5*24*60*100*60
        ),
        httponly:true
    }

    // res.status(statuscode).cookie('token',token,options).json({
    // res.cookie('token',token,options).json({
    res.cookie('token',token).json({
        success:true,
        user,
        token
    })
    // res.send("cookie send")
}

module.exports = sendToken