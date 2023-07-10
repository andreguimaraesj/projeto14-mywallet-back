import Joi from "joi";

const transactionSchema = Joi.object({
  description: Joi.string().required(),
  amount: Joi.number().integer().greater(0),
  type: Joi.any().valid("entrada", "saida").required(),
});

export { transactionSchema };
