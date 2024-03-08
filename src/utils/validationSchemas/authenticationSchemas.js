import Joi from "joi";
import errorMessage from "../errormessage";

const fullNameSchema = Joi.string()
  .min(2)
  .required()
  .messages(errorMessage("Full Name"));

const emailSchema = Joi.string()
  .email()
  .required()
  .messages(errorMessage("Email"));

const passwordSchema = Joi.string()
  .required()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
  )
  .messages(errorMessage("Password"));

const LoginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

const SignUpSchema = Joi.object().keys({
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export { 
  LoginSchema,
  SignUpSchema,
  emailSchema,
};
