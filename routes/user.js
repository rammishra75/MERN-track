const express = require("express");

const {handleGetAllUsers,
     handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById, 
    handleCreateNewUser,
} = require('../controllers/user');

//we were using app() an object of express but here we will use separate router

const router = express.Router();
/*
router.get("/" , async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")};
    </ul>
    `;
    res.send(html);
});*/

//api using json
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

// getting a user detail through user id
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })



router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById); 
    
    
module.exports = router;