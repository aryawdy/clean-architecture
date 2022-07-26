const addUserController = require("./addUser.controller");
const getUserByIdController = require("./getUserById.controller");
const deleteUserController = require("./deleteUser.controller");
const updateUserController = require("./updateUser.controller");

module.exports = (dependencies) => {
  return {
    addUserController: addUserController(dependencies),
    getUserByIdController: getUserByIdController(dependencies),
    updateUserController: updateUserController(dependencies),
    deleteUserController: deleteUserController(dependencies),
  };
};
