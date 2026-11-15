import { Router } from "express";
import { addowner , updateuser } from "../controllers/ownerController.js";
import { signup , login } from "../AuthServices.js";

const router= Router()

router.post("/signup", signup)
router.post("/login", login)

router.put("/id", updateuser)

export default router