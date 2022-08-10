const addOrderController = require("./addOrder.controller");
const getOrderByIdController = require("./getOrderById.controller");
const deleteOrderController = require("./deleteOrder.controller");
const updateOrderController = require("./updateOrder.controller");

module.exports = (dependencies) => {
  return {
    addOrderController: addOrderController(dependencies),
    getOrderByIdController: getOrderByIdController(dependencies),
    updateOrderController: updateOrderController(dependencies),
    deleteOrderController: deleteOrderController(dependencies),
  };
};
