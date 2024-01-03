import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { registroRoutes } from "./routes/registroRoutes";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/registros", registroRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
