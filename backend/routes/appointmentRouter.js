import { Router } from "express";

import {
  addAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

import authinticationMiddleware from "../middlewares/authinticationMiddleware.js";

const router = Router();

router.use(authinticationMiddleware);

router.post("/", addAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
