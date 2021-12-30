import express from "express"
var router = express.Router();
import authController from '../app/controller/authController'
import limitRate from "../middleware/limitRate";
router.post('/login/',authController.login)
router.post('/token',limitRate(5,0.5),authController.refreshToken)
router.get('/',authController.index)

export default router