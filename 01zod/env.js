const { z } = require("zod");

const portSchema = z.coerce.number().min(1000).max(9999).default(3000);
const PORT = portSchema.parse(process.env.PORT);

module.exports = { PORT };

// ! ####################

// const ageSchema = z.number().min(18).max(28).int();
// const userAge = 17;
// const userAge2 = 19;

// // console.log(ageSchema.parse(userAge2));

// // console.log(ageSchema.safeParse(userAge));
// // console.log(ageSchema.safeParse(userAge2));

//  const { data, error, success } = ageSchema.safeParse(userAge);
//  console.log(data);
//  console.log(error.errors[0].message);
 

