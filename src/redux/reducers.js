import { createReducer } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
  subTotal: 0,
  Shipping: 0,
  tax: 0,
  total: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase("addToCart", (state, action) => {
    const item = action.payload;
    const isItemExist = state.cartItems.find((i) => i.id === item.id);

    if (isItemExist) {
      state.cartItems.forEach((i) => {
        if (i.id === item.id) i.qty += 1;
      });
    } else {
      state.cartItems.push(item);
    }
  });

  builder.addCase("removeFromCart", (state, action) => {
    const idToRemove = action.payload;

    state.cartItems = state.cartItems.filter((item) => item.id !== idToRemove);
  });

  // builder.addCase("decrementQty", (state, action) => {
  //   const item = state.cartItems.find((i) => i.id == action.payload);

  //   if (item.qty > 1) {
  //     state.cartItems.forEach((i) => {
  //       if (i.id === item.id) i.qty -= 1;
  //     });
  //   }

  // });

  builder.addCase("decrementQty", (state, action) => {
    const itemId = action.payload;
    const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      if (state.cartItems[itemIndex].qty === 1) {
        // Remove the item from the cart if its quantity is 1
        state.cartItems.splice(itemIndex, 1);
        toast.error("Item Removed");
      } else {
        // Decrement the quantity of the item
        state.cartItems[itemIndex].qty -= 1;
      }
    }
  });

  builder.addCase("calculation", (state) => {
    let sum = 0;

    state.cartItems.forEach((item) => {
      sum += item.price * item.qty;
    });

    state.subTotal = sum;

    state.Shipping = state.subTotal > 1000 ? 0 : 50;

    state.tax = +(state.subTotal * 0.18).toFixed();

    state.total = state.subTotal + state.tax + state.Shipping;

    if (state.cartItems.length === 0) {
      state.Shipping = 0;
      state.total = 0;
    }
  });
});
