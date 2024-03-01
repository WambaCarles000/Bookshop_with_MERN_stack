const express = require("express");
const cors = require("cors");
require("dotenv").config();



const app = express();
const connectDB = require("./config/db");
// const Book = require('./models');
const port =process.env.PORT;



// COnnexion a la base de donnees

connectDB();


// Middleware pour traiter les donnees json entrees dans la requete 

app.use(express.urlencoded({extended : true}));
// Middleware pour analyser le corps de la requête en JSON
app.use(express.json());



//Middleware for handling cors policy
//OPTION 1: Default value 
app.use(cors());


//Middleware for handling cors policy
//OPTION 2: personalizing with more control
// app.use(cors(
//   {

//     origin:'http://locahost:3000',
//     methods:['POST','GET','PUT','DELETE'],
//     allowedHeaders:['content-type']
   
    
//     }
// ));


app.get("/",(request,response)=>{
console.log(request);
  return   response.status(200).send("welcome to my bookstore");
});


//book's routes
app.use("/books",require("./routes/book.routes.js"));

app.listen(port,()=>{
    
    console.log(`Server running on port :${port}`);
     
})


 