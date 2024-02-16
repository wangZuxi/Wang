const model = require("../models/toolModel.js"); // where all my beautiful glorious sql statements are stored


module.exports.createNewTool = (req, res, next) =>
{
    if(req.body.name == undefined || req.body.description == undefined || req.body.cost == undefined)
    {
        res.status(400).json({
            message:"Error 400 Bad Request: Please define tool properly >:("
        });
        return;
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        if (error) {
            if(error.code == "ER_WARN_DATA_OUT_OF_RANGE"){
                res.status(400).json({
                    message: "Error 400 Bad Request: That's way too expensive for any tool!"
                });// While messing around with my code, I seem to have found a limit for the cost you can put in mysql.
                // The max for cost you can put is apparently 2147483647 chips
                // This cost took me a painstakingly long time to figure out
                // Can you imagine? ten straight minutes of typing, checking, deleting.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.type.check.delete.
                // Such a strange number too. why, mysql developers, why?

                // If the survivor wants more chips, we can change the value from 'int' to 'bigint'.
                // But I doubt any tool would go for higher than 2147483647 chips
            }
            else{
                console.error("Error createNewTool:", error);
                res.status(500).json(error); // for handling other errors
            }
        }
        else{
            res.status(201).json(results[1][0]); // displays the created Tool, along with its id
        }
    }

    model.insertSingle(data, callback); // return data with request stuff and callback function
}


module.exports.readAllTool = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) { // for other errors :(
            console.error("Error readAllTool:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results); // Success (Hopefully) :) 200 status ok
    }

    model.selectAll(callback); //Returns callback function, no data required no sir-ry
}


module.exports.readToolById = (req, res, next) =>
{
    const data = {
        tool_id: req.params.id
    }// from parameters set on the link e.g. localhost:3000/tool/1, where 1 is the parameter or arguement

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readToolById:", error);
            res.status(500).json(error); // for handling other errors
        } else {
            if(results.length == 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Tool not found :(("
                });
            }
            else {
                res.status(200).json(results[0]);
            }
        }
    }

    model.selectById(data, callback);
}


module.exports.updateToolById = (req, res, next) =>
{
    if(req.body.cost == undefined)
    {
        res.status(400).json({
            message: "Error 400 Bad Request: Please define tool properly :/"
        });
        return;
    }

    const data = {
        tool_id: req.params.id,
        cost: req.body.cost
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            if(error.code == "ER_WARN_DATA_OUT_OF_RANGE"){
                res.status(400).json({
                    message: "Error 400 Bad request: That's way too expensive for any tool!"
                });
            }else{
                console.error("Error createNewTool:", error);
                res.status(500).json(error); // for handling other errors
            }
        }
        else {
            if(results[1] == 0) // no rows in table were affected :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Tool not found :("
                });
            }
            else{
                res.status(200).json(results[1][0]); // 200 OK
            }
        }
    }

    model.updateById(data, callback);
}


module.exports.deleteToolById = (req, res, next) =>
{
    const data = {
        tool_id: req.params.id
// getting id from route given e.g. http://localhost:3000/tool/1, where 1 is req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) { // for handling other errors :/
            console.error("Error deleteToolById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) // no rows in table were affected
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Tool not found :("
                });
            }else {
                res.status(204).send();
            } // 204 No Content. Code works!...............hopefully :/
        }
    }

    model.deleteById(data, callback);
}

// ===================================MiddleWare here===========================================================
module.exports.createNewToolCheck = (req, res, next) =>
{
    const data = {
        name: req.body.name,
        description: req.body.description
    }// Some stuff from request body

    const callback = (error, results, fields) => {
            if(results[0].length > 0){
                res.status(409).json({message: 'Error 409 Conflict: Tool name or description already exists >:('}); 
            }
            else{
                next();
            }
        }
    model.insertSingleCheck(data, callback); // return data with request stuff and callback function
}
// =============================================================================================================