const validationUtils = require("./../middleware/validation");
const { validateEdit } = require("./../utils/validation");

jest.mock("./../utils/validation", () => ({
  validateEdit: jest.fn(),
}));

describe("validateSignup", () => {
  test("should call next() when input is valid", () => {
    const req = {
      body: {
        email: "test@test.com",
        password: "12345678",
        username: "testuser",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignup(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test("should return error message when email is invalid", () => {
    const req = {
      body: {
        email: "invalid email",
        password: "12345678",
        username: "testuser",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignup(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"email\" must be a valid email`,
    });
  });

  test("should return error message when password is invalid", () => {
    const req = {
      body: {
        email: "test@test.com",
        password: "123456",
        username: "testuser",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignup(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"password\" length must be at least 8 characters long`,
    });
  });

  test("should return error message when username is invalid", () => {
    const req = {
      body: {
        email: "test@test.com",
        password: "12345678",
        username: "a",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignup(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"username\" length must be at least 2 characters long`,
    });
  });

  test("should return error message when username is missing", () => {
    const req = {
      body: {
        email: "test@test.com",
        password: "12345678",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignup(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"username\" is required`,
    });
  });

  test("should return error message when password is missing", () => {
    const req = {
      body: {
        email: "test@test.com",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignup(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"password\" is required`,
    });
  });
  test("should return error message when email is missing", () => {
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignup(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"email\" is required`,
    });
  });
});
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

describe("validateSignIn", () => {
  test("should call next() when input is valid", () => {
    const req = {
      body: {
        email: "test@test.com",
        password: "12345678",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignIn(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test("should return error message when email is invalid", () => {
    const req = {
      body: {
        email: "invalid email",
        password: "12345678",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "The email provided is invalid",
    });
  });

  test("should return error message when password is invalid", () => {
    const req = {
      body: {
        email: "test@test.com",
        password: "123456",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "The email or password is incorrect",
    });
  });

  test("should return error message when email is missing", () => {
    const req = {
      body: {
        password: "12345678",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "email is required",
    });
  });

  test("should return error message when password is missing", () => {
    const req = {
      body: {
        email: "test@test.com",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "password is required",
    });
  });

  test("should return error message when email and password are missing", () => {
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateSignIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "email is required",
    });
  });
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

describe.only("validateCreateJobListing", () => {
  test("should call next() when input is valid", () => {
    const req = {
      body: {
        title: "Test Title",
        description: "Test Description",
        experience_level: "Test Experience",
        location: "Test Location",
        salary: 1000,
        jwt: "Test JWT",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateCreateJobListing(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test("should return error message when title is invalid", () => {
    const req = {
      body: {
        title: "",
        description: "Test Description",
        experience_level: "Test Experience",
        location: "Test Location",
        salary: 1000,
        jwt: "Test JWT",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateCreateJobListing(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"title\" is not allowed to be empty`,
    });
  });

  test("should return error message when description is invalid", () => {
    const req = {
      body: {
        title: "Test Title",
        description: "",
        experience_level: "Test Experience",
        location: "Test Location",
        salary: 1000,
        jwt: "Test JWT",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateCreateJobListing(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"description\" is not allowed to be empty`,
    });
  });

  test("should return error message when experience_level is invalid", () => {
    const req = {
      body: {
        title: "Test Title",
        description: "Test Description",
        experience_level: "",
        location: "Test Location",
        salary: 1000,
        jwt: "Test JWT",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateCreateJobListing(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"experience_level\" is not allowed to be empty`,
    });
  });

  test("should return error message when location is invalid", () => {
    const req = {
      body: {
        title: "Test Title",
        description: "Test Description",
        experience_level: "Test Experience",
        location: "",
        salary: 1000,
        jwt: "Test JWT",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateCreateJobListing(req, res, next);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"location\" is not allowed to be empty`,
    });
  });
  /////////////////////////////////////////
  test("should return error message when location is invalid", () => {
    const req = {
      body: {
        title: "Test Title",
        description: "Test Description",
        experience_level: "Test Experience",
        location: "",
        salary: 1000,
        jwt: "Test JWT",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateCreateJobListing(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"location\" is not allowed to be empty`,
    });
  });

  test("should return error message when salary is invalid", () => {
    const req = {
      body: {
        title: "Test Title",
        description: "Test Description",
        experience_level: "Test Experience",
        location: "Test Location",
        salary: "salary",
        jwt: "Test JWT",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    validationUtils.validateCreateJobListing(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `\"salary\" must be a number`,
    });
  });

  test("should call validateEdit and next() when input is valid", () => {
    const req = {
      body: {
        title: "Test Title",
        description: "Test Description",
        experience_level: "Test Experience",
        location: "Test Location",
        salary: 1000,
        jwt: "Test JWT",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    validationUtils.validateCreateJobListing(req, res, next);

    expect(validateEdit).toHaveBeenCalledWith({
      title: "Test Title",
      description: "Test Description",
      experience_level: "Test Experience",
      location: "Test Location",
      salary: 1000,
    });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

describe.only("validateEditJobListing", () => {});
