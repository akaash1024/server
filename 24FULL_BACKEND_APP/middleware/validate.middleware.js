

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody;
        next()

    } catch (err) {
        const status = 422;
        const message = "Fill input properly"
        const extraDetails = `${err.errors[0].message} || ${err.errors[0].path[0]} `;

        const error = {
            status, message, extraDetails
        }

        next(error)
    }
}

module.exports = validate;