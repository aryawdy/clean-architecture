const { Order } = require("../../entities");

module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;
  if (!ordersRepository) {
    throw new Error("productsRepository should be in dependencies");
  }

  const execute = ({ userId, productId, date, isPayed, meta }) => {
    const order = new Order({
      userId,
      productId,
      date,
      isPayed,
      meta,
    });
    return ordersRepository.add(order);
  };

  return {
    execute,
  };
};
