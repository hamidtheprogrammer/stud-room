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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export { userValidationRules, validate };
