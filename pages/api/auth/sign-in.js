import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import { verifyPassword } from "@/utils/auth";

import { sign } from "jsonwebtoken";

import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "failed", message: "Error in connecting to DB!" });
    }

    const { email, password } = req.body;

    const secretKey = process.env.SECRET_KEY;
    const expiration = 24 * 60 * 60;

    if (!email || !password)
      return res
        .status(422)
        .json({ status: "failed", message: "Please enter all fields!" });

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(422)
        .json({ status: "failed", message: "User doesn't exist!" });

    const isValid = await verifyPassword(password, user.password);

    if (!isValid)
      return res.status(422).json({
        status: "failed",
        message: "Username or Password is incorrect!",
      });

    const token = sign(
      { email, firstName: user.firstName, lastName: user.lastName },
      secretKey,
      { expiresIn: expiration }
    );
    const serialized = serialize("token", token, {
      httpOnly: true,
      maxAge: expiration,
      path: "/",
    });
    res
      .status(200)
      .setHeader("Set-Cookie", serialized)
      .json({ status: "success", message: "Logged In Successfully!" });
  }
}
