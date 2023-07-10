import { Router } from "express";
import {
  listTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "../controllers/transactionController.js";
import validateSchema from "../middlewares/validateSchema.js";

const transactionRouter = Router();

transactionRouter.get("/transactions", listTransactions);
transactionRouter.post("/transaction/:type", validateSchema(), addTransaction);
transactionRouter.delete(
  "/transaction/:id",
  validateSchema(),
  deleteTransaction
);
transactionRouter.put(
  "/transaction-edit/:type",
  validateSchema(),
  editTransaction
);

export default transactionRouter;
