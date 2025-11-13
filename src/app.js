import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import swaggerDocs from "./docs/swagger.js";
import errorHandler from "./middlewares/error.middleware.js";
import rateLimit from "express-rate-limit";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(
//   rateLimit({
//     windowMs: 10 * 60 * 1000, // 10 minutes
//     max: 5, // Only 5 login attempts
//     message: "Too many login attempts. Try again later.",
//   })
// );

// API routes
app.use("/api/v1", routes);

// Swagger Docs
swaggerDocs(app);

// Error handler
app.use(errorHandler);

export default app;
