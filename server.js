require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;
const CRUX_API_KEY = process.env.CRUX_API_KEY;
console.log("CRUX_API_KEY ==> ", CRUX_API_KEY);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const CRUX_API_URL = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${CRUX_API_KEY}`;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.post("/crux", async (req, res) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: "Please provide an array of URLs." });
  }

  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await axios.post(
            CRUX_API_URL,
            { url },
            { headers: { "Content-Type": "application/json" } }
          );
          return { url, data: response.data };
        } catch (error) {
          return { url, error: error.response?.data || "Failed to fetch data" };
        }
      })
    );

    res.json(results);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong while processing URLs" });
  }
});

app.listen(PORT, () => {
  console.log(`CrUX API server running on port ${PORT}`);
});
