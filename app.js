const express = require('express');
const session = require('express-session'); 
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const FileStore = require('session-file-store')(session);

app.use(session({
    store: new FileStore(),
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 50 * 1000 } // Set to true if using HTTPS
}));

app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username} = req.body;
    req.session.user = { username };
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    res.render('home');
});

app.get('/product', (req, res) => {
    res.render('product');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// render is used to render a view template and send the resulting HTML to the client. In this code, it is used to render the 'login', 'home', and 'product' views when the corresponding routes are accessed.
// redirect is used to redirect the client to a different URL. In this code, it is not used, but it can be used to redirect users to the login page if they are not authenticated when trying to access protected routes like '/home' or '/product'.