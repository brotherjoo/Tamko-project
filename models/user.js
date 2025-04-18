const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                nickname: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true,
                },
                auth: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Post);
    }
};
