const databaseUtils = require("./../utils/database");

describe("getDefinedProperties", () => {
  test("should return a single defined property", () => {
    const data = { a: 10 };
    const propertyMap = { a: "Property A", b: "Property B" };
    const result = databaseUtils.getDefinedProperties(data, propertyMap);
    expect(result).toEqual([{ property: "a", value: 10 }]);
  });

  test("should return multiple defined properties", () => {
    const data = { a: 10, b: 20 };
    const propertyMap = { a: "Property A", b: "Property B", c: "Property C" };
    const result = databaseUtils.getDefinedProperties(data, propertyMap);
    expect(result).toEqual([
      { property: "a", value: 10 },
      { property: "b", value: 20 },
    ]);
  });

  test("should return no defined properties", () => {
    const data = { c: 30, d: 40 };
    const propertyMap = { a: "Property A", b: "Property B" };
    const result = databaseUtils.getDefinedProperties(data, propertyMap);
    expect(result).toEqual([]);
  });
});
