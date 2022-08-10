const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      order: { getOrderById },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const getOrder = getOrderById(dependencies);
      const response = await getOrder.execute({
        id,
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
};
