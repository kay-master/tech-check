import express from "express";
import compression from "compression";
import helmet from "helmet";
import routes from "./routes";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("ENV", process.env.NODE_ENV);

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

routes(app);

export default app;
