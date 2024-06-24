import { body, validationResult } from "express-validator";

const userValidationRules = (login) => {
  if (login) {
    return [
      body("email").custom((value) => {
        if (!value.includes("@")) {
          throw new Error("Invalid email");
        }
        return true;
      }),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    ];
  }
  return [
    body("firstName").isLength({ min: 1 }).withMessage("Firstname required"),
    body("lastName").isLength({ min: 1 }).withMessage("Lastname required"),
    body("email").custom((value) => {
      if (!value.includes("@")) {
        throw new Error("Invalid email");
      }
      return true;
    }),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ];
};

const isDateGreaterThanCurrent = (value) => {
  const inputDate = new Date(value);
  const currentDate = new Date();
  return inputDate >= currentDate;
};

const roomValidationRules = () => {
  return [
    body("userId").notEmpty().withMessage("User required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("rooms").isArray().withMessage("Room must be an array"),
    body("rooms.*")
      .isObject()
      .withMessage("Each item in room must be an object")
      .bail() // Stop validation chain if the above condition fails
      .custom((value, { req }) => {
        if (!value.hasOwnProperty("type") || !value.hasOwnProperty("price")) {
          throw new Error("Each room item must have type and price properties");
        }
        return true;
      }),
    body("rooms.*.type").notEmpty().withMessage("Type is required"),
    body("rooms.*.price")
      .notEmpty()
      .isNumeric()
      .withMessage("Price is required and must be number"),
    body("availableDate")
      .notEmpty()
      .isDate()
      .withMessage("Date is required")
      .custom(isDateGreaterThanCurrent)
      .withMessage("Date cannot be less than the current date"),
    body("amenities").isArray().withMessage("Must be array"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export { userValidationRules, validate, roomValidationRules };
