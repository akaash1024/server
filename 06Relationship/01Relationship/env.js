
const { z } = require("zod");

const pathSchema = z.coerce.number(1111).min().max(9999).default(3000);

const PORT = pathSchema.parse(process.env.PORT);

module.exports = { PORT };