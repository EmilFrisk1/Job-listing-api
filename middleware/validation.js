const { formatDate } = require("../utils/format");
const { validateEdit } = require("../utils/validation");
const { schemas } = require("./../schemas");

function validateSignup(req, res, next) {
  const { email, password, username } = req.body;

  const { error } = schemas.signUpSchema.validate({
    email,
    password,
    username,
  });

  if (error) {
    console.log(error.details);
    res.status(400).json({ message: error.details[0].message });
    return;
  } else {
    next();
  }
}

function validateSignIn(req, res, next) {
  const { email, password } = req.body;

  const { error } = schemas.signInSchema.validate({ email, password });

  if (error) {
    switch (error.details[0].message) {
      case `"email" must be a valid email`:
        return res.status(400).send({
          error: "The email provided is invalid",
        });
      case `"password" length must be at least 8 characters long`:
        return res.status(400).send({
          error: "The email or password is incorrect",
        });
      case `"email" is required`:
        return res.status(400).send({
          error: "email is required",
        });
      case `"password" is required`:
        return res.status(400).send({
          error: "password is required",
        });
    }
    return;
  } else {
    next();
  }
}

function validateGetJoblistings(req, res, next) {
  const page = req.body.page;

  try {
    const { error } = schemas.getJobListingschema.validate({ page });

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      next();
    }
  } catch (error) {
    console.log("error: " + error);
  }
}

function validateDeleteJobListing(req, res, next) {
  try {
    const { jwt, job_listing_id } = req.body;
    const { error } = schemas.deleteJobListingSchema.validate({
      jwt,
      job_listing_id,
    });
    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      next();
    }
  } catch (error) {
    console.log("error: " + error);
  }
}

function validateEditJobListing(req, res, next) {
  try {
    const { error } = schemas.jobListingEditSchema.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      const { title, description, expirience_level, location, salary } =
        req.body;
      const data = { title, description, expirience_level, location, salary };

      validateEdit(data);
      req.body = next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

function validateCreateJobListing(req, res, next) {
  try {
    const { error } = schemas.createJobListingSchema.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      const { title, description, experience_level, location, salary } =
        req.body;
      const data = { title, description, experience_level, location, salary };

      validateEdit(data);
      req.body = next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

function validateEditUser(req, res, next) {
  try {
    const { error } = schemas.editUserSchema.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      const { user_name, password, email } = req.body;
      const data = { user_name, password, email };
      validateEdit(data);
      next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}
function validateCreatePost(req, res, next) {
  try {
    const { error } = schemas.createPostSchema.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

function validateEditPost(req, res, next) {
  try {
    const { error } = schemas.editPostSchema.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      const data = {
        description: req.body.description,
        title: req.body.title,
        category: req.body.category,
      };
      req.data = data;

      validateEdit(data);
      next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

function validateDeletePosts(req, res, next) {
  try {
    const { error } = schemas.deletePostSchema.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

function validateSetAdmin(req, res, next) {
  try {
    const { error } = schemas.validateSetAdmin.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

function validateDeleteEmployee(req, res, next) {
  try {
    const { error } = schemas.validateDeleteEmployee.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

function validateCreateEmployee(req, res, next) {
  try {
    const { error } = schemas.validateCreateEmployee.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      //
      if (
        req.body.hire_date == null ||
        req.body.hire_date == undefined ||
        req.body.hire_date == ""
      ) {
        req.body.hire_date = formatDate();
      }

      next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

function validateEditEmployee(req, res, next) {
  try {
    const { error } = schemas.validateEditEmployeeSchema.validate(req.body);

    if (error) {
      console.log(error.details);
      res.status(400).json({ message: error.details[0].message });
      return;
    } else {
      const data = {
        employment_type: req.body.employment_type,
        position: req.body.position,
        salary: req.body.salary,
      };
      validateEdit(data);
      next();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  validateSignup,
  validateSignIn,
  validateGetJoblistings,
  validateDeleteJobListing,
  validateEditJobListing,
  validateCreateJobListing,
  validateEditUser,
  validateCreatePost,
  validateEditPost,
  validateDeletePosts,
  validateSetAdmin,
  validateDeleteEmployee,
  validateCreateEmployee,
  validateEditEmployee,
};
