module.exports.Order = class Order {
  constructor({
    id,
    userId = null,
    productId = [],
    date = new Date(),
    isPayed = false,
    meta = {},
  }) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.date = date;
    this.isPayed = isPayed;
    this.meta = meta;
  }
};
