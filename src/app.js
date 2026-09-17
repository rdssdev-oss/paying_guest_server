import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import routes from "./routes/index.js";
import swaggerDocs from "./docs/swagger.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Allow only whitelisted origins to make credentialed requests
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools (no origin) and whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Security headers
app.use(helmet());
// Prevent HTTP parameter pollution
app.use(hpp());
// Strip NoSQL injection operators from user input
app.use(mongoSanitize());
// Compress responses for scalability/performance
app.use(compression());

app.use(express.json({ limit: "10kb" }));

// API routes
app.use("/api/v1", routes);

// Swagger Docs
swaggerDocs(app);

// Error handler
app.use(errorHandler);

export default app;

