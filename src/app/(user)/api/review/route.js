import checkLoginUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Review from "@/models/reviewsModel";

export const POST = async (request) => {
  try {
    await connectDb();
    const { id, message, rating } = await request.json();
    const user = await checkLoginUser();
    if (!user) {
      return Response.json(
        { success: false, message: "user not logged in!" },
        { status: 404 },
      );
    }
    const review = await Review.create({
      userId: user._id,
      productId: id,
      message,
      stars: rating,
    });
    return Response.json({
      success: true,
      message: "review publish successfullt",
      review,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
};
