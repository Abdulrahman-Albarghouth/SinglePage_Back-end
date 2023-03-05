const responses = require("../../responses");
const authService = require("../helper");
const { getInstanceById } = require("../modelService");

const isAuth = (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    if (!token) return responses.unauthorized(req, res);
    const decode = authService.decodeToken(token);
    if (!decode) return responses.unauthorized(req, res);
    req.user = {
      ...decode,
      token,
    };
    return next();
  } catch (err) {
    console.log("ERROR meddleware fun -->", err);
    return responses.unauthorized(req, res);
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user?.type == "Admin") {
    const admin = await getInstanceById(req.user.id, "Admin");
    if (admin && admin.username == "admin") {
      return next();
    }
  }
  return responses.failedWithMessage(
    "You must be an admin to access",
    req,
    res
  );
};
const isUser = async (req, res, next) => {
  const user = await getInstanceById(req.user.id, "User");
  if (user) {
    return next();
  }
  return responses.forbidden(req, res);
};
module.exports = {
  isAuth,
  isAdmin,
  isUser,
};
