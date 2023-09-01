import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import { verifyToken, verifyPassword } from "@/utils/auth";

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

    const { firstName, lastName, password } = req.body;
    const { token } = req.cookies;
    const secretKey = process.env.SECRET_KEY;

    if (!(firstName || lastName) && !password)
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });

    if (!token)
      return res
        .status(401)
        .json({ status: "failed", message: "You aren't logged in!" });

    const { email } = verifyToken(token, secretKey);

    if (!email)
      return res
        .status(401)
        .json({ status: "failed", message: "You are unauthorized!" });

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(404)
        .json({ status: "failed", message: "User doesn't exist!" });

    const isValid = await verifyPassword(password, user.password);

    if (!isValid)
      return res
        .status(422)
        .json({ status: "failed", message: "Password is incorrect!" });

    user.firstName = firstName;
    user.lastName = lastName;
    user.save();

    return res
      .status(200)
      .json({ status: "success", data: { email, firstName, lastName } });
  }
}
