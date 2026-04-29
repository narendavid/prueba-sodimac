import type { CartAction, CartState } from "@/features/cart/context/cart.context";

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
	case "ADD_ITEM": {
	  const existingItem = state.items.find(
		(item) => item.product.id === action.payload.product.id
	  );

	  if (existingItem) {
		return {
		  items: state.items.map((item) =>
			item.product.id === action.payload.product.id
			  ? {
				  ...item,
				  quantity: item.quantity + action.payload.quantity,
				}
			  : item
		  ),
		};
	  }

	  return {
		items: [
		  ...state.items,
		  {
			product: action.payload.product,
			quantity: action.payload.quantity,
		  },
		],
	  };
	}

	case "REMOVE_ITEM":
	  return {
		items: state.items.filter(
		  (item) => item.product.id !== action.payload
		),
	  };

	case "UPDATE_QUANTITY": {
	  const validQuantity = Math.max(0, action.payload.quantity);

	  if (validQuantity === 0) {
		return {
		  items: state.items.filter(
			(item) => item.product.id !== action.payload.id
		  ),
		};
	  }

	  return {
		items: state.items.map((item) =>
		  item.product.id === action.payload.id
			? { ...item, quantity: validQuantity }
			: item
		),
	  };
	}

	case "CLEAR_CART":
	  return { items: [] };

	case "HYDRATE":
	  return action.payload;

	default:
	  return state;
  }
};