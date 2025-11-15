import express from "express";
import cors from "cors";
import customersRouter from "./routes/customers.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/customers", customersRouter);

app.listen(4000, () => console.log("API running on http://localhost:4000"));
