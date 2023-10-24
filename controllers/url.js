import { nanoid } from "nanoid";
import URL from "../models/url.js ";

async function handleGenerateNewShortUrl(req, res) {
  const shortId = nanoid();
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required." });
  }

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.id;

  const urlData = await URL.findOne({ shortId });
  try {
    return res.json({
      totalCLicks: urlData.visitHistory.length,
      analytics: urlData.visitHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

export { handleGenerateNewShortUrl, handleAnalytics };
