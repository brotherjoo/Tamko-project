const express = require("express");

const User = require("../../../models/user");
const Post = require("../../../models/post");
const Game = require("../../../models/game");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    const { user, post, game } = req.body;

    const exUser = await User.findOne({ where: user.email });

    if (!exUser) {
        res.status(403).send("not found user");
    }

    const exGame = await Game.findOne({ where: "name" });

    if (!exGame) {
        await Game.create({
            name: game.name,
        })
    }

    
});
