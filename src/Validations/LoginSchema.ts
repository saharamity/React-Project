import joi from "joi";

export const LoginSchema = joi.object({
    email: joi.string().email({tlds: {allow: false}}),
    password: joi.string()
    .ruleset.pattern(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    .rule({
        message: "password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"
    }).required(),
});
