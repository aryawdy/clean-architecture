const Chance = require("chance");
const chance = new Chance();
const {
  ordersRepository,
} = require("../../../src/frameworks/repositories/inMemory");

const { cloneDeep } = require("lodash");
const { Order } = require("../../../src/entities");
const { v4 } = require("uuid");

describe("Order repository", () => {
  test("New Order should be added and returned", async () => {
    const testOrder = new Order({
      userId: v4(),
      productId: [v4(), v4()],
      date: new Date(),
      isPayed: true,
      meta: {
        comment: "Deliver it to me as soon as possible",
      },
    });

    const addedOrder = await ordersRepository.add(testOrder);

    expect(addedOrder).toBeDefined();
    expect(addedOrder.id).toBeDefined();
    expect(addedOrder.userId).toBe(testOrder.userId);
    expect(addedOrder.productId).toBe(testOrder.productId);
    expect(addedOrder.date).toBe(testOrder.date);
    expect(addedOrder.isPayed).toEqual(testOrder.isPayed);
    expect(addedOrder.meta).toEqual(testOrder.meta);

    const returnOrder = await ordersRepository.getById(addedOrder.id);

    expect(returnOrder).toEqual(addedOrder);
  });

  test("Order should be deleted and returned", async () => {
    const willDeletedOrder = new Order({
      userId: v4(),
      productId: [v4(), v4()],
      date: new Date(),
      isPayed: true,
      meta: {
        comment: "Deliver it to me as soon as possible",
      },
    });
    const stayOrder = new Order({
      userId: v4(),
      productId: [v4(), v4()],
      date: new Date(),
      isPayed: true,
      meta: {
        comment: "Deliver it to me as soon as possible",
      },
    });
    const [willBeDeletedOrder, stayAddedOrder] = await Promise.all([
      ordersRepository.add(willDeletedOrder),
      ordersRepository.add(stayOrder),
    ]);

    expect(willBeDeletedOrder).toBeDefined();
    expect(stayAddedOrder).toBeDefined();
    const deletedOrder = await ordersRepository.delete(willBeDeletedOrder);
    expect(deletedOrder).toEqual(deletedOrder);

    const shouldBeUndefinedOrder = await ordersRepository.delete(
      willBeDeletedOrder
    );
    expect(shouldBeUndefinedOrder).toBeNull();

    const shouldBeDefinedOrder = await ordersRepository.getById(
      stayAddedOrder.id
    );
    expect(shouldBeDefinedOrder).toBeDefined();
  });

  test("Order should be updated and returned", async () => {
    const testOrder = new Order({
      userId: v4(),
      productId: [v4(), v4()],
      date: new Date(),
      isPayed: true,
      meta: {
        comment: "Deliver it to me as soon as possible",
      },
    });
    const addedOrder = await ordersRepository.add(testOrder);
    expect(addedOrder).toBeDefined();
    const clonedOrder = cloneDeep({
      ...addedOrder,
      userId: v4(),
      productId: v4(),
    });
    const updatedOrder = await ordersRepository.update(clonedOrder);
    expect(updatedOrder).toEqual(clonedOrder);
  });
});
