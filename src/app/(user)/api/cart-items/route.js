import checkLoginUser from "@/lib/checkLoginUser";
import connectDb from "@/lib/db";
import Cart from "@/models/cartModel";

export const GET = async () => {
  try {
    await connectDb();
    const user = await checkLoginUser();
    if (!user) {
      return Response.json(
        { success: false, message: "user are not logged in!" },
        { status: 401 },
      );
    }

    const items = await Cart.find({ user: user._id }).populate("productId");

    const cartItems = items.map((item) => {
      const product = item.productId.toObject();
      return {
        _id: item._id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        qty: item.quantity,
        color: "red",
      };
    });

    return Response.json({ success: true, cartItems });
  } catch (error) {
    console.log("ERROR", error);
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
};
