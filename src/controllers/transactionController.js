import { stripHtml } from "string-strip-html";
import db from "../database/database.connection.js";
import { ObjectId } from "mongodb";

const listTransactions = async (req, res) => {
  const userId = res.locals.userId;
  try {
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) return res.status(404).send("Usuário não encontrado");
    const transactions = await db
      .collection("transactions")
      .find({
        userId,
      })
      .sort({ $natural: -1 })
      .toArray();
    res.send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addTransaction = async (req, res) => {
  const userId = res.locals.userId;
  const { description, amount, type } = req.body;
  try {
    await db.collection("transactions").insertOne({
      userId,
      description,
      amount,
      type,
      date: Date.now(),
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.userId;
  try {
    const transaction = await db.collection("transactions").findOne({
      _id: new ObjectId(id),
    });
    if (!transaction) return res.status(404).send("Transação não encontrada");

    if (!userId.equals(transaction.userId))
      return res.status(404).send("Você não pode deletar essa transação");

    await db.collection("transactions").deleteOne(transaction);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.userId;
  const { description, amount, type } = req.body;

  try {
    const transaction = await db.collection("transactions").findOne({
      _id: new ObjectId(id),
    });
    if (!transaction) return res.status(404).send("Transação não encontrada");

    if (!userId.equals(transaction.userId))
      return res.status(404).send("Você não pode alterar essa transação");

    await db.collection("transactions").updateOne(transaction, {
      $set: {
        description,
        amount,
        type,
      },
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { listTransactions, addTransaction, deleteTransaction, editTransaction };
