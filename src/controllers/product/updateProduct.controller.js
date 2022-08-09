const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      product: { updateProductUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id, name, description, price, color, meta } = req.body;
      const updateProduct = updateProductUseCase(dependencies);
      const response = await updateProduct.execute({
        id,
        name,
        description,
        images,
        price,
        color,
        meta,
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
};
