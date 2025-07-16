const express = require("express");
const Post = require("../../../models/post");
const Game = require("../../../models/game");
const User = require("../../../models/user");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/check_login");

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

    console.log(posts);

    for (const post of posts) {
        const user = await User.findByPk(post.dataValues.UserId);

        let nickname = "(알 수 없음)";
        if (user) {
            nickname = user.dataValues.nickname;
        }

        const text = post.dataValues.text + `\tby ${nickname}` + "\n\n\n";
        comment += text;
    }

    console.log("d");

    const gameData = {
        imageUrl: game.img,
        title: game.name,
        rating: game.star,
        review: comment,
    };

    res.render("detail", { game: gameData });
});

router.get("/login", isNotLoggedIn, (req, res, next) => {
    res.render("login", {});
});

router.get("/join", isNotLoggedIn, (req, res, next) => {
    res.render("join", {});
});

module.exports = router;
