const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      order: { updateOrderUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id, userId, productId, date, isPayed, meta } = req.body;
      const updateOrder = updateOrderUseCase(dependencies);
      const response = await updateOrder.execute({
        id,
        userId,
        productId,
        images,
        date,
        isPayed,
        meta,
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
};
