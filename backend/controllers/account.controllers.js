import User from '../models/user.model.js';
import Account from '../models/account.model.js';

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
