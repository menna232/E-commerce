const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const apiError = require('./utils/apiError')
const globlaError = require('./middlewares/errorsMiddleware')
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

// catch error if user enterd wrong path , [not mounted - dose not exists]
app.all('*',(req,res,next)=>{
  // next sends the error msg to the global error handler
  next(new apiError(`cant find this rout ${req.originalUrl}` , 400))
})

// global middlewere for error handling ussing express [for errors occures in express only] 
app.use(globlaError) 

app.get("/", (req, res) => {
  res.send();
});

const PORT = process.env.PORT || 8000;
const server  = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

//handling errors that occurs outside express instade of using catch() after promisses 
process.on('unhandledRejection' , (err)=>{
  console.error(`the error occured ${err.name} | ${err.message}`)
  server.close(()=>{
    console.error("closing .....")
    // extit after closeing the server , finish pinding requests first if there any 
    process.exit(1)
  })
})

