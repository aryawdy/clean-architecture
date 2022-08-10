const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const {
    useCases: {
      order: { deleteOrderUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id, userId, productId, date, isPayed, meta } = req.body;
      const deleteOrder = deleteOrderUseCase(dependencies);
      const response = await deleteOrder.execute({
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
