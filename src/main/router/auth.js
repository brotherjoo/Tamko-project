const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares/check_login");

const User = require("../../../models/user");

const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
    console.log(req.body);
    const { email, password, nickname } = req.body;
    console.log(1);
    console.log(email, password, nickname);
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            res.redirect("/join?error=exist");
            return;
        }

        const hash = await bcrypt.hash(password, 12);

        await User.create({
            email: email,
            password: hash,
            nickname: nickname,
            // auth: "nomal",
        });

        res.redirect("/");
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
    console.log(req.body);

    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        if (!user) {
            return res.redirect(`/loginError=${info.message}`);
        }

        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }

            return res.redirect("/");
        });
    })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
