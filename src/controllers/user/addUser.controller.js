const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { addUserUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id, name, lastName, gender, meta } = req.body;
      const addUser = addUserUseCase(dependencies);
      const response = await addUser.execute({
        id,
        name,
        lastName,
        gender,
        meta,
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
};
