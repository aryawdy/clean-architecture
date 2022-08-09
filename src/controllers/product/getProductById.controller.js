const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      product: { getProductById },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const getProduct = getProductById(dependencies);
      const response = await getProduct.execute({
        id,
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
};
