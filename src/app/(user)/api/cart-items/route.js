import checkLoginUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Cart from "@/models/cartModel";

export const GET = async () => {
  try {
    await connectDb();

    const user = await checkLoginUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User is not logged in!",
        },
        { status: 401 },
      );
    }

    const items = await Cart.find({
      user: user._id,
    }).populate("productId");

    const cartItems = items
      .filter((item) => item.productId) // deleted/missing product ko skip karega
      .map((item) => {
        const product = item.productId;

        return {
          _id: item._id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || "",
          qty: item.quantity,
          color: "red",
          size: item.size,
        };
      });

    return Response.json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.log("ERROR", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong!",
      },
      { status: 500 },
    );
  }
};
