import User from '../models/user.model.js';
import Account from '../models/account.model.js';
import Transfer from '../models/transfer.model.js';
import mongoose from 'mongoose';

export const getBalance = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const account = await Account.findOne({ userId: user._id });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    return res.status(200).json({ balance: account.balance });
  } catch (err) {
    console.log(`Error in getBalance: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { id: receiverId } = req.params;
  const { amount } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const account = await Account.findOne({ userId: user._id });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const receiverAccount = await Account.findOne({ userId: receiverId });
    if (!receiverAccount) {
      return res.status(404).json({ error: "Receiver Account not found" });
    }

    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    account.balance -= amount;
    receiverAccount.balance += amount;

    const newTransfer = new Transfer({
      fromAccount: account._id,
      toAccount: receiverAccount._id,
      amount,
    });

    await account.save({ session });
    await receiverAccount.save({ session });
    await newTransfer.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Money transferred successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(`Error in transferMoney: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
