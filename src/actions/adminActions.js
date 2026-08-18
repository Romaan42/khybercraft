"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const adminLogin = async (_, data) => {
  try {
    const email = data.get("email");
    const password = data.get("password");
    const cookiesStore = await cookies();
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return { success: false, message: "admin or password incorrect" };
    }
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
    cookiesStore.set("adminToken", token, {
      maxAge: "1d",
    });

    return { success: true, message: "Welcome ibrahim" };
  } catch (error) {
    return { success: false, message: "admin login failed" };
  }
};

export const adminLogout = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("adminToken");
  return { success: true, message: "logout successful" };
};
