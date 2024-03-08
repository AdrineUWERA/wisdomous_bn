import { asyncWrapper } from "../helpers";
import { generateToken, hashPassword, comparePassword } from "../utils";
import { userServices } from "../services";

const signup = asyncWrapper(async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  const details = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
  };
  const user = await userServices.createUser(details);
  const body = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };
  const token = generateToken(body);
  return res
    .status(201)
    .json({ code: 201, message: "User created", token, user });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await userServices.getUserByEmail(email);
  if (userExists) {
    if (await comparePassword(password, userExists.password)) {
      const body = {
        id: userExists.id,
        email: userExists.email,
        fullName: userExists.fullName,
      };

      const token = generateToken(body);
      return res
        .status(200)
        .json({ code: 200, message: "Logged in successfully", token });
    } else {
      return res
        .status(401)
        .json({ code: 401, message: "Password is incorrect" });
    }
  } else {
    return res.status(404).json({ code: 404, message: "User not found" });
  }
});

const loginWithGoogle = async (req, res, next) => {
  let user;
  try {
    user = await userServices.getUserByEmail(req.user.email);
    if (!user) {
      const data = {
        fullName: req.user.displayName,
        email: req.user.email,
        password: "null",
      };
      user = await userServices.createUser(data);
    }
    const body = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = generateToken(body);
    req.user = user;
    return res
      .status(200)
      .header("authenticate", token)
      .json({
        code: 200,
        message: `Logged In Successfully as ${user.fullName} .`,
        token,
      });
  } catch (error) {
    return next(error);
  }
};

export { signup, login, loginWithGoogle };
