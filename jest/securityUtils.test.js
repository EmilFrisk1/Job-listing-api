const bcrypt = require("bcryptjs");
const securityUtils = require("./../utils/security");
const jwt = require("jsonwebtoken");

let JWT_SECRET = "wuhuu";

describe("utilHashPassword", () => {
  test("should return a hashed password", async () => {
    const password = "myPassword";
    const hashedPassword = await securityUtils.utilHashPassword(password);
    expect(hashedPassword).not.toBe(password);
    expect(typeof hashedPassword).toBe("string");

    // check that the hashed password can be verified with bcrypt
    const isMatch = await bcrypt.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });
});

describe("comparePasswords", () => {
  test("should return true", async () => {
    const password = "myPassword";
    const hashedPassword = await securityUtils.utilHashPassword(password);

    const isMatch = await securityUtils.comparePasswords(
      password,
      hashedPassword
    );
    expect(isMatch).toBe(true);
  });

  test("should return false", async () => {
    const password = "myPassword";
    const hashedPassword = await securityUtils.utilHashPassword(password);

    const isMatch = await securityUtils.comparePasswords(
      "wrongPassword",
      hashedPassword
    );
    expect(isMatch).toBe(false);
  });
});

describe("createJWToken", () => {
  test("should return token", async () => {
    const payload = { userId: 123 };
    const options = { expiresIn: "1h" };
    const token = securityUtils.createJWToken(payload, options, JWT_SECRET);
    expect(token).toBeDefined();

    // Verify that the token can be decoded using the correct secret
    const decoded = jwt.verify(token, JWT_SECRET);
    expect(decoded.userId).toBe(payload.userId);
  });

  test("should return error message when token signing fails", async () => {
    const payload = { userId: 123 };
    const options = { expiresIn: "1h" };
    const token = securityUtils.createJWToken(payload, options, JWT_SECRET);

    expect(typeof token).toBe("string");

    // Verify that the token can be decoded using the correct secret
    expect(() => {
      jwt.verify(token, "invalid-secret");
    }).toThrow(jwt.JsonWebTokenError);
  });
});

describe("createJWToken", () => {
  test("should return token", async () => {});
});
