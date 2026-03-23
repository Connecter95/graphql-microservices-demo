const express = require("express");

const app = express();
const PORT = 3001;

app.get("/data", (_req, res) => {
  res.json({
    service: "A",
    message: "Hello from Microservice A",
  });
});

app.listen(PORT, () => {
  console.log(`Microservice A running on http://localhost:${PORT}`);
});
