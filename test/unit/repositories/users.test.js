const Chance = require("chance");
const chance = new Chance();
const {
  usersRepository,
} = require("../../../src/frameworks/repositories/inMemory");

const { cloneDeep, add } = require("lodash");
const {
  User,
  constants: {
    userConstraint: { genders },
  },
} = require("../../../src/entities");

describe("Users repository", () => {
  test("New user should be added and returned", async () => {
    const testUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: {
        hair: { color: "black" },
      },
    });

    const addedUser = await usersRepository.add(testUser);

    expect(addedUser).toBeDefined();
    expect(addedUser.id).toBeDefined();
    expect(addedUser.name).toBe(testUser.name);
    expect(addedUser.lastName).toBe(testUser.lastName);
    expect(addedUser.gender).toBe(testUser.gender);
    expect(addedUser.meta).toEqual(testUser.meta);

    const returnUser = await usersRepository.getById(addedUser.id);
    expect(returnUser).toEqual(addedUser);
  });
  test("User should be deleted and returned", async () => {
    const willBeDeletedUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: {
        hair: { color: "black" },
      },
    });

    const stayUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: {
        hair: { color: "blonde" },
      },
    });

    const [willBeDeletedAddedUser, stayAddedUser] = await Promise.all([
      usersRepository.add(willBeDeletedUser),
      usersRepository.add(stayUser),
    ]);

    expect(willBeDeletedAddedUser).toBeDefined();
    expect(stayAddedUser).toBeDefined();

    const deletedUser = await usersRepository.delete(willBeDeletedAddedUser);

    expect(deletedUser).toEqual(deletedUser);
    const shouldBeUndefinedUser = await usersRepository.delete(
      willBeDeletedAddedUser
    );
    expect(shouldBeUndefinedUser).toBeNull();
    const shouldBeDefinedUser = await usersRepository.getById(stayAddedUser.id);
    expect(shouldBeDefinedUser).toBeDefined();
  });

  test("User should be updated and returned", async () => {
    const testUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: {
        hair: { color: "black" },
      },
    });

    const addedUser = await usersRepository.add(testUser);

    expect(addedUser).toBeDefined();

    const clonedUser = cloneDeep({
      ...addedUser,
      name: chance.name(),
      gender: genders.MALE,
    });

    const updatedUser = await usersRepository.update(clonedUser);
    expect(updatedUser).toEqual(clonedUser);
  });
});
