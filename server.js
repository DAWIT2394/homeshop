const cors = require("cors");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const connectDB = require("./db/connect.js");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoutes.js");
const shopRouter = require("./routes/shopRoutes.js");
const productRouter = require("./routes/ProductRoutes.js"); // Fixed comment

// Middleware
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");
const orderRouter = require('./routes/orderRoutes');
const views = path.join(__dirname, "view");

// Route for homepage
app.get("/", (req, res) => {
  res.sendFile(`${views}/index.html`);
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("views"));
app.use(cookieParser(process.env.JWT_SECRET));

// Route handling
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/shops", shopRouter);
app.use("/api/v1/products", productRouter); // Fixed the route path for products
app.use("/api/v1/orders", orderRouter); // Mount the order routes

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
