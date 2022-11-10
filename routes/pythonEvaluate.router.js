const express = require('express');
const PythonEvaluateService = require ('../services/pythonEvaluate.service')
const router = express.Router();

const pythonEvaluateService = new PythonEvaluateService();
var correlativo = 0;
router.post('/', async (req, res) => {
    try{
        let body = req.body;
        let temp_correlativo = correlativo;
        await pythonEvaluateService.generateFile(body.code, correlativo).then(correlativo++);        
        let result = await pythonEvaluateService.evaluateCode(temp_correlativo);
        await pythonEvaluateService.deleteFile(temp_correlativo)
        res.json(200,{result});
    }
    catch(e){
        res.json(500,{error:e.error, traza:e.traza});
    }
    
});

module.exports = router;