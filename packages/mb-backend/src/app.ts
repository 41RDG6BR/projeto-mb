import express from "express";
import cors from "cors";
import { getRegistros, adicionarRegistro, removerRegistro } from "./controllers/registroController";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/registros", getRegistros);
app.post("/registros", adicionarRegistro);
app.delete("/registros/:id", removerRegistro);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
