import express from "express"
var router = express.Router();
import locationController from '../app/controller/LocationController'

router.get('/create',locationController.create)
router.get('/',locationController.showAll)

export default router