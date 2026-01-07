import { ZodObject, ZodError } from 'zod';
export const validate = (schema) => async (req, res, next) => {
    try {
        // .parse() validates AND strips out extra fields not defined in schema
        const validatedData = await schema.parseAsync(req.body);
        req.body = validatedData; // Replace body with clean, validated data
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: 'Validation Failed',
                details: error.issues.map(e => ({ path: e.path[0], message: e.message }))
            });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//# sourceMappingURL=validate.middleware.js.map