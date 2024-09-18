const mongoose = require("mongoose");
const express = require("express");
const customers = require("./routes/customers");
const genres = require("./routes/genres");

const app = express();

mongoose
  .connect(
    "mongodb+srv://omwegaenock:enock4501@vidly.enqdf.mongodb.net/vidly?retryWrites=true&w=majority&appName=vidly"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Could not connect to MongoDB"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
