const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
    if (req.user) {
        res.locals.isLoggedIn = true;
        res.locals.nickname = req.user.dataValues.nickname;
        res.locals.email = req.user.dataValues.email;
    } else {
        res.locals.isLoggedIn = false;
    }

    next();
});

module.exports = router;
