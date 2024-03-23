import Joi from "joi";
import errorMessage from "../errormessage";

const userIdSchema = Joi.object().keys({
  userid: Joi.string().uuid().messages(errorMessage("User Id")),
});

const sessionIdSchema = Joi.object().keys({
  id: Joi.string().uuid().messages(errorMessage("Session Id")),
});

const emailParamSchema = Joi.object().keys({
  email: Joi.string().email().required().messages(errorMessage("Email")),
});

export default {
  userIdSchema,
  emailParamSchema,
  sessionIdSchema,
};
