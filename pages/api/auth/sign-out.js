import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const serialized = serialize("token", "", { maxAge: 0, path: "/" });

    return res
      .status(200)
      .setHeader("Set-Cookie", serialized)
      .json({ status: "success", message: "Logged Out Successfully!" });
  }
}
