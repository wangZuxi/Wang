const model = require("../models/taskProgressModel.js"); // where all my beautiful glorious sql statements are stored


module.exports.createNewTaskProgress = (req, res, next) =>
{
    if(req.body.user_id === undefined || req.body.task_id === undefined || req.body.completion_date === undefined)
    {
        res.status(400).json({message:"Error 400 Bad Request: Please define Task Progress properly >:("});
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date, 
        notes: req.body.notes
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        if (error) {
            if(error.message === 'Error 404 Not Found: user_id or task_id does not exist :/'){
                // refer to taskProgressModel.js, line 20
                res.status(404).json({error: error.message}); 
            }
            else{
                console.error("Error createNewUser:", error);
                res.status(500).json(error); // for handling other errors
            }
        } 
        else {
            res.status(200).json(results[1][results[1].length-1]); // displays the most recent task that user has done
        }
    }

    model.insertSingle(data, callback); // return data with request stuff and callback function
}


module.exports.readTaskProgressById = (req, res, next) =>
{
    const data = {
        user_id: req.params.id
    }// from parameters set on the link e.g. localhost:3000/task_progress/1, where 1 is the parameter or arguement

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskProgressById:", error);
            res.status(500).json(error); // for handling other errors
        } else {
            if(results.length == 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Task Progress not found :(("
                });
            }
            else {
                res.status(200).json(results);
            }
        }
    }

    model.selectById(data, callback);
}


module.exports.updateTaskProgressById = (req, res, next) =>
{
    if(req.body.notes == undefined)
    {
        res.status(400).json({
            message: "Error 400 Bad Request: Please define notes properly :/"
        });
        return;
    }

    const data = {
        progress_id: req.params.id,
        notes: req.body.notes
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTaskProgress:", error);
            res.status(500).json(error); // for handling other errors
        }
        else{
            if(results[0].affectedRows === 0) // no rows in table were affected
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Task Progress not found :("
                });
            }else {
                res.status(200).json(results[1][0]);
            } // 204 No Content. Code works!...............hopefully :/
        }
    }

    model.updateById(data, callback);
}


module.exports.deleteTaskProgressById = (req, res, next) =>
{
    const data = {
        progress_id: req.params.id
// getting id from route given e.g. http://localhost:3000/taskProgress/1, where 1 is req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) { // for handling other errors :/
            console.error("Error deleteTaskProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) // no rows in table were affected
            {
                res.status(404).json({
                    message: "Error 404 Not Found: TaskProgress not found :("
                });
            }else {
                res.status(204).send();
            } // 204 No Content. Code works!...............hopefully :/
        }
    }

    model.deleteById(data, callback);
}


// ===============================Middleware Here=============================================
module.exports.createNewTaskProgressCheck = (req, res, next) =>
{
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        if(results[0] == '' || results[1] == ''){
            res.status(404).json({
                message: 'Error 404 Not Found: user_id or task_id does not exist :/'
            }); 
        }
        else{
            next();
        }
    }

    model.insertSingleCheck(data, callback); // return data with request stuff and callback function
}
// ===========================================================================================