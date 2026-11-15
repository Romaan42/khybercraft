import checkLoginUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import User from "@/models/userModel";

export const PUT = async (request) => {
  try {
    await connectDb();
    const { name, phone, streetAddress, city, zipCode } = await request.json();
    const user = await checkLoginUser();
    if (!user) {
      return Response.json(
        { success: false, message: "user not logged in" },
        { status: 401 },
      );
    }

    await User.findByIdAndUpdate(user._id, {
      name,
      phone,
      streetAddress,
      city,
      zipCode,
    });

    return Response.json({ success: true, message: "user detail updated!" });
  } catch (error) {
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
};
