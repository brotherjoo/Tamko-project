const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const { sequelize } = require("../../models");

const authConfig = require("./auth/index");
const indexRouter = require("./router");
const authRouter = require("./router/auth");
const blogRouter = require("./router/blog");
const defaultRouter = require("./router/default");

require("dotenv").config();

const app = express();
authConfig();
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../../public")));
console.log(path.join(__dirname, "public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(defaultRouter);
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/blog", blogRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
