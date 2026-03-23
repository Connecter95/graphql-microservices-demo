const express = require("express");

const app = express();
const PORT = 3002;

app.get("/data", (_req, res) => {
  res.json({
    service: "B",
    message: "Hello from Microservice B",
  });
});

app.listen(PORT, () => {
  console.log(`Microservice B running on http://localhost:${PORT}`);
});
