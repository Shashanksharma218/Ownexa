import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";

import PropertyTokenABI from "../../abi/PropertyToken.json";
import "../../Styles/Market/PropertyCard.css";

const API = import.meta.env.VITE_API_BASE;
const CONTRACT_ADDRESS = import.meta.env.VITE_SMART_CONTRACT;

const ETH_INR = 300000; // keep configurable

import {
  MapPin,
  Home,
  Building2,
  Ruler,
  Coins,
  IndianRupee,
  Layers,
  FileText
} from "lucide-react";

export default function PropertyCard() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API}/properties/${id}?status=validated&listed=true`, {
          credentials: "include"
        });
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);
  const handlePrimaryBuy = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not found");
      }

      if (!quantity || Number(quantity) <= 0) {
        throw new Error("Enter a valid quantity");
      }

      setBuying(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const buyerAddress = await signer.getAddress();
      const pricePerTokenWei = ethers.parseEther(
        (Number(property.price_per_token_inr) / ETH_INR).toFixed(18)
      );
      const basePriceWei = pricePerTokenWei * BigInt(quantity);
      const commissionWei = (basePriceWei * 2n) / 100n;
      const totalPriceWei = basePriceWei + commissionWei;
      const value = totalPriceWei;
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        PropertyTokenABI,
        signer
      );

      const tx = await contract.buyTokens(
        property.blockchain_id,
        BigInt(quantity),
        { value }
      );

      const receipt = await tx.wait();
      const res = await fetch(`${API}/transaction?type=primary`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          blockchainId: property.blockchain_id,
          tokenName: property.token_name,
          tokenQuantity: Number(quantity),
          pricePerTokenInr: property.price_per_token_inr,
          accountaddress: buyerAddress,
          transactionhash: receipt.hash,
          status: "SUCCESS",
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Transaction sync failed");
      }

      alert("Tokens bought successfully!");
      setQuantity("");

    } catch (err) {
      console.error(err);
      alert(err.message || "Primary buy failed");
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <div className="page-loading">Loading property...</div>;
  if (!property) return null;

  return (
    <div className="property-buy-page">
      <div className="property-buy-container">

        <div className="property-main">
          <div className="property-image-grid">
            {property.property_images?.map((img, idx) => (
              <img key={idx} src={img} alt="property" />
            ))}
          </div>

          <div className="property-details">
            <h2 className="property-title">{property.title}</h2>

            <div className="detail-row full">
              <MapPin size={16} />
              <span>
                {property.address_line}, {property.city}, {property.state} – {property.pincode}
              </span>
            </div>

            <div className="details-grid">

              <div className="detail-item">
                <Home size={16} />
                <span>{property.bhk} BHK</span>
              </div>

              <div className="detail-item">
                <Building2 size={16} />
                <span>{property.property_type}</span>
              </div>

              <div className="detail-item">
                <Ruler size={16} />
                <span>{property.built_up_area_sqft} sqft</span>
              </div>

              <div className="detail-item">
                <Coins size={16} />
                <span>{property.token_name}</span>
              </div>

              <div className="detail-item">
                <IndianRupee size={16} />
                <span>{property.price_per_token_inr} / token</span>
              </div>

              <div className="detail-item">
                <Layers size={16} />
                <span>{property.token_quantity} tokens left</span>
              </div>

            </div>

            <div className="detail-row full">
              <FileText size={16} />
              <span>
                {property.registry_name} • {property.registry_number}
              </span>
            </div>

          </div>
        </div>
        <div className="property-market">
          <div className="market-card primary-market">
            <h3>Primary Market</h3>
            <p className="price">
              ₹{property.price_per_token_inr} / token
            </p>

            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={buying}
            />
            <button
              className="buy-btn"
              onClick={handlePrimaryBuy}
              disabled={buying}
            >
              {buying ? "Buying..." : "Buy Primary"}
            </button>
          </div>
          <div className="market-card secondary-market">
            <h3>Secondary Market</h3>
            <div className="empty-secondary">
              No secondary listings available yet
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}