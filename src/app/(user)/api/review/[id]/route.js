import connectDb from "@/lib/db";
import Review from "@/models/reviewsModel";

export const GET = async (_, { params }) => {
  try {
    await connectDb();
    const { id } = await params;
    if (!id) {
      return Response.json(
        { success: false, message: "id not found" },
        { status: 404 },
      );
    }
    const reviews = await Review.find({
      productId: id,
    }).populate("userId");

    if (!reviews) {
      return Response.json(
        { success: false, message: "reviews not found" },
        { status: 401 },
      );
    }
    return Response.json({ success: true, reviews });
  } catch (error) {
    return Response.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
};
