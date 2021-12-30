import  express from "express"
var router = express.Router();
import userController from "../app/controller/UserController"
import getUserMiddleware from '../middleware/getUserMiddleware'

//Getting all
router.get("/", userController.getAll);
//Getting one
router.get("/:id", userController.getOne);
//Creating one
router.post("/", userController.create);
//update one
router.patch("/:id",getUserMiddleware, userController.update);
//Delete one
router.delete("/:id",getUserMiddleware, userController.delete);



export default router
