const express = require("express");
const game = require("../../../models/game");
const post = require("../../../models/post");

const router = express.Router();

// 선택 된 일부 글만 가져오기
router.get("/{name}", (req, res, next) => {});

// 전체 글 모두 가져오기
router.get("/all", (req, res, next) => {});

// 글 등록
router.post("/register", (req, res, next) => {});

// 글 수정
router.put("/update", (req, res, next) => {});

// 글 삭제
router.delete("/delete", (req, res, next) => {});

module.exports = router;
