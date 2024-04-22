const express = require("express");
const db = require("../db");
const utils = require("../utils");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "images" });
router.get("/", (request, response) => {
  const statement = `select id, title, details, icon from category`;
  db.pool.execute(statement, [], (error, categories) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else {
      if (categories.length == 0) {
        response.send(utils.createErrorResult("no category"));
      } else {
        response.send(utils.createSuccessResult(categories));
      }
    }
  });
});

router.post("/", upload.single("icon"), (request, response) => {
  const { title, details } = request.body;
  const fileName = request.file.filename;
  const statement = `insert into category (title, details, icon) values (?,?,?)`;
  db.pool.execute(statement, [title, details, fileName], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
