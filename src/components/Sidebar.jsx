import React from "react";
import "../styles/sidebar.css";

const pages = [
  "Dashboard",
  "Items",
  "Analytics",
  "Orders",
  "Cart",
  "Settings",
];

const Sidebar = ({ activePage, onPageChange }) => {
  return (
    <div className="sidebar">
      <h2 className="logo">ISHMART</h2>

      <ul className="menu">
        {pages.map((page) => (
          <li
            key={page}
            className={activePage === page ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
