import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(`Error in getUser: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { firstName, lastName, currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if ((!newPassword && currentPassword) || (newPassword && !currentPassword)) {
      return res.status(400).json({ error: "Please provide both current password and new password" });
    }

    if (currentPassword && newPassword) {
      const isMatch = await argon2.verify(user.password, currentPassword);
      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect current password" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: "New password must be at least 6 characters long" });
      }

      const hashedPassword = await argon2.hash(newPassword);
      user.password = hashedPassword;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    await user.save();

    user.password = null;

    return res.status(200).json(user);
  } catch (err) {
    console.log(`Error in updateUser: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const filter = req.query.filter || "";
    
    const users = await User.find({
      _id: { $ne: userId },
      $or: [{
        firstName: { $regex: filter }
      }, {
        lastName: { $regex: filter }
      }]
    }).select("-password");

    return res.status(200).json(users);
  } catch (err) {
    console.log(`Error in getUsers: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
