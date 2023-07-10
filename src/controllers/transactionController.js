import db from "../database/database.connection.js";

const listTransactions = async (req, res) => {
  const userId = res.locals.userId;

  try {
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

const addTransaction = async (req, res) => {};

const deleteTransaction = async (req, res) => {};

const editTransaction = async (req, res) => {};

export { listTransactions, addTransaction, deleteTransaction, editTransaction };
