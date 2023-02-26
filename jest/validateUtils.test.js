const validateUtils = require("./../utils/validation");

describe("validateEdit", () => {
  test("should throw an error when no changes are made", () => {
    const data = { name: "", email: null, phone: undefined };
    expect(() => {
      validateUtils.validateEdit(data);
    }).toThrow("At least one field must be changed");
  });

  test("should not throw an error when at least one change is made", () => {
    const data = { name: "", email: null, phone: "555-1234" };
    expect(() => {
      validateUtils.validateEdit(data);
    }).not.toThrow("At least one field must be changed");
  });
});
