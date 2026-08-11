import express from "express";
import router from "./src/routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use('/api', router);
const port = 3000;

app.get('/', (req, res) => {
    res.send("Servidor Rodando!");
});

app.listen(port, () => {
    console.log("Servidor rodando com sucesso!")
});