import Joi from "joi";

export const schema = Joi.object({
  fullname: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "!fullname must be a string.",
      "string.min": "!fullname must be at least 3 characters.",
      "string.pattern.base": "!fullname can only contain alphabets and spaces.",
      "string.empty": "!fullname is required.",
      "any.required": "!fullname is required."
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "!Email must be a valid email address.",
      "string.empty": "!Email is required.",
      "any.required": "!Email is required."
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "!Password must be at least 6 characters.",
      "string.empty": "!Password is required.",
      "any.required": "!Password is required."
    }),

  cpassword: Joi.string()
    .valid(Joi.ref("password"))   // ✅ must match password
    .required()
    .messages({
      "any.only": "!Passwords does must match.", // custom error
      "string.empty": "!Confirm password is required.",
      "any.required": "!Confirm password is required."
    }),
});
