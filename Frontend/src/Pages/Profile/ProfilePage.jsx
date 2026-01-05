import { useEffect, useState } from "react";
import "../../Styles/Profile/ProfilePage.css"
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.png";
import avatar4 from "../../assets/avatar4.png";
import avatar5 from "../../assets/avatar5.png";
import avatar6 from "../../assets/avatar6.png";
import avatar7 from "../../assets/avatar7.png";

const API = import.meta.env.VITE_API_BASE;

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
];

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [listedProperties, setListedProperties] = useState([]);
  const [recent, setRecent] = useState([]);

 const [avatar] = useState(
  avatars[Math.floor(Math.random() * avatars.length)]
); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ AUTH
        const userRes = await fetch(`${API}/auth/me`, {
          credentials: "include",
        });

        if (!userRes.ok) throw new Error("Auth failed");

        const userData = await userRes.json();
        setUser(userData.user);
        
        // 2️⃣ DEPENDENT DATA
        const [propertyRes, transactionRes, holdingRes] =
          await Promise.all([
            fetch(`${API}/userproperties`, { credentials: "include" }),
            fetch(`${API}/transaction?status=SUCCESS`, { credentials: "include" }),
            fetch(`${API}/holdings`, { credentials: "include" }),
          ]);

        const propertyData = await propertyRes.json();
        const transactionData = await transactionRes.json();
        const holdingData = await holdingRes.json();

        const p = Array.isArray(propertyData) ? propertyData : [];
        const t = Array.isArray(transactionData) ? transactionData : [];
        const h = Array.isArray(holdingData) ? holdingData : [];
         
        setListedProperties(p);
        setTransactions(t);
          setHoldings(h);


        // 3️⃣ RECENT ACTIVITY
        const allActivity = t
          .map((i) => ({
            ...i,
            timestamp:
              i.created_at ||
              i.createdAt ||
              new Date().toISOString(),
          }))
          .sort(
            (a, b) =>
              new Date(b.timestamp) - new Date(a.timestamp)
          );

        setRecent(allActivity.slice(0, 5));
      } catch (err) {
        console.error("Fetch error:", err);
        setUser(null);
        setHoldings([]);
        setTransactions([]);
        setListedProperties([]);
        setRecent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
    

  if (loading) return <div className="loading-screen">Loading profile…</div>;

  if (!user) return <div className="loading-screen">Unauthorized</div>;

  return (
   
        <div className="content-grid">
          {/* CARD 1 — HERO */}
         <section className="card hero-card">
  <div className="hero-left">
    <h1>{user?.username}</h1>
    <p>{user?.email}</p>
  </div>

  <div className="hero-avatar">
    <img src={avatar} alt="avatar" />
  </div>

  <div className="metrics-strip">
    <Metric label="Transactions" value={transactions.length} />
    <Metric label="Holdings" value={holdings.length} />
    <Metric label="Listed" value={listedProperties.length} />
  </div>
</section>

          {/* CARD 2 */}
          <section className="card">
            <h3>Total Holdings</h3>
            <p>{holdings.length}</p>
          </section>

          {/* CARD 3 */}
          <section className="card">
            <h3>Properties Listed</h3>
            <p>{listedProperties.length}</p>
          </section>

          {/* CARD 4 */}
         <section className="card full-width-card">
  <h3>Recent Transactions</h3>

  {recent.length === 0 && (
    <p className="empty-text">No recent activity</p>
  )}

  {recent.map((tx) => (
    <div key={tx.transaction_hash} className="tx-row">
      {/* LEFT */}
      <div className="tx-left">
        <div className="tx-title">
          {tx.token_quantity} × {tx.token_name}
        </div>
        <div className="tx-sub">
          ₹{tx.price_per_token_inr} / token
        </div>
      </div>

      {/* RIGHT */}
      <div className="tx-right">
        <span className={`tx-status ${tx.status}`}>
          {tx.status}
        </span>
        <span className="tx-hash">
          {tx.transaction_hash.slice(0, 6)}…
          {tx.transaction_hash.slice(-4)}
        </span>
      </div>
    </div>
  ))}
</section>
        </div>
  );
}

// 🔹 METRIC COMPONENT
function Metric({ label, value }) {
  return (
    <div className="metric">
      <h3>{value}</h3>
      <span>{label}</span>
    </div>
  );
}