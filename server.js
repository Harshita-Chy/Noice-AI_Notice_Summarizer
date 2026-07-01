require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const Notice = require("./models/Notice");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/notices", async (req, res) => {
  try {
    const category = req.query.category;
    let query = {};

    if (category) {
      query.category = category;
    }

    // Ensure notices are returned newest first
    const notices = await Notice.find(query)
      .sort({ createdAt: -1 });

    res.json(notices);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
});

app.get("/latest", async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(notices);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.get("/notice/:id", async (req, res) => {
  try {

    const notice =
      await Notice.findById(
        req.params.id
      );

    res.json(notice);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
