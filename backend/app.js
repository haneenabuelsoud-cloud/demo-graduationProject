import express from "express";
import morgan from "morgan";
import ownerRouter from "./routes/ownerRouter.js";
import petRouter from "./routes/petRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/pet/user", ownerRouter);
app.use("/pet/pets", petRouter);
app.use("/pet/appointments", appointmentRouter);

export default app;
