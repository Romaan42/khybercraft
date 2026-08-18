import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const checkAdminLogin = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("adminToken")?.value;
  if (!token) {
    return null;
  }

  const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
  if (!email || !password) {
    return null;
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return null;
  }

  return { email, password };
};

export default checkAdminLogin;
