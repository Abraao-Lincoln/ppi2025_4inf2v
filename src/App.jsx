import "./styles/theme.css";
import "./styles/global.css";
import { Header } from "./components/Header";
import { Routes, Route, useLocation } from "react-router";
import { CartProvider } from "./service/CartContext";
import { Cart } from "./components/Cart";
import { ProductList } from "./components/ProductList";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ManageProducts } from "./components/ManageProducts";

export default function App() {
  const location = useLocation();

  return (

    <>
    <CartProvider>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && <Header />}
      <Routes>
        
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/" element={<ProductList/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

      </Routes>
    </CartProvider>
    </>
  );
  }