const { z } = require("zod");

const loginSchema = z.object({
    email: z.
        string({ required_error: "Email is required" }).
        trim().email().
        nonempty().
        min(3, { message: "Email must be in 3 char" }).
        max(255, { message: "Email not exceed to 255 char" }),
    password: z.
        string({ required_error: "Password is required" }).
        nonempty().
        trim().
        min(5, { message: "Password must be in 5 char" }).
        max(20, { message: "Password not exceed 20 char" })
});

const signupSchema = loginSchema.extend({
    name: z.
        string({ required_error: "Name is required" }).
        nonempty().
        trim().
        min(2, { message: "Name must be 2 char" }).
        max(15, { message: "Name must be 15 char" }),


});

module.exports = { loginSchema, signupSchema }


