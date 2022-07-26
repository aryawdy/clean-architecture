module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;
  if (!ordersRepository) {
    throw new Error("ordersRepository should be in dependencies");
  }

  const execute = ({ order = {} }) => {
    return ordersRepository.delete(order);
  };

  return {
    execute,
  };
};
