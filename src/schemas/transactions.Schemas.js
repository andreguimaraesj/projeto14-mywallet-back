import Joi from "joi";

const transactionSchema = Joi.object({
  description: Joi.string().required(),
  amount: Joi.number().precision(2).greater(0).required(),
  type: Joi.any().valid("entrada", "saida").required(),
});

export { transactionSchema };
