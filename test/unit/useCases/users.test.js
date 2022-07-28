const {
  user: { addUserUseCase },
} = require("../../../src/useCases");

const Chance = require("chance");
const chance = new Chance();
const {
  User,
  constants: {
    userConstraint: { genders },
  },
} = require("../../../src/entities");

const { v4 } = require("uuid");

describe("User use cases", () => {
  const mockUserRepo = {
    add: jest.fn(async (user) => ({ ...user, id: v4() })),
  };

  const dependencies = {
    usersRepository: mockUserRepo,
  };
  describe("Add user use cases", () => {
    test("User should be added", async () => {
      const testUserData = {
        name: chance.name(),
        lastName: chance.last(),
        gender: genders.MALE,
        meta: {
          hair: {
            color: "red",
          },
        },
      };

      const addedUser = await addUserUseCase(dependencies).execute(
        testUserData
      );
      expect(addedUser).toBeDefined();
      expect(addedUser.id).toBeDefined();
      expect(addedUser.name).toBe(testUserData.name);
      expect(addedUser.lastName).toBe(testUserData.lastName);
      expect(addedUser.gender).toBe(testUserData.gender);
      expect(addedUser.meta).toBe(testUserData.meta);

      const call = mockUserRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.name).toBe(testUserData.name);
      expect(call.lastName).toBe(testUserData.lastName);
      expect(call.gender).toBe(testUserData.gender);
      expect(call.meta).toBe(testUserData.meta);
    });
  });
});
