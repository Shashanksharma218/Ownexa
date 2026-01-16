import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import AuthPage from "./Pages/Auth/Auth";
import AddProperty from "./Pages/Forms/AddProperty";
import AdminViewPage from "./Pages/Admin/AdminViewPage";
import AdminPropertyPage from "./Pages/Admin/AdminPropertyPage";
import PrimaryMarket from "./Pages/Market/Primary";
import PropertyCard from "./Pages/Market/PropertyCard";
import PageFade from "./Components/Loaders/PageFade";
import DashboardLayout from "./Layouts/Dashboard";
import ProfilePage from "./Pages/Profile/ProfilePage";
import TransactionsPage from "./Pages/Profile/Transaction";
import HoldingsPage from "./Pages/Profile/Holdings";
import SecondaryMarket from "./Pages/Market/Secondary";
import ListingsPage from "./Pages/Profile/Listings";
import MarketLayout from "./Layouts/Market";
import PropertiesPage from "./Pages/Profile/Properties";
import Home from "./Components/Home";
import AdminDashboardLayout from "./Layouts/AdminDashboard";
import Review from "./Pages/Admin/Review";

/** Forces scroll to top on refresh + route changes */
function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser restoring scroll position on refresh/back/forward
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Hard reset scroll (now + after layout/fonts settle)
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    setTimeout(() => window.scrollTo(0, 0), 50);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollManager />

      <Routes>
        <Route path="/Auth" element={<AuthPage />} />

        <Route path="/" element={<MarketLayout />}>
          <Route index element={<Home />} />
          <Route path="/PrimaryMarket" element={<PageFade><PrimaryMarket /></PageFade>} />
          <Route path="/SecondaryMarket" element={<PageFade><SecondaryMarket /></PageFade>} />
          <Route path="/Property/:id" element={<PageFade><PropertyCard /></PageFade>} />
        </Route>

        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="holdings" element={<HoldingsPage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="Form" element={<AddProperty />} />
          <Route path="properties" element={<PropertiesPage />} />
        </Route>

        <Route path="/AdminDashboard" element={<AdminDashboardLayout />}>
          <Route index element={<h1>Hello this is Admin Dashboard</h1>} />
          <Route path="Pending" element={<AdminViewPage />} />
          <Route path="Pending/Property/:id" element={<AdminPropertyPage />} />
          <Route path="Documents" element={<Review />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;