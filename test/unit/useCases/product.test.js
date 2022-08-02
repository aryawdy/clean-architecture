const {
  product: {
    addProductUseCase,
    getProductById,
    updateProductUseCase,
    deleteProductUseCase,
  },
} = require("../../../src/useCases");

const Chance = require("chance");
const chance = new Chance();
const { Product } = require("../../../src/entities");

const { v4 } = require("uuid");

describe("Product use cases", () => {
  const mockProductRepo = {
    add: jest.fn(async (product) => ({ ...product, id: v4() })),
    getById: jest.fn(async (id) => ({
      id,
      name: chance.name(),
      description: chance.sentence(),
      images: [v4(), v4()],
      price: chance.natural(),
      color: chance.color(),
      meta: {},
    })),
    update: jest.fn(async (product) => product),
    delete: jest.fn(async (product) => product),
  };

  const dependencies = {
    productsRepository: mockProductRepo,
  };

  describe("Add product use cases", () => {
    test("Product should be added", async () => {
      const testProductData = new Product({
        name: chance.name(),
        description: chance.sentence(),
        images: [v4(), v4()],
        price: chance.natural(),
        color: chance.color(),
        meta: {
          comment: "the best product of the year",
        },
      });

      const savedProduct = await addProductUseCase(dependencies).execute(
        testProductData
      );
      expect(savedProduct).toBeDefined();
      expect(savedProduct.id).toBeDefined();
      expect(savedProduct.name).toBe(testProductData.name);
      expect(savedProduct.description).toBe(testProductData.description);
      expect(savedProduct.images).toBe(testProductData.images);
      expect(savedProduct.price).toBe(testProductData.price);
      expect(savedProduct.color).toBe(testProductData.color);
      expect(savedProduct.meta).toBe(testProductData.meta);

      const expectedProductData = mockProductRepo.add.mock.calls[0][0];
      expect(expectedProductData).toEqual(testProductData);
    });
  });

  describe("get product use cases", () => {
    test("get product by id", async () => {
      const fakeId = v4();
      const productById = await getProductById(dependencies).execute({
        id: fakeId,
      });
      expect(productById).toBeDefined();
      expect(productById.id).toBe(fakeId);
      expect(productById.name).toBeDefined();
      expect(productById.description).toBeDefined();
      expect(productById.images).toBeDefined();
      expect(productById.price).toBeDefined();
      expect(productById.color).toBeDefined();
      expect(productById.meta).toBeDefined();
      const call = mockProductRepo.getById.mock.calls[0][0];
      expect(call).toBe(fakeId);
    });
  });

  describe("update product use cases", () => {
    test("Product should be updated", async () => {
      const testData = {
        id: v4(),
        name: chance.name(),
        description: chance.sentence(),
        images: [v4(), v4()],
        price: chance.natural(),
        color: chance.color(),
        meta: {
          comment: "the best product of the year",
        },
      };
      const updatedProduct = await updateProductUseCase(dependencies).execute({
        product: testData,
      });

      expect(updatedProduct).toEqual(testData);

      const expectedProduct = mockProductRepo.update.mock.calls[0][0];
      expect(expectedProduct).toEqual(testData);
    });
  });

  describe("delete product use cases", () => {
    test("Product should be deleted", async () => {
      const testData = {
        id: v4(),
        name: chance.name(),
        description: chance.sentence(),
        images: [v4(), v4()],
        price: chance.natural(),
        color: chance.color(),
        meta: {
          comment: "the best product of the year",
        },
      };
      const deletedProduct = await deleteProductUseCase(dependencies).execute({
        product: testData,
      });

      expect(deletedProduct).toEqual(testData);

      const expectedProduct = mockProductRepo.delete.mock.calls[0][0];
      expect(expectedProduct).toEqual(testData);
    });
  });
});
