import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { restoreUser} from "../../utils/auth";

//imports from router files
import userRouter from './users';
import sessionRouter from './session';
import songRouter from './songs';
import commentRouter from './comments';
import { ForbiddenError, NoResourceError, UnauthorizedError } from "../../errors/customErrors";
import csurf from "csurf";
const router = require('express').Router();
const { environment } = require('../../config');
const isProduction = environment === 'production';

//route usage
router.use(restoreUser);
router.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "lax",
            httpOnly: true
        }
    })
);
router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/songs', songRouter);
router.use('/comments', commentRouter);


router.get(
    '/restore-user',
    (req:any, res:Response) => {
        return res.json(req.user);
    }
);



export = router;
