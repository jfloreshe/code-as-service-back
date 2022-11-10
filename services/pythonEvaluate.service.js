const { spawn } = require('child_process');
const path = require('path');

class PythonEvaluateService{
    generateFile(my_code,correlativo){
        return new Promise((resolve, reject) => {
            let buffer = "";
            let errorBuffer = "";
            let command = spawn(path.join(__dirname, '../scripts/fillCode.sh'), [`${my_code}`, path.join(__dirname, `../public/${correlativo}.py`)]);            
            command.stdout.on('data', (data) => {
                buffer += data;
            });
              
            command.stderr.on('data', (data) => {
                errorBuffer += data;
            });
            
            command.on('close', (code) => {
                if (code != 0){
                    return reject({error:`generating python script had an error with code: ${code}`,traza:errorBuffer})
                }
                resolve(correlativo + 1);
            });
        })
    }
    evaluateCode(correlativo){
        return new Promise((resolve, reject) => {
            let buffer = "";
            let errorBuffer = "";
            let command = spawn('python', [path.join(__dirname, `../public/${correlativo}.py`)]);
            command.stdout.on('data', (data) => {
                buffer += data;
            });
              
            command.stderr.on('data', (data) => {
                errorBuffer += data;
            });
            
            command.on('close', (code) => {
                if (code != 0){
                    return reject({error:`executing python script had an error with code: ${code}`, traza:errorBuffer})
                }
                resolve(buffer);
            });
        })
    }
    deleteFile(correlativo){
        return new Promise((resolve, reject) => {
            let buffer = "";
            let errorBuffer = "";
            let command = spawn('rm', [path.join(__dirname, `../public/${correlativo}.py`)]);
            command.stdout.on('data', (data) => {
                buffer += data;
            });
              
            command.stderr.on('data', (data) => {
                errorBuffer += data;
            });
            
            command.on('close', (code) => {
                if (code != 0){
                    return reject({error:`deleting python script had an error with code ${code}`,traza:errorBuffer})
                }
                resolve(buffer);
            });
        })
    }
}

module.exports = PythonEvaluateService;