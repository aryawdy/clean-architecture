const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { getUserById },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const getUser = getUserById(dependencies);
      const response = await getUser.execute({
        id,
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
};
