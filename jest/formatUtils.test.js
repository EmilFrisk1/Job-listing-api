const formatUtils = require("./../utils/format");

describe("formatDate", () => {
  test("Should return a string in yyyy-mm-dd format", () => {
    const result = formatUtils.formatDate();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    expect(dateRegex.test(result)).toBe(true);
  });
});
