import User from "../models/user.model.js";
import argon2 from "argon2";
import { z } from 'zod';

const signupBody = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string().min(6),
});

export const signup = async (req, res) => {
  const { error } = signupBody.safeParse(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { username, firstName, lastName, password } = req.body;

  try {
    if (!username || !firstName || !lastName || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      });
    } else {
      res.status(400).json({ error: "Failed to create user" });
    }
  } catch (err) {
    console.log(`Error in signup: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};
