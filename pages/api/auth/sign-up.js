import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import { hashPassword } from "@/utils/auth";

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

    if (!email || !password)
      return res
        .status(422)
        .json({ status: "failed", message: "Please enter all fields!" });

    const isExisted = await User.findOne({ email: email });

    if (isExisted)
      return res
        .status(422)
        .json({ status: "failed", message: "User already exists!" });

    const hashedPassword = await hashPassword(password);

    await User.create({ email: email, password: hashedPassword });

    res
      .status(201)
      .json({ status: "success", message: "User created successfully!" });
  }
}
