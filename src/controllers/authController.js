import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongodb";
import db from "../database/database.connection.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).send("Usuário Não cadastrado");

    const userSession = await db
      .collection("sessions")
      .findOne({ userId: user._id });
    if (userSession !== null)
      return res.status(409).send("Usuário já está logado");

    if (bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({ userId: user._id, token });
      res.status(200).send(token);
    } else {
      res.status(401).send("Senha Incorreta");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userMail = await db.collection("users").findOne({ email });
    if (userMail) return res.status(409).send("E-mail já cadastrado");

    const hash = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({ name, email, password: hash });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const signOut = async (req, res) => {
  const userId = res.locals.userId;

  try {
    await db.collection("sessions").deleteOne({
      userId,
    });

    res.status(200).send("Usuário deslogado com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editUser = async (req, res) => {};

export { signIn, signUp, signOut, editUser };
