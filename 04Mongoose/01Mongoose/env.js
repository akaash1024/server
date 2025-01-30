const { z } = require("zod");

const portSchema = z.coerce.number().min(1111).max(9999).default(3000);
const PORT = portSchema.parse(process.env.PORT);

module.exports = { PORT };
