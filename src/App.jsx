import "./styles/theme.css";
import "./styles/global.css";
import { Header } from "./components/Header";
import { Routes, Route, useLocation } from "react-router";
import { CartProvider } from "./service/CartContext";
import { Cart } from "./components/Cart";
import { ProductList } from "./components/ProductList";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default function App() {
  const location = useLocation();

  return (

    <>
    <CartProvider>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Header />}
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </CartProvider>
    </>
  );
  }