// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

/* -----------------  reducer ----------------- */
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const id = action.payload._id || action.payload.id;
      const existing = state.items.find((i) => i.id === id || i._id === id);
      const currentQty = existing?.qty || 0;

      const stock =
        action.payload.stock !== undefined
          ? Number(action.payload.stock)
          : Infinity;

      if (currentQty >= stock) {
        alert(`স্টক শেষ! সর্বোচ্চ ${stock} কপি`);
        return state; // No changes
      }

      const items = existing
        ? state.items.map((i) =>
            i.id === id || i._id === id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...state.items, { ...action.payload, qty: 1 }];

      return { ...state, items };
    }

    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id && i._id !== action.id),
      };

    case 'INC_DEC': {
      const { id, delta } = action;

      const items = state.items.map((item) => {
        const itemId = item._id || item.id;
        if (itemId !== id) return item;

        const newQty = item.qty + delta;

        if (newQty > item.stock) {
          alert('স্টক সীমা শেষ');
          return item;
        }

        return { ...item, qty: Math.max(1, newQty) };
      });

      return { ...state, items };
    }

    case 'CLEAR':
      return { items: [] };

    default:
      return state;
  }
};

/* --------------  provider hook -------------- */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const addToCart = (book) => dispatch({ type: 'ADD', payload: book });
  const removeItem = (id) => dispatch({ type: 'REMOVE', id });
  const inc = (id) => dispatch({ type: 'INC_DEC', id, delta: 1 });
  const dec = (id) => dispatch({ type: 'INC_DEC', id, delta: -1 });
  const clear = () => dispatch({ type: 'CLEAR' });

  const totalQty = state.items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = state.items.reduce(
    (s, i) => s + i.qty * parseFloat(i.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        inc,
        dec,
        clear,
        totalQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);