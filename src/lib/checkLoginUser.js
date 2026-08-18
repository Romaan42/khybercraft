import { cookies } from "next/headers";
import connectDb from "./db";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

const checkLoginUser = async () => {
  try {
    await connectDb();
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return null;
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return null;
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error checking login user:", error);
    return null;
  }
};

export default checkLoginUser;
