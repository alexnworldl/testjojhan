import routerx from "express-promise-router"
import categoriacontroller from "../controllers/CategoriaController"
import auth from "../middlewares/auth";

import multyparty from 'connect-multiparty'
const router = routerx();
var path = multyparty({uploadDir:'./uploads/categoria'});
//http://localhost:3000/api/users/register
//http://localhost:3000/api/users/update


router.post("/register",[auth.verifyAdmin,path],categoriacontroller.register);
router.put("/update",[auth.verifyAdmin,path],categoriacontroller.update);
router.get("/list",auth.verifyAdmin,categoriacontroller.list);
router.delete("/delete",auth.verifyAdmin,categoriacontroller.remove);


router.get("/uploads/categoria/:img",categoriacontroller.obtener_imagen);


export default router;