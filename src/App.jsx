import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemListContainer } from "./components/pages/itemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/pages/ItemDetailContainer/ItemDetailContainer";
import { Navbar } from "./components/layout/navbar/Navbar";
 import { CartContextProvider } from "./context/CartContext";
 import Cart from "./components/pages/cart/Cart";
 import Checkout from "./components/pages/checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:name" element={<ItemListContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<div style={{ padding: 24 }}>Página no encontrada</div>} />      
        </Routes>
      </CartContextProvider>  
    </BrowserRouter>
  );
}

export default App;