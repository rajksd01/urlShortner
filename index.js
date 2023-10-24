import express from "express";
import "dotenv/config";
const app = express();
import urlRouter from "./routes/url.js";
import connectToMongoDB from "./db/connection.js";
import URL from "./models/url.js";

connectToMongoDB().then(() => {
  console.log("DB connected");
});

app.use(express.json());
app.use(urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (entry) {
    const url = entry.redirectUrl;
    const validUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : "http://" + url;

    res.redirect(validUrl);
  } else {
    
    res.status(404).send("Short URL not found");
  }
});

app.listen(3000, () => {
  console.log("Server Running");
});
