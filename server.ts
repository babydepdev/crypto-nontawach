import express, { Express } from "express";
import dotenv from "dotenv";
import { readdirSync } from "fs";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config();

const PORT = process.env.SERVER_PORT;

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

readdirSync("./routes").forEach(async (file) => {
  const route = await import(`./routes/${file}`);
  app.use("/api/v1", route.default);
});

app.listen(PORT, () => {
  console.log("\x1b[32m[OK] : Server is running . . . \x1b[0m");
});
