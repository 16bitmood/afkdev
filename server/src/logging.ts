import type {Request, Response, NextFunction} from 'express';
import { IN_PROD } from './config';

function devLogger(req: Request, res: Response, next: NextFunction) {
    const sess = req.sessionID || 'LoggedOut';
    console.log(`[${sess}]: ${req.url} ${req.method} ${req.body != {} ? req.body : ''}`);
    next();
}

function prodLogger(req: Request, res: Response, next: NextFunction) {
    throw new Error('Not Implemented Yet!');
}

export let logger: (req: Request, res: Response, next: NextFunction) => void ;

if (IN_PROD) {
    logger = prodLogger;
} else {
    logger = devLogger;
}