const express = require("express");
const Post = require("../../../models/post");
const Game = require("../../../models/game");
const { access } = require("fs");

const router = express.Router();

router.get("/", async (req, res, next) => {
    const gamelist = [];

    const games = await Game.findAll({});

    for (const game of games) {
        gamelist.push({
            url: game.img,
            title: game.name,
            id: game.id,
            average: game.star,
        });
    }

    res.render("index", {
        games: gamelist,
    });
});

router.get("/detail/:id", async (req, res, next) => {
    const gameId = req.params.id;
    const game = await Game.findByPk(gameId);
    let comment = "";

    if (!game) {
        return res.status(404).send("게임을 찾을 수 없습니다.");
    }

    const posts = await Post.findAll({ where: { GameId: gameId } });

    posts.forEach((post) => {
        comment += post.dataValues.text + "\n\n\n";
    });

    const gameData = {
        imageUrl: game.img,
        title: game.name,
        rating: game.star,
        review: comment,
    };

    res.render("detail", { game: gameData });
});

router.get("/login", (req, res, next) => {
    res.render("login", {});
});

router.get("/join", (req, res, next) => {
    res.render("join", {});
});

module.exports = router;
