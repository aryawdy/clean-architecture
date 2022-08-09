const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      product: { deleteProductUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id, name, description, price, color, meta } = req.body;
      const deleteProduct = deleteProductUseCase(dependencies);
      const response = await deleteProduct.execute({
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
