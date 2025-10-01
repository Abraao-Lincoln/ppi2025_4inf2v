import styles from "./Header.module.css";
import { ShoppingCart, CircleUserRound } from "lucide-react";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Separator } from "@base-ui-components/react/separator";
import { Badge } from "@mui/material";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { cart, uniqueProducts, session } = useContext(CartContext);
  const username = session?.user?.user_metadata?.username;

  return (
    <header className={styles.header}>
      <div className={styles.username}>Welcome {username}!</div>

      <div>
        <Link to="/" className={styles.title}>
          TECHNOSTORE
        </Link>
      </div>

      {/* Login / Sign up Area */}
      <div className={styles.loginArea}>
        <a href="/signin">Log in</a>

        <Separator orientation="vertical" className={styles.Separator} />

        <a href="/register">Sign up</a>
      </div>

      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>

      <div className={styles.cart}>
        {/* Shopping Cart */}
        <Link to="/cart">
          <Badge
            badgeContent={cart.length}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "var(--primary)",
                color: "var(--primary-contrast)",
                fontSize: "1rem",
              },
            }}
          >
            <ShoppingCart className={styles.cartIcon} />
          </Badge>
        </Link>
        {/* Total Value */}
        <div className={styles.cartTotal}>
          {cart.length > 0 && (
            <h5>
              {uniqueProducts
                ?.reduce(
                  (total, product) => total + product.price * product.qty,
                  0
                )
                .toFixed(2)}
            </h5>
          )}
        </div>
      </div>
    </header>
  );
}
