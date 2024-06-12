import routerx from "express-promise-router"
import productcontroller from "../controllers/ProductController"//ojo con el nombre
import auth from "../middlewares/auth";
import variedadController from '../controllers/VariedadController'

import multyparty from 'connect-multiparty'
import VariedadController from "../controllers/VariedadController";
const router = routerx();
var path = multyparty({uploadDir:'./uploads/product'});
//http://localhost:3000/api/users/register
//http://localhost:3000/api/users/update


router.post("/register",[auth.verifyAdmin,path],productcontroller.register);

router.post("/register_imagen",[auth.verifyAdmin,path],productcontroller.register_imagen);
router.post("/remove_imagen",[auth.verifyAdmin,path],productcontroller.remove_imagen);


router.put("/update",[auth.verifyAdmin,path],productcontroller.update);
router.get("/list",auth.verifyAdmin,productcontroller.list);
router.delete("/delete",auth.verifyAdmin,productcontroller.remove);


router.get("/uploads/product/:img",productcontroller.obtener_imagen);

router.get("/show/:id",productcontroller.show);

//varieda

router.post("/register-variedad",[auth.verifyAdmin,path],variedadController.register);
router.put("/update-variedad",[auth.verifyAdmin,path],variedadController.update);
router.delete("/delete-variedad/:id",[auth.verifyAdmin,path],variedadController.delete);


export default router;