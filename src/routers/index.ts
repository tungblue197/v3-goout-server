import { Router } from "express";
// import { checkAuth } from "../middlewares/auth";
// import authRouter from './auth.router';
import userRotuer from './user.router';
const router = Router();

// router.use(authRouter);

router.use('/api' ,userRotuer);

export default router;