const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

require("./dbs/dbConnect");

app.use(
  cors({
    origin: "",
    methods: "GET, POST, PUT, OPTIONS, DELETE",
  })
);

app.use("", require("./routes"));

app.use((req, res, next) => {
  const error = new Error("Không tồn tại");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "Lỗi server",
    code: statusCode,
    message: error.message || "Lỗi server",
  });
});

module.exports = app;
