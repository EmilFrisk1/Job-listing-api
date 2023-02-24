const Joi = require("@hapi/joi");

const dateValidator = Joi.extend((joi) => ({
  type: "dateString",
  base: joi.string(),
  messages: {
    "dateString.format": '{{#label}} must be a string of format "yyyy-mm-dd"',
  },
  validate(value, helpers) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
    return { value, errors: helpers.error("dateString.format") };
  },
}));

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  username: Joi.string().min(2).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const createJobListingSchema = Joi.object({
  title: Joi.string().min(4).required(),
  description: Joi.string().min(10).required(),
  experience_level: Joi.string().min(3).required(),
  location: Joi.string().min(2).required(),
  salary: Joi.number().required(),
  jwt: Joi.string().allow(""),
});

const getJobListingschema = Joi.object({
  page: Joi.number().required(),
});

const deleteJobListingSchema = Joi.object({
  jwt: Joi.string().required(),
  job_listing_id: Joi.number().required(),
});

const jobListingEditSchema = Joi.object().keys({
  title: Joi.string().allow(""),
  description: Joi.string().allow(""),
  expirience_level: Joi.string().allow(""),
  location: Joi.string().allow(""),
  salary: Joi.number().allow(null),
  jwt: Joi.string().allow(""),
  job_listing_id: Joi.number().required(),
});

const editUserSchema = Joi.object().keys({
  user_name: Joi.string().min(2).allow(""),
  email: Joi.string().email().allow(""),
  password: Joi.string().min(8).allow(""),
  jwt: Joi.string().allow(""),
});

const createPostSchema = Joi.object().keys({
  description: Joi.string().min(10),
  title: Joi.string().min(4),
  category: Joi.string().min(2),
  jwt: Joi.string().allow(""),
});

const editPostSchema = Joi.object().keys({
  creator: Joi.number().required(),
  post_id: Joi.number().required(),
  description: Joi.string().min(10).allow(""),
  title: Joi.string().min(4).allow(""),
  category: Joi.string().min(2).allow(""),
  jwt: Joi.string().allow(""),
});

const deletePostSchema = Joi.object().keys({
  post_id: Joi.number().required(),
  jwt: Joi.string().allow(""),
});

const validateSetAdmin = Joi.object().keys({
  user_id: Joi.number().required(),
  jwt: Joi.string().allow(""),
});

const validateDeleteEmployee = Joi.object().keys({
  user_id: Joi.number().required(),
  jwt: Joi.string().allow(""),
});

const validateCreateEmployee = Joi.object().keys({
  user_id: Joi.number().required(),
  employment_type: Joi.string().required(),
  position: Joi.string().required(),
  salary: Joi.number().required(),
  jwt: Joi.string().allow(""),
  hire_date: dateValidator.dateString().allow(),
});

const validateEditEmployeeSchema = Joi.object().keys({
  user_id: Joi.number().required(),
  employment_type: Joi.string().allow(),
  position: Joi.string().allow(),
  salary: Joi.number().allow(),
  jwt: Joi.string().allow(""),
});

schemas = {
  signUpSchema,
  signInSchema,
  getJobListingschema,
  deleteJobListingSchema,
  jobListingEditSchema,
  createJobListingSchema,
  editUserSchema,
  createPostSchema,
  editPostSchema,
  deletePostSchema,
  validateSetAdmin,
  validateDeleteEmployee,
  validateCreateEmployee,
  validateEditEmployeeSchema,
};

module.exports = { schemas };
