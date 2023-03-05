const { validationResult, body } = require("express-validator");
const response = require("../responses");
const multer = require("multer");
const { storage, uploadFilter } = require("../sevices/storageService");
const fs = require("fs");
const {
  getInstanceByText
} = require("../sevices/modelService");

const errorResponse = (req, res, next) => {
  const msg = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => msg.push(error.msg));
    if (fs.existsSync(`uploads/${req?.file?.filename}`)) {
      fs.unlinkSync(`uploads/${req?.file?.filename}`);
    }
    const errormsg = response.failedWithMessage(msg, req, res);
    return res.send(errormsg);
  }
  return next();
};

const nameValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for the name")
    .escape()
    .notEmpty()
    .withMessage("Name can not be empty!")
    .bail(),
  errorResponse,
];
const usernameValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .matches(/^[a-zA-Z0-9._]+$/)
    .withMessage("Minimum 3 characters required for the username ")
    .escape()
    .notEmpty()
    .withMessage("User name can not be empty!")
    .bail(),
  errorResponse,
];
const titleValidation = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("Required characters for the title are between 3 and 255!")
    .escape()
    .notEmpty()
    .withMessage("title can not be empty!")
    .bail(),
  errorResponse,
];
const descriptionValidation = [
  body("description")
    .trim()
    .isLength({ min: 30 })
    .withMessage("Required characters for the description is minimum 30!")
    .escape()
    .notEmpty()
    .withMessage("description can not be empty!")
    .bail(),
  errorResponse,
];
const emailValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("errors.email")
    .notEmpty()
    .withMessage("errors.email")
    .bail(),
  errorResponse,
];
const passwordValidation = [
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .withMessage(
      "Password should be at least 6 charaters and contains capital, small ,numbers and spical charaters"
    )
    .notEmpty()
    .withMessage("Password can not be empty!"),
  errorResponse,
];
const phoneValidation = [
  body("phone")
    .isLength({ min: 6 })
    .optional({ nullable: true })
    .withMessage("Minimum 6 characters required for the phone!"),
  errorResponse,
];
const addressValidation = [
  body("address")
    .isLength({ max: 250 })
    .optional({ nullable: true })
    .withMessage("Maxmium 250 characters required for the address!"),
  errorResponse,
];

const imageValidation = (req, res, next, fileType) => {
  const upload = multer({
    storage: storage,
    fileFilter: uploadFilter(fileType),
    limits: { fileSize: 1_000_000 },
  }).any();
  upload(req, res, (err) => {
    if (err) {
      return response.failedWithMessage(err.message, req, res);
    }
    next();
  });
};

const usernameActiveValidation = async (req, res, next) => {
  const username = await getInstanceByText(
    "username",
    req.body.username,
    "User"
  );
  if (!username || username?.id == req.user.id) {
    next();
  } else
    return response.failedWithMessage("Username is used before !", req, res);
};

const emailActiveValidation = async (req, res, next) => {
  const email = await getInstanceByText("email", req.body.email, "User");
  if (!email || email?.id == req.user.id) {
    next();
  } else return response.failedWithMessage("Email is used before !", req, res);
};

const phoneActiveValidation = async (req, res, next) => {
  const phone = await getInstanceByText("phone", req.body.phone, "User");
  if (!phone || phone?.id == req.user.id) {
    next();
  } else return response.failedWithMessage("phone is used before !", req, res);
};

module.exports = {
  nameValidation,
  usernameValidation,
  titleValidation,
  descriptionValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  addressValidation,
  imageValidation,
  usernameActiveValidation,
  emailActiveValidation,
  phoneActiveValidation,
  errorResponse,
};
