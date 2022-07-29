module.exports = (dependencies) => {
  const { usersRepository } = dependencies;
  if (!usersRepository) {
    throw new Error("The users repository should be exist in");
  }
  const execute = ({ user = {} }) => {
    return usersRepository.getById(user);
  };
  return {
    execute,
  };
};
