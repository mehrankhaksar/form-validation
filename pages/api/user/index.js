import { verifyToken } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { token } = req.cookies;
    const secretKey = process.env.SECRET_KEY;

    if (!token)
      return res
        .status(401)
        .json({ status: "failed", message: "You aren't logged in!" });

    const { email, firstName, lastName } = verifyToken(token, secretKey);

    if (email) {
      return res
        .status(200)
        .json({ status: "success", data: { email, firstName, lastName } });
    } else {
      return res
        .status(401)
        .json({ status: "failed", message: "You're unauthorized!" });
    }
  }
}
