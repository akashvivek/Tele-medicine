const app = require('./app');
const cors = require('cors');

app.use(
    cors({
      origin: "http://localhost:3001",
    //   preflightContinue: true,
      methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
      credentials: true,
      optionsSuccessStatus:200    })
  );
const connectDatabase = require("./config/database")
const dotenv = require('dotenv')
// const cloudinary = require("cloudinary")

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down server due to uncaughtException`)
    process.exit(1)
})
 

//config
dotenv.config({path:'../back/config/config.env'})



//conneting to database
connectDatabase()

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })



const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})


//Unhanlded Promise rejection  //error which has occured while i had written mongo instead of mongodb
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unHandled Promise Rejection`)

    server.close(()=>{
        process.exit(1)
    })
})