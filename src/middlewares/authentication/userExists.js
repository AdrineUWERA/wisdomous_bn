import { userServices } from '../../services';

const userEmailExists = async (req, res, next) => {
  const user = await userServices.getUserByEmail(req.body.email);
  if (!user) {
    return next();
  }
  return res.status(409).json({ code: 409, message: 'Email Exists.' });
};

export { userEmailExists };
