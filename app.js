const express = require("express");
const app = express();
const router = express.Router();
const age = require("./midlwr/age.js");
const user = require(user.json);

//app level middleware - it will run for all the routes defined in the app
//router level middleware - it will run for all the routes defined in the router
//partial is also used as filder name for the middleware function

/*
app.use((req, res, next) =>{
    console.log("From M1");
    //if u want to end use res.end() or next to pass to next middleware
    next();
});

app.use((req, res, next) =>{
    console.log("From M2");
    next();
});

//here this 2 middlewares are at application level and hence it will run before any routes

app.get('/', async(req, res) => {
    res.send("Hello World");
})

app.get('/home', async(req, res) => {
    res.send("Welcome to Home Page");
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
*/

// router.use((req, res, next) =>{
//     const age = req.query.age;
//     if(age <= 18){
//         res.send("You are not allowed to access this page due to underage");
//         res.end();
//     }else if(age > 18 && age <= 25){
//         res.send("You are allowed to access this page but with some restrictions");
//         next();
//     }
//     else {
//         res.send("You are overage to access this page");
//         res.end();
//     }
    
// })

// router.use((req, res, next) =>{
//     age();
//     next();
// })

// app.get("/", (req, res) => {
//     res.send("Welcome ");
// });

// app.get("/home", age,  (req, res) => {
//     res.send("Welcome to the Home Page");
// });

app.get("/displayUserData", (req, res) => {
    return res.json(user);
})

app.get("/displayUsername , (req, res) =>{
    const 
})}
app.use((req, res) =>{
    res.send("404 Not Found");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})