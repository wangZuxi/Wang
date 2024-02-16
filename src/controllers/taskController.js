const model = require("../models/taskModel.js"); // where all my beautiful glorious sql statements are stored


module.exports.createNewTask = (req, res, next) =>
{
    if(req.body.title === undefined || req.body.description === undefined || req.body.points == undefined)
    {
        res.status(400).json({message:"Error 400 Bad Request: Please define Task properly >:("});
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        if (error) {
            if(error.message === 'Error 409 Conflict: title or description already exists >:('){
                // refer to TaskModel.js, line 17
                res.status(409).json({error: error.message}); 
            }
            else{
                console.error("Error createNewTask:", error);
                res.status(500).json(error); // for handling other errors
            }
        }
        else{
            res.status(201).json(results[1][0]); // displays the created Task, along with its id
        }
    }

    model.insertSingle(data, callback); // return data with request stuff and callback function
}


module.exports.readAllTask = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) { // for other errors :(
            console.error("Error readAllTask:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results); // Success (Hopefully) :) 200 status ok
    }

    model.selectAll(callback); //Returns callback function, no data required no sir-ry
}


module.exports.readTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.id
    }// from parameters set on the link e.g. localhost:3000/Task/1, where 1 is the parameter or arguement

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error); // for handling other errors
        } else {
            if(results.length === 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404: Task not found :(("
                });
            }
            else {
                res.status(200).json(results[0]);
            }
        }
    }

    model.selectById(data, callback);
}


module.exports.updateTaskById = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).json({
            message: "Please define task properly :/"
        });
        return;
    }

    const data = {
        task_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            if(error.message === 'Error 409 Conflict: Task already exists >:('){
                // refer to TaskModel.js, line 69 nice
                res.status(409).json({error: error.message}); 
            }else{
            console.error("Error createNewTask:", error);
            res.status(500).json(error); // for handling other errors
            }
        }else {
            if(results[1] == 0) // no rows in table were affected :/
            {
                res.status(404).json({
                    message: "Error 404: Task id not found :("
                });
            }
            else{
                res.status(200).json(results[1][0]); // 200 OK
            }
        }
    }

    model.updateById(data, callback);
}


module.exports.deleteTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.id
// getting id from route given e.g. http://localhost:3000/task/1, where 1 is req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) { // for handling other errors :/
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) // no rows in table were affected
            {
                res.status(404).json({
                    message: "Error 404: Task not found :("
                });
            }else {
                res.status(204).send();
            } // 204 No Content. Code works!...............hopefully :/
        }
    }

    model.deleteById(data, callback);
}

// ===========================Middleware here=======================================================
module.exports.createNewTaskCheck = (req, res, next) =>
{
    const data = {
        title: req.body.title,
        description: req.body.description
    }// Some stuff from request body

    const callback = (error, results, fields) => {

        if(results.length > 0){
            // refer to TaskModel.js, line 17
            res.status(409).json({
                message: 'Error 409 Conflict: Task title or description already exists inside the database! >:('
            }); 
        }
        else{
            next();
        }
    }
    model.insertSingleCheck(data, callback); // return data with request stuff and callback function
}

module.exports.updateTaskByIdCheck = (req, res, next) =>
{
    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }// Some stuff from request body

    const callback = (error, results, fields) => {

        if(results.length > 0){
            res.status(409).json({
                message: 'Error 409 Conflict: Task title or description already exists! >:('
            }); 
        }
        else{
            next();
        }
    }
    model.updateByIdCheck(data, callback); // return data with request stuff and callback function
}
// =================================================================================================