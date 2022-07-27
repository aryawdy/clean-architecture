const { User, userConstraint } = require("./User");
const { Product } = require("./Product.js");

module.exports = {
  User,
  constants: {
    userConstraint,
  },
};
