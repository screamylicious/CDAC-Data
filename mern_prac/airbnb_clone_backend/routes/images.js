const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/:icon", (request, response) => {
  const { icon } = request.params;
  const path = __dirname + "/../images/" + icon;
  const data = fs.readFileSync(path);
  response.send(data);
});

module.exports = router;
