module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;
  if (!ordersRepository) {
    throw new Error("ordersRepository should be in dependencies");
  }

  const execute = ({ id }) => {
    return ordersRepository.getById(id);
  };

  return {
    execute,
  };
};
