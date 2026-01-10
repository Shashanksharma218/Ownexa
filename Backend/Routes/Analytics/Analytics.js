import express from "express";
import Analytics from "../../Database/Analytics/Analytics.js";
const router = express.Router();  

router.get("/public/stats", async (req, res) => {
  try {
      const stats = await Analytics(); 
    return res.status(200).json({
      users: stats.total_users,
      properties: stats.total_validated_properties,
      transactions: stats.total_transactions,
      volume: stats.total_transaction_volume
    });

  } catch (err) {
    return res.status(500).json({
      error: "Unable to fetch stats"
    });
  }
});

export default router; 