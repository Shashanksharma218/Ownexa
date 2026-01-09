import { NavLink } from "react-router-dom";
import "../../Styles/Components/Navbar.css";

export default function Navbar() {
    return (
        <>
    <nav className="market-navbar">
      <div className="market-navbar-inner">

        {/* LEFT */}
        <div className="nav-logo">
          OWNEXA
        </div>

        {/* CENTER */}
        <div className="nav-links">
          <NavLink to="/PrimaryMarket" className="nav-item">
            Primary
          </NavLink>

          <NavLink to="/SecondaryMarket" className="nav-item">
            Secondary
          </NavLink>

          <NavLink to="/Dashboard" className="nav-item">
            Explore
          </NavLink>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <button className="wallet-btn">
            Wallet
          </button>
        </div>

      </div>
            </nav>
            </>
  );
}