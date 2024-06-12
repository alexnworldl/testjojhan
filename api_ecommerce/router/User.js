import routerx from "express-promise-router"
import usercontroller from "../controllers/UserController"
import auth from "../middlewares/auth";
const router = routerx();
//http://localhost:3000/api/users/register
//http://localhost:3000/api/users/update


router.post("/register",usercontroller.register);
router.post("/register_admin",auth.verifyAdmin,usercontroller.register_admin);
router.put("/update",usercontroller.update);
router.get("/list",auth.verifyAdmin,usercontroller.list);
router.post("/login",usercontroller.login);
router.post("/login_admin",usercontroller.login_admin);
router.delete("/delete",usercontroller.remove);
export default router;