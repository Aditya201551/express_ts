import express, { Express } from "express";
import { serverConfig } from "./server-config";
import { ownerRouter } from "./owner/owner.routes";
import { dogRouter } from "./dog/dog.routes";

const app: Express = express();
const port = serverConfig.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello!");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.use("/api/owners", ownerRouter);
app.use("/api/dogs", dogRouter);

app.listen(port, () => {
  return console.info("app running on http://localhost:3000");
});
