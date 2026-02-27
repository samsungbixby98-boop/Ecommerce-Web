// App.jsx (Upgraded with Sidebar Layout)

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./hooks/useAuth";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import Sidebar from "./components/Sidebar";
import "./styles/sidebar.css";

export default function App() {
  const auth = useAuth();
  const { products, loading, errorText } = useProducts(auth.isLoggedIn);
  const cart = useCart(auth.isLoggedIn);

  return (
    <>
      {!auth.isLoggedIn ? (
        // 🔐 If not logged in → show Auth page full screen
        <AuthPage
          registeredUser={auth.registeredUser}
          onSignUp={auth.signUp}
          onLogin={auth.login}
        />
      ) : (
        // ✅ If logged in → show Sidebar + Dashboard
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div
            style={{
              marginLeft: "240px",
              padding: "20px",
              width: "100%",
              background: "#0f172a",
              minHeight: "100vh",
              color: "white",
            }}
          >
            <DashboardPage
              user={auth.currentUser}
              products={products}
              loading={loading}
              errorText={errorText}
              cartCount={cart.cartCount}
              onAddToCart={cart.addToCart}
              onResetCart={cart.resetCart}
              onLogout={auth.logout}
            />
          </div>
        </div>
      )}
    </>
  );
}