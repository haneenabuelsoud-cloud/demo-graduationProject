import { Router } from "express";

import {
  addPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet,
} from "../controllers/petController.js";

import authinticationMiddleware from "../middlewares/authinticationMiddleware.js";

const router = Router();

// Protect all pet routes
router.use(authinticationMiddleware);

// Add Pet
router.post("/", addPet);

// Get All Pets
router.get("/", getAllPets);

// Get Pet By ID
router.get("/:id", getPetById);

// Update Pet
router.put("/:id", updatePet);

// Delete Pet
router.delete("/:id", deletePet);

export default router;
