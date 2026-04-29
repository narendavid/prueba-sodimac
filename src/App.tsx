import { CartProvider } from "@/features/cart/context/cart.context";
import { AppRouter } from "../app/router";

const App = () => {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
};

export default App;
