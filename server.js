const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.json());

app.post("/save-location", (req, res) => {
  const { latitude, longitude } = req.body;

  const data = `Location received at ${new Date().toLocaleString()}\nLatitude: ${latitude}, Longitude: ${longitude}\n\n`;

  // Save to file (or send to Telegram/email)
  fs.appendFileSync("locations.txt", data);

  console.log("📍 Location saved:", latitude, longitude);
  res.send("Location received");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
