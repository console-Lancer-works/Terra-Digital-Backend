require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const sequelize = require("./util/database");

const appRoutes = require("./routes/frontend");

const errorHandler = require("./util/errors");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, AuthorizationToken"
  );
  next();
});

app.use("/api/v1/app", appRoutes);

app.use(errorHandler.invalidEndPoint);

app.use((error, request, response, next) => {
  return response.status(250).json(errorHandler.makeErrorResponse(error));
});

let PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server started at portt: ${PORT}`);
    });
    console.clear();
  })
  .catch((err) => console.log(err));
