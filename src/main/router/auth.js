const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares/check_login");

const User = require("../../../models/user");

const router = express.Router();

router.post("/join", async (req, res, next) => {
    console.log(req.body);
    const { email, password, nickname } = req.body;
    console.log(1);
    console.log(email, password, nickname);
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            res.status(403).send("Already present");
            return;
        }

        const hash = await bcrypt.hash(password, 12);

        await User.create({
            email: email,
            password: hash,
            nickname: nickname,
            // auth: "nomal",
        });

        res.status(201).send("ok");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(error);
        }

        if (!user) {
            return res.status(403).send("loginError");
        }

        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }

            return res.status(301).send("created");
        });
    })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
