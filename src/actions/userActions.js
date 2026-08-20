"use server";

import connectDb from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import checkLoginUser from "@/lib/checkLoginUser";
import Cart from "@/models/cartModel";

export const registerUser = async (_, userData) => {
  try {
    await connectDb();
    const { name, email, phone, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, phone, password: hashedPassword });
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while registering the user",
    };
  }
};

export const loginUser = async (_, userData) => {
  try {
    await connectDb();
    const cookiesStore = await cookies();
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true, message: "User logged in successfully" };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while logging in the user",
    };
  }
};

export const logoutUser = async () => {
  try {
    const cookiesStore = await cookies();
    cookiesStore.delete("token");
    return { success: true, message: "User logged out successfully" };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while logging out the user",
    };
  }
};

export const addToCart = async (_, product) => {
  try {
    const { productId, size } = product;
    await connectDb();
    const user = await checkLoginUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const existingCartItem = await Cart.findOne({
      user: user._id,
      productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      await Cart.create({ user: user._id, productId, quantity: 1, size });
    }

    return { success: true, message: "Product added to cart successfully" };
  } catch (error) {
    console.log("ERROR", error);
    return {
      success: false,
      message: "An error occurred while adding product to cart",
    };
  }
};

export const updateServerQty = async (data) => {
  try {
    await connectDb();
    const { id, delta, qty } = data;

    if (delta === "INCREASE") {
      await Cart.findByIdAndUpdate(id, {
        $inc: { quantity: 1 },
      });
    } else {
      if (qty === 1) {
        await Cart.findByIdAndDelete(id);
      } else {
        await Cart.findByIdAndUpdate(id, {
          $inc: {
            quantity: -1,
          },
        });
      }
    }
    return { success: true, message: "updated successfully!" };
  } catch (error) {
    return { success: false, message: "something went wrong" };
  }
};

export const deleteCartItem = async (id) => {
  try {
    await connectDb();
    await Cart.findByIdAndDelete(id);
    return { success: true, message: "deleted successfully" };
  } catch (error) {
    return { success: false, message: "somthing went wrong!" };
  }
};
