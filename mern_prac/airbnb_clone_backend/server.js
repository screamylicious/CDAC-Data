const express = require("express");
const cors = require("cors");
const config = require("./config");
const utils = require("./utils");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());
const userRouter = require("./routes/user");
const propertyRouter = require("./routes/property");
const categoryRouter = require("./routes/category");
const imageRouter = require("./routes/images");
app.use((request, response, next) => {
  if (
    request.url == "/user/login" ||
    request.url == "/user/register" ||
    request.url == "/user/reactivate" ||
    request.url == "/property" ||
    request.url == "/category" ||
    request.url.startsWith("/image")
  ) {
    next();
  } else {
    const token = request.headers["token"];
    if (!token || token == "") {
      response.send(utils.createErrorResult("token empty"));
      return;
    }
    try {
      const payload = jwt.verify(token, config.SECRET);
      request.id = payload["id"];
      request.email = payload["email"];
      next();
    } catch (ex) {
      response.send(utils.createErrorResult("token not matching"));
    }
  }
});
app.use("/user", userRouter);
app.use("/property", propertyRouter);
app.use("/category", categoryRouter);
app.use("/image", imageRouter);

app.listen(config.PORT, "0.0.0.0", () => {
  console.log(`server is listening on port ${config.PORT}`);
});
