const Chance = require("chance");
const chance = new Chance();
const { Order } = require("../../../src/entities");
const {
  order: {
    addOrderUseCase,
    getOrderById,
    deleteOrderUseCase,
    updateOrderUseCase,
  },
} = require("../../../src/useCases");
const { v4 } = require("uuid");

describe("Order use cases", () => {
  const mockOrderRepo = {
    add: jest.fn(async (order) => ({ ...order, id: v4() })),
    getById: jest.fn(async (id) => ({
      id,
      name: chance.name(),
      description: chance.sentence(),
      images: [v4(), v4()],
      price: chance.natural(),
      color: chance.color(),
      meta: {},
    })),
    update: jest.fn(async (order) => order),
    delete: jest.fn(async (order) => order),
  };

  const dependencies = {
    ordersRepository: mockOrderRepo,
  };

  describe("Add order use cases", () => {
    test("Order should be added", async () => {
      const testOrderData = new Order({
        userId: v4(),
        productId: [v4(), v4()],
        images: [v4(), v4()],
        date: new Date(),
        isPayed: true,
        meta: {
          comment: "deliver as soon as possible",
        },
      });

      const savedOrder = await addOrderUseCase(dependencies).execute(
        testOrderData
      );
      expect(savedOrder).toBeDefined();
      expect(savedOrder.id).toBeDefined();
      expect(savedOrder.userId).toBe(testOrderData.userId);
      expect(savedOrder.productId).toBe(testOrderData.productId);
      expect(savedOrder.date).toBe(testOrderData.date);
      expect(savedOrder.isPayed).toBe(testOrderData.isPayed);
      expect(savedOrder.meta).toBe(testOrderData.meta);

      const expectedOrderData = mockOrderRepo.add.mock.calls[0][0];
      expect(expectedOrderData).toEqual(testOrderData);
    });
  });

  describe("get order use cases", () => {
    test("get order by id", async () => {
      const fakeId = v4();
      const orderById = await getOrderById(dependencies).execute({
        id: fakeId,
      });
      expect(orderById).toBeDefined();
      expect(orderById.id).toBe(fakeId);
      expect(orderById.name).toBeDefined();
      expect(orderById.description).toBeDefined();
      expect(orderById.images).toBeDefined();
      expect(orderById.price).toBeDefined();
      expect(orderById.color).toBeDefined();
      expect(orderById.meta).toBeDefined();
      const call = mockOrderRepo.getById.mock.calls[0][0];
      expect(call).toBe(fakeId);
    });
  });

  describe("update order use cases", () => {
    test("Order should be updated", async () => {
      const testData = {
        id: v4(),
        userId: v4(),
        productId: [v4(), v4()],
        images: [v4(), v4()],
        date: new Date(),
        isPayed: true,
        meta: {
          comment: "deliver as soon as possible",
        },
      };
      const updatedOrder = await updateOrderUseCase(dependencies).execute({
        order: testData,
      });

      expect(updatedOrder).toEqual(testData);

      const expectedOrder = mockOrderRepo.update.mock.calls[0][0];
      expect(expectedOrder).toEqual(testData);
    });
  });

  describe("delete order use cases", () => {
    test("Order should be deleted", async () => {
      const testData = {
        id: v4(),
        userId: v4(),
        productId: [v4(), v4()],
        images: [v4(), v4()],
        date: new Date(),
        isPayed: true,
        meta: {
          comment: "deliver as soon as possible",
        },
      };
      const deletedOrder = await deleteOrderUseCase(dependencies).execute({
        order: testData,
      });

      expect(deletedOrder).toEqual(testData);

      const expectedOrder = mockOrderRepo.delete.mock.calls[0][0];
      expect(expectedOrder).toEqual(testData);
    });
  });
});
