const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { deleteUserUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const getUserById = getUserById(dependencies);
      const response = await getUserById.execute({
        id,
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
};
