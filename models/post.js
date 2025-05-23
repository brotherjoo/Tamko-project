const Sequelize = require("sequelize");

module.exports = class post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                text: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                img: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Post",
                tableName: "posts",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Post.belongsTo(db.Game);
        db.Post.belongsTo(db.User);
    }
};
