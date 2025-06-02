import Joi from "joi";

export interface encryption {
    name: string;
}

export const encryptionSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .max(15)
        .required()
})