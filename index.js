require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(8686, () => {
  console.log("Server running on port 8686");
});
