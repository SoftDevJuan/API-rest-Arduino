import { Router } from "express";
import { methods as userController } from "./../controllers/Users.controller";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getName);
router.post("/", userController.verifyUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
