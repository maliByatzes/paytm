import User from "../models/user.model.js";
import { verifyToken } from "../utils/generateToken.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const userId = await verifyToken(token);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
