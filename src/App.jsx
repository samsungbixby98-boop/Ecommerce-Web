import { useState } from "react";
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
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPageContent = () => {
    if (activePage === "Dashboard") {
      return (
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
      );
    }

    if (activePage === "Items") {
      return (
        <section className="card">
          <h3 className="cardTitle">All Items</h3>
          <p>Total products available: {products.length}</p>
        </section>
      );
    }

    if (activePage === "Analytics") {
      return (
        <section className="card">
          <h3 className="cardTitle">Analytics</h3>
          <p>Orders today: 14</p>
          <p>Revenue today: $2,430</p>
        </section>
      );
    }

    if (activePage === "Orders") {
      return (
        <section className="card">
          <h3 className="cardTitle">Orders</h3>
          <p>Latest orders will appear here.</p>
        </section>
      );
    }

    if (activePage === "Cart") {
      return (
        <section className="card">
          <h3 className="cardTitle">Cart</h3>
          <p>Items in cart: {cart.cartCount}</p>
          <button className="btnOutline" onClick={cart.resetCart}>
            Reset Cart
          </button>
        </section>
      );
    }

    if (activePage === "Settings") {
      return (
        <section className="card">
          <h3 className="cardTitle">Settings</h3>
          <p>Account email: {auth.currentUser?.email}</p>
          <button className="btnOutline" onClick={auth.logout}>
            Logout
          </button>
        </section>
      );
    }

    return null;
  };

  return (
    <>
      {!auth.isLoggedIn ? (
        <AuthPage
          registeredUser={auth.registeredUser}
          onSignUp={auth.signUp}
          onLogin={auth.login}
        />
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar activePage={activePage} onPageChange={setActivePage} />

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
            {renderPageContent()}
          </div>
        </div>
      )}
    </>
  );
}
