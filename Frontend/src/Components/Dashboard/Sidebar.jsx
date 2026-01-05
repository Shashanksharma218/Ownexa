import {
  User,
  Wallet,
  Building2,
  FileText
} from "lucide-react";
import "../../Styles/Components/Sidebar.css" 

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <button
        className={active === "profile" ? "active" : ""}
        onClick={() => setActive("profile")}
        aria-label="Profile"
      >
        <User size={16} />
      </button>

      <button
        className={active === "holdings" ? "active" : ""}
        onClick={() => setActive("holdings")}
        aria-label="Holdings"
      >
        <Wallet size={16} />
      </button>

      <button
        className={active === "properties" ? "active" : ""}
        onClick={() => setActive("properties")}
        aria-label="Properties"
      >
        <Building2 size={16} />
      </button>

      <button
        className={active === "transactions" ? "active" : ""}
        onClick={() => setActive("transactions")}
        aria-label="Transactions"
      >
        <FileText size={16} />
      </button>
    </aside>
  );
}