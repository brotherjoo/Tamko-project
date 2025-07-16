const express = require("express");

const Post = require("../../../models/post");
const Game = require("../../../models/game");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares/check_login");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/", isLoggedIn, async (req, res, next) => {
    const gamelist = await Game.findAll({});

    console.log(gamelist);

    const games = gamelist.map((game) => {
        const name = game.dataValues.name;
        return {
            name: name,
        };
    });

    res.render("blog", { games: games });
});

router.post("/register", isLoggedIn, upload.single("otherGameImage"), async (req, res, next) => {
    try {
        const { rating, description, game, otherGameTitle } = req.body;
        const userId = req.user.dataValues.id;
        const imageFile = req.file;

        if (game === "other") {
            if (!otherGameTitle || !imageFile) {
                return res.status(400).json({ message: "기타 게임 정보가 누락되었습니다." });
            }
            // 파일 경로 예: "/uploads/filename.jpg"
            const imagePath = "/uploads/" + imageFile.filename;

            const game = await Game.create({
                name: otherGameTitle,
                img: imagePath,
                star: rating,
            });

            await Post.create({
                text: description,
                star: rating,
                GameId: game.id,
                UserId: userId,
            });
        } else {
            const oldgame = await Game.findOne({ where: { name: game } });

            const posts = await Post.findAll({
                where: { gameId: oldgame.id },
            });

            let sum = 0;

            console.log(posts);

            for (const post of posts) {
                const starNum = Number(post.dataValues.star);
                sum += starNum;
            }

            const ratingNum = Number(rating);
            sum += ratingNum;

            const Ex = sum / (posts.length + 1);
            console.log(Ex);

            await Game.update({ star: Ex }, { where: { id: oldgame.id } });

            await Post.create({
                text: description,
                star: rating,
                GameId: oldgame.id,
                UserId: userId,
            });
        }
        return res.status(200).json({ message: "등록 완료" });
    } catch (error) {
        console.error("글 작성 중 에러:", error);
        return res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;
