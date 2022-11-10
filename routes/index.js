const express = require('express');

const pythonEvaluateRouter = require('./pythonEvaluate.router');

function routerApi(app){
    const router = express.Router();
    app.use(router);

    router.use('/evaluatepython', pythonEvaluateRouter);
}

module.exports = routerApi;