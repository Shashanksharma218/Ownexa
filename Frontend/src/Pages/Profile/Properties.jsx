import { useEffect, useState } from "react";

import "../../Styles/Profile/Transactions.css";
import "../../Styles/Profile/Holdings.css";
import SortBar from "../../Components/Dashboard/Filter";
const API = import.meta.env.VITE_API_BASE;


export default function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const [Properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${API}/userproperties`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch Properties");
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="txn-loading">Loading Properties…</div>;
  }

  return (
    <div className="txn-page">
      <div className="txn-header">
        <h1 className="txn-title">Properties</h1>

        <SortBar
          options={[
            { key: "token_quantity", label: "Quantity" },
            { key: "created_at", label: "Date" },
            { key: "price_per_token_inr", label: "Price Per Token" },
          ]}
          data={Properties}
          onChange={setProperties}
        />
      </div>

      {Properties.length === 0 ? (
        <p className="txn-empty">No Current Holdings</p>
      ) : (
        <div className="txn-grid">
          {Properties.map((h) => {
            const totalInvestment =
              h.initial_token_quantity * h.price_per_token_inr;

            const image =
              h.property_images?.[0] ||
              "/placeholder-property.jpg";

            return (
              <div key={h.id} className="holding-card">
                <div className="holding-image">
                  <img src={image} alt={h.title} />
                  <span className={`holding-status ${h.status.toUpperCase()}`}>
                    {h.status}
                  </span>
                </div>

                <div className="holding-body">
                  <div className="holding-header">
                    <h3 className="holding-title">{h.title}</h3>
                    <span className="holding-location">
                      {h.city}, {h.state}
                    </span>
                  </div>

                  <div className="holding-meta">
                    <div>
                      <span className="meta-label">Token</span>
                      <span className="meta-value">
                        {h.token_name}
                      </span>
                    </div>
                    <div>
                      <span className="meta-label">Quantity Sold </span>
                      <span className="meta-value">
                                    {h.initial_token_quantity - h.token_quantity} 
                      </span>
                    </div>
                    <div>
                      <span className="meta-label">Amount Raised</span>
                      <span className="meta-value">
                        ₹{ (h.price_per_token_inr*(h.initial_token_quantity - h.token_quantity)).toLocaleString()} 
                      </span>
                    </div>
                  </div>

                  <div className="holding-footer">
                    <span className="holding-total">
                     <span className="meta-label">Investment </span>   <span className="meta-value">
                        ₹{totalInvestment.toLocaleString()} 
                      </span>
                    </span>

                  {h.status.toUpperCase() === "VALIDATED" && (
  <button className="list-btn">
    Sell Property
  </button>
)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}