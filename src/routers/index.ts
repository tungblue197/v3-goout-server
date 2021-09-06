import { Router } from "express";
// import { checkAuth } from "../middlewares/auth";
import sessionRouter from './session.router'
import authRouter from './auth.router';
import userRotuer from './user.router';
const router = Router();

router.use(authRouter);

router.use('/api' ,userRotuer);
router.use('/api' ,sessionRouter);

export default router;