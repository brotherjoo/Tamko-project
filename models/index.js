const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Post = require("./post");
const Game = require("./game");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Game = Game;

User.init(sequelize);
Game.init(sequelize);
Post.init(sequelize);

User.associate(db);
Game.associate(db);
Post.associate(db);

module.exports = db;
