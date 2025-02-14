const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters." })
    .max(255, { message: "Email must not exceed 255 characters." }),

  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "Password must be at least 7 characters." })
    .max(1024, { message: "Password must not exceed 1024 characters." }),
});

const registerSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(255, { message: "Username must not exceed 255 characters." }),

  phone: z
    .string({ required_error: "Phone Number is required" })
    .trim()
    .min(10, { message: "Phone Number must be at least 10 characters." })
    .max(20, { message: "Phone Number must not exceed 20 characters." }),
});

module.exports = { registerSchema, loginSchema };
