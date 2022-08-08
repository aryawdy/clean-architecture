const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { deleteUserUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id, name, lastName, gender, meta } = req.body;
      const deleteUser = deleteUserUseCase(dependencies);
      const response = await deleteUser.execute({
        user: {
          id,
          name,
          lastName,
          gender,
          meta,
        },
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
};
