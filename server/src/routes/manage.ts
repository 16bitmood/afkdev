import { Router } from 'express';

import { isLoggedIn } from '../session';
import { BadRequest } from '../errors';

import { makeApp } from '../webapps';

import { setSessionApp } from '../session';

const router = Router();


router.get('/manage/create/:appName', (req,res) => {
    if (!isLoggedIn(req)) {
        throw new BadRequest('Client must be logged in to access /manage');
    }

    const appName = req.params.appName;
    const app = makeApp(appName);
    const appId = app.id;
    setSessionApp(req, app.id, app);

    res.json({appId});
});

export { router as manage };