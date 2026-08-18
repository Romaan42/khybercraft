import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getFromLocalStorage = () => {
  try {
    if (typeof window === "undefined") {
      return [];
    }
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error("Error retrieving cart items from localStorage:", error);
    return [];
  }
};

const saveInLocal = (items) => {
  try {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (error) {
    console.error(error);
  }
};

export const getCartItems = createAsyncThunk(
  "cart/items",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/cart-items", {
        credentials: "include",
      });
      const result = await res.json();

      if (!result.success) {
        return rejectWithValue(result.message);
      }

      return result.cartItems;
    } catch (error) {
      return rejectWithValue("something went wrong!");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.cartLoading = action.payload;
    },
    getAllItems: (state) => {
      state.items = getFromLocalStorage();
    },
    guestAddToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }

      saveInLocal(state.items);
    },
    guestRemoveFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      saveInLocal(state.items);
    },
    guestClearCart: (state) => {
      state.items = [];
      saveInLocal(state.items);
    },

    updateQty: (state, action) => {
      const { id, delta } = action.payload;
      const product = state.items.find((p) => p._id === id);
      if (delta === "INCREASE") {
        product.qty += 1;
      } else {
        if (product.qty > 1) {
          product.qty -= 1;
        }
      }

      saveInLocal(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.items = [];
        state.cartLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.items = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.cartLoading = false;
        state.items = [];
      });
  },
});

export const {
  guestAddToCart,
  guestRemoveFromCart,
  guestClearCart,
  getAllItems,
  updateQty,
  setLoading,
} = cartSlice.actions;
export default cartSlice;
