import express from "express";
const router = express.Router();
import {
  handleGenerateNewShortUrl,
  handleAnalytics,
} from "../controllers/url.js";

router.post("/url", handleGenerateNewShortUrl);
router.get("/", (req, res) => {
  res.send("hw");
});
router.get("/analytics/:id", handleAnalytics);
export default router;
