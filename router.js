const express = require("express");
const router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "1234"

}


//home route
router.get('/', (req, res) => {
    if (req.session.logedin) {
        res.redirect("/dashboard")
    }
    else {
        res.render('base', { title: "Login System" })
    }

})


//;login user
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.logedin = true
        req.session.user = req.body.email;
        res.redirect('/dashboard');
    } else if (req.body.email != credential.email) {
        res.render('base', { title: "Login Page", Inputs: "Invalid Username......!" })
    } else if (req.body.password != credential.password) {
        res.render('base', { title: "Login Page", Inputs: "Invalid Password......!" })
    }
});

//route for dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    } else {
        res.redirect("/")
    }
})



// rout for /logout
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send("Error")
        } else {
            res.redirect("/")
        }


    })

})



module.exports = router;