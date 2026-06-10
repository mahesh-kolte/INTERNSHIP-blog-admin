 const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/configdb");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Blog API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});