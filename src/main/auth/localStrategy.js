const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../../../models/user");

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const exUser = await User.findOne({ where: { email } });
                    console.log(exUser);
                    if (exUser) {
                        const result = await bcrypt.compare(password, exUser.password);
                        if (result) {
                            done(null, exUser);
                        } else {
                            done(null, false, { message: "password not correct" });
                        }
                    } else {
                        done(null, false, { message: "not found user" });
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
