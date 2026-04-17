const express = require("express");
//const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs"); 
const mongoose = require("mongoose");
const { type } = require("os");

const {connectMongoDb} = require('./connection');

const userRouter = require('./routes/user');

const {logReqRes} = require("./middlewares");

const PORT = 8000;

//connection

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log("MongoDB Connected"));
mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log("Mongo Err", err));
// schema
// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true, 
//     },
//     lastName: {
//         type: String,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     jobTitle: {
//         type: String,
//     },
//     gender: {
//         type: String,
//     },
//     },
//     {timestamps: true}
// );

// const User = mongoose.model("user", userSchema);
//middleware: Plugin , helps in inserting form data in body
app.use(express.urlencoded({extended: false}));

app.use(logReqRes("log.txt"));

app.use((req, res, next) =>{
    console.log("Hello from middleware1");
    next(); //its essential to pass request to next functions otherwise the program will stop and stuck at this middleware
});

app.use((req, res, next) =>{
    console.log(" Hello from middleware2");
    next(); //its essential to pass request to next functions otherwise the program will stop and stuck at this middleware
});



//HTML rendering
app.get("/users" , async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")};
    </ul>
    `;
    res.send(html);
});

//api using json
app.get("/api/users", async (req, res) =>{
    const allDbUsers = await User.find({});
    //res.setHeaders("X-MyName", "Ram"); start custom headers name with x in key-value pair
    // console.log(req.headers);
    return res.json(allDbUsers);
});

// getting a user detail through user id
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })



app
    .route("/api/users/:id")
    .get(async (req, res) =>{
        // const id = Number(req.params.id); [for file system]
        // const user = users.find((user) => user.id === id);
        // for mongoDB 
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error: 'user not found'});
        return res.json(user);
    })
    .patch( async (req, res) =>{
        // edit the user with id
        const user = await User.findByIdAndUpdate(req.params.id, {lastName: "Changed to Shukla"});
        return res.json({status: "Success"});
    })
    .delete( async (req, res) => {
        //delete the user with id
        await User.findByIdAndDelete(req.params.id);
        return res.json({status: 'Success'});
    });

app.post("/api/users", async (req, res) =>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title){
        return res.status(400).json({msg: 'All fields are required'});
    }
    /*users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
        return res.status(201).json({status: "success", id: users.length}); 
    });*/

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    console.log("Result", result);
    return res.status(201).json({msg : "success"});    
});

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));