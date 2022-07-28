const Chance = require("chance");
const chance = new Chance();
const {
  productsRepository,
} = require("../../../src/frameworks/repositories/inMemory");

const { cloneDeep } = require("lodash");
const { Product } = require("../../../src/entities");

describe("Product repository", () => {
  test("New product should be added and returned", async () => {
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: { form: "China" },
      },
    });

    const addedProduct = await productsRepository.add(testProduct);

    expect(addedProduct).toBeDefined();
    expect(addedProduct.id).toBeDefined();
    expect(addedProduct.name).toBe(testProduct.name);
    expect(addedProduct.describe).toBe(testProduct.describe);
    expect(addedProduct.images).toBe(testProduct.images);
    expect(addedProduct.price).toEqual(testProduct.price);
    expect(addedProduct.color).toEqual(testProduct.color);
    expect(addedProduct.meta).toEqual(testProduct.meta);

    const returnProduct = await productsRepository.getById(addedProduct.id);

    expect(returnProduct).toEqual(addedProduct);
  });
  test("Product should be deleted and returned", async () => {
    const willDeletedProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: { form: "China" },
      },
    });
    const stayProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: { form: "China" },
      },
    });
    const [willBeDeletedProduct, stayAddedProduct] = await Promise.all([
      productsRepository.add(willDeletedProduct),
      productsRepository.add(stayProduct),
    ]);
    expect(willBeDeletedProduct).toBeDefined();
    expect(stayAddedProduct).toBeDefined();
    const deletedProduct = await productsRepository.delete(
      willBeDeletedProduct
    );
    expect(deletedProduct).toEqual(deletedProduct);
    const shouldBeUndefinedProduct = await productsRepository.delete(
      willBeDeletedProduct
    );
    expect(shouldBeUndefinedProduct).toBeNull();
    const shouldBeDefinedProduct = await productsRepository.getById(
      stayAddedProduct.id
    );

    expect(shouldBeDefinedProduct).toBeDefined();
  });

  test("Product should be updated and returned", async () => {
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: { form: "China" },
      },
    });
    const addedProduct = await productsRepository.add(testProduct);
    expect(addedProduct).toBeDefined();
    const clonedProduct = cloneDeep({
      ...addedProduct,
      name: chance.name(),
      price: chance.natural(),
    });
    const updatedProduct = await productsRepository.update(clonedProduct);
    expect(updatedProduct).toEqual(clonedProduct);
  });
});
