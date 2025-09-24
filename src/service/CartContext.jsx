import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
  products: [],
  cart: [],
  loading: false,
  error: null,
  // Cart Management
  addToCart: () => {},
  updateQty: () => {},
  clearCart: () => {},

  // User Session Management
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export function CartProvider({ children }) {
  var category = "mobile-accessories";
  var limit = 12;
  var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}`;
  const [products, setProducts] = useState([]);
  var [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from("products").select();
      if (error) {
        setError(error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabase();

    // async function fetchProducts() {
    //   try {
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();

    //     setProducts(data.products);
    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // setTimeout(() => {
    //   fetchProducts();
    // }, 100);
  }, []);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const updateQty = (product, qty) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, qty } : item
      );
    });
  };
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === product.id);
      if (index === -1) return prevCart;
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };
  const productMap = {};
  cart.forEach((product) => {
    if (productMap[product.id]) {
      productMap[product.id].qty += 1;
    } else {
      productMap[product.id] = { ...product, qty: 1 };
    }
  });

  const uniqueProducts = Object.values(productMap);

  const clearCart = () => {
    setCart([]);
  };

  // User Session Management
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);

  async function handleSignUp(email, password, username) {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            admin: false,
          },
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) throw error;

      if (data?.user) {
        setSessionMessage(
          "Registration successful! Please check your email to confirm your account."
        );
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignIn(email, password) {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        setSessionMessage("Sign-in successful!");
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignOut() {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setSession(null);
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  const context = {
    // Cart Management
    products: products,
    cart: cart,
    loading: loading,
    error: error,
    setProducts: setProducts,
    addToCart: addToCart,
    updateQty: updateQty,
    clearCart: clearCart,

    // User Session Management
    session: session,
    sessionLoading: sessionLoading,
    sessionMessage: sessionMessage,
    sessionError: sessionError,
    handleSignUp: handleSignUp,
    handleSignIn: handleSignIn,
    handleSignOut: handleSignOut,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
