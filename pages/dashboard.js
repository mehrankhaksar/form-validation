import React from "react";

import { verifyToken } from "@/utils/auth";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import DashboardPage from "@/components/templates/DashboardPage";

function dashboard({ user }) {
  return (
    <DashboardPage
      email={user.email}
      currentFirstName={user.firstName}
      currentLastName={user.lastName}
    />
  );
}

export default dashboard;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const { email } = verifyToken(token, secretKey);

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
  }

  const user = await User.findOne({ email: email });

  if (!email)
    return {
      redirect: { destination: "/", permanent: false },
    };

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
}
