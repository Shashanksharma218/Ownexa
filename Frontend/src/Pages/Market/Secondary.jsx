import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Market/Secondary.css";

const API = import.meta.env.VITE_API_BASE;

export default function SecondaryMarket() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          `${API}/propertylisting?status=ACTIVE`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch listings");

        const data = await res.json();
        const sorted = data.sort(
          (a, b) => new Date(b.validated_at) - new Date(a.validated_at)
        );

        setListings(sorted);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div className="sm-loading">Loading secondary market…</div>;
  }

  return (
    <section className="sm-page">
      {listings.length === 0 ? (
        <div className="sm-empty">
          No active secondary listings
        </div>
      ) : (
        <div className="sm-grid">
          {listings.map((item) => (
            <article
              key={item.id}
              className="sm-card"
              onClick={() =>
                navigate(`/Property/${item.properties.id}`)
              }
            >
              {/* Thumbnail */}
              <div className="sm-thumb">
                <img
                  src={
                    item.properties.property_images?.[0] ||
                    "/placeholder-property.jpg"
                  }
                  alt={item.properties.title}
                />
              </div>

              {/* Content */}
              <div className="sm-info">
                {/* Header */}
                <div className="sm-header">
                  <h4 className="sm-title">
                    {item.properties.title}
                  </h4>
                  <span className="sm-badge sm-active">
                    ACTIVE
                  </span>
                </div>

                {/* Meta */}
                <div className="sm-meta">
                  <div className="sm-row">
                    <span>Token</span>
                    <strong>{item.properties.token_name}</strong>
                  </div>

                  <div className="sm-row highlight">
                    <span>Price</span>
                    <strong>₹{item.price_per_token_inr}</strong>
                  </div>

                  <div className="sm-row">
                    <span>Qty</span>
                    <strong>{item.token_quantity}</strong>
                  </div>
                </div>

                {/* Footer */}
                <div className="sm-footer">
                  <span className="sm-date">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <span className="sm-cta">View →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}