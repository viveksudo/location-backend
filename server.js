const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.json());

app.post("/save-location", (req, res) => {
  const { latitude, longitude } = req.body;

  const data = `Location received at ${new Date().toLocaleString()}\nLatitude: ${latitude}, Longitude: ${longitude}\n\n`;

  fs.appendFileSync("locations.txt", data);

  console.log("📍 Location saved:", latitude, longitude);
  res.send("Location received");
});

app.get("/get-locations", (req, res) => {
  fs.readFile("locations.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Locations file nahi mil rahi");
    }
    res.type("text/plain").send(data);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
