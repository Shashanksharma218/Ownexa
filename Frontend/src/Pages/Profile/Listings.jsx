import { useEffect, useState } from "react";
import "../../Styles/Profile/Listing.css";

const API = import.meta.env.VITE_API_BASE;

export default function ListingsPage() {
  const [loading, setLoading] = useState(true);
  const [activeListings, setActiveListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [activeRes, soldRes] = await Promise.all([
          fetch(`${API}/listings?status=ACTIVE&tag=seller`, {
            credentials: "include",
          }),
          fetch(`${API}/listings?status=SOLD&tag=seller`, {
            credentials: "include",
          }),
        ]);

        if (!activeRes.ok || !soldRes.ok) {
          throw new Error("Failed to fetch listings");
        }

        const activeData = await activeRes.json();
        const soldData = await soldRes.json();

        setActiveListings(Array.isArray(activeData) ? activeData : []);
        setSoldListings(Array.isArray(soldData) ? soldData : []);
      } catch (err) {
        console.error(err);
        setActiveListings([]);
        setSoldListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="listings-loading">
        Loading listings…
      </div>
    );
  }

  return (
    <div className="listings-page">
      <section className="listings-section">
        <h2 className="listings-title">Active Listings</h2>

        {activeListings.length === 0 ? (
          <p className="listings-empty">
            No active listings
          </p>
        ) : (
          <div className="listings-grid">
            {activeListings.map((item) => (
              <div key={item.id} className="listing-card">
                <h4 className="listing-name">
                  {item.properties.title}
                </h4>

                <p className="listing-location">
                  {item.properties.city}, {item.properties.state}
                </p>

                <p className="listing-token">
                  Token: {item.properties.token_name}
                </p>

                <div className="listing-meta">
                  <div>
                    <span>Bought For</span>
                    <strong>
                      ₹{item.holdings.avg_price_inr}
                    </strong>
                  </div>

                  <div>
                    <span>Listed For</span>
                    <strong>
                      ₹{item.price_per_token_inr}
                    </strong>
                  </div>

                  <div>
                    <span>Listed Quantity</span>
                    <strong>
                      {item.token_quantity}
                    </strong>
                  </div>
                </div>

                <button
                  className="listing-cancel"
                  disabled
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="listings-section">
        <h2 className="listings-title">Sold Listings</h2>

        {soldListings.length === 0 ? (
          <p className="listings-empty">
            No sold listings
          </p>
        ) : (
          <div className="listings-grid">
            {soldListings.map((item) => (
              <div
                key={item.id}
                className="listing-card sold"
              >
                <h4 className="listing-name">
                  {item.properties.title}
                </h4>

                <p className="listing-location">
                  {item.properties.city}, {item.properties.state}
                </p>

                <p className="listing-token">
                  Token: {item.properties?.token_name}
                </p>

                <div className="listing-meta">
                  <div>
                    <span>Bought For</span>
                    <strong>
                      ₹{item.holdings.avg_price_inr}
                    </strong>
                  </div>

                  <div>
                    <span>Sold For</span>
                    <strong>
                      ₹{item.price_per_token_inr}
                    </strong>
                  </div>

                  <div>
                    <span>Quantity</span>
                    <strong>
                      {item.token_quantity}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}