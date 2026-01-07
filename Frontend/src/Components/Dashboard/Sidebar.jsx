import { NavLink } from "react-router-dom";
import {
  User,
  Wallet,
  Building2,
  FileText,
  Store 
} from "lucide-react";

import "../../Styles/Components/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/Dashboard" end>
        {({ isActive }) => (
          <button className={isActive ? "active" : ""} aria-label="Profile">
            <User size={16} />
          </button>
        )}
      </NavLink>

      <NavLink to="/Dashboard/holdings">
        {({ isActive }) => (
          <button className={isActive ? "active" : ""} aria-label="Holdings">
            <Wallet size={16} />
          </button>
        )}
      </NavLink>

       <NavLink to="/Dashboard/listings">
        {({ isActive }) => (
          <button className={isActive ? "active" : ""} aria-label="Listings">
            <Store size={16} />
          </button>
        )}
      </NavLink>

      <NavLink to="/Dashboard/properties">
        {({ isActive }) => (
          <button className={isActive ? "active" : ""} aria-label="Properties">
            <Building2 size={16} />
          </button>
        )}
      </NavLink>

      <NavLink to="/Dashboard/transactions">
        {({ isActive }) => (
          <button className={isActive ? "active" : ""} aria-label="Transactions">
            <FileText size={16} />
          </button>
        )}
      </NavLink>
    </aside>
  );
}