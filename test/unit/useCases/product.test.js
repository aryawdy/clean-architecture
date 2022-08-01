const {
  product: {},
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
      lastName: chance.last(),
      gender: genders.NOT_SPECIFIED,
      meta: {},
    })),
    update: jest.fn(async (product) => product),
    delete: jest.fn(async (product) => product),
  };

  const dependencies = {
    productsRepository: mockProductRepo,
  };

  describe("Add user use cases", () => {
    test("User should be added", async () => {
      const testProductData = {
        name: chance.name(),
        description: chance.last(),
        images: genders.MALE,
        price: chance.sentence(),
        color: chance.color(),
        meta: {},
      };

      const addedProduct = await addProductUseCase(dependencies).execute(
        testProductData
      );
      expect(addedProduct).toBeDefined();
      expect(addedProduct.id).toBeDefined();
      expect(addedProduct.name).toBe(testProductData.name);
      expect(addedProduct.lastName).toBe(testProductData.lastName);
      expect(addedProduct.gender).toBe(testProductData.gender);
      expect(addedProduct.meta).toBe(testProductData.meta);

      const call = mockUserRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.name).toBe(testUserData.name);
      expect(call.lastName).toBe(testUserData.lastName);
      expect(call.gender).toBe(testUserData.gender);
      expect(call.meta).toBe(testUserData.meta);
    });
  });

  describe("get user use cases", () => {
    test("get user by id", async () => {
      const fakeId = v4();
      const userById = await getUserById(dependencies).execute({
        id: fakeId,
      });
      expect(userById).toBeDefined();
      expect(userById.id).toBe(fakeId);
      expect(userById.name).toBeDefined();
      expect(userById.lastName).toBeDefined();
      expect(userById.gender).toBeDefined();
      expect(userById.meta).toBeDefined();
      const call = mockUserRepo.getById.mock.calls[0][0];
      expect(call).toBe(fakeId);
    });
  });

  describe("update user use cases", () => {
    test("User should be updated", async () => {
      const testData = {
        id: v4(),
        name: chance.name(),
        lastName: chance.last(),
        gender: genders.FEMALE,
        meta: {
          education: {
            school: "full",
          },
        },
      };
      const updatedUser = await updateUserUseCase(dependencies).execute({
        user: testData,
      });

      expect(updatedUser).toEqual(testData);

      const expectedUser = mockUserRepo.update.mock.calls[0][0];
      expect(expectedUser).toEqual(testData);
    });
  });

  describe("delete user use cases", () => {
    test("User should be deleted", async () => {
      const testData = {
        id: v4(),
        name: chance.name(),
        lastName: chance.last(),
        gender: genders.FEMALE,
        meta: {
          education: {
            school: "full",
          },
        },
      };
      const deletedUser = await deleteUserUseCase(dependencies).execute({
        user: testData,
      });

      expect(deletedUser).toEqual(testData);

      const expectedUser = mockUserRepo.delete.mock.calls[0][0];
      expect(expectedUser).toEqual(testData);
    });
  });
});
