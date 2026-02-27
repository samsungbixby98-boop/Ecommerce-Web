import React from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">ISHMART</h2>

      <ul className="menu">
        <li className="active">Dashboard</li>
        <li>Items</li>
        <li>Analytics</li>
        <li>Orders</li>
        <li>Cart</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;