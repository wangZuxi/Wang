const model = require("../models/questRecordsModel.js"); // where all my beautiful glorious sql statements are stored


module.exports.createNewQuestRecords = (req, res, next) =>
{
    if(req.body.survivor_id == 0 || req.body.quest_id == 0 || req.body.completion_date == 0)
    {
        res.status(400).json({
            message:"Error 400 Bad Request: Please define quest record properly >:("
        });
        return;
    }

    const data = {
        survivor_id: req.body.survivor_id,
        quest_id: req.body.quest_id,
        notes: req.body.notes,
        completion_date: req.body.completion_date
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewQuest:", error);
            res.status(500).json(error); // for handling other errors
        }
        else{
            if(results.length == 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Quest or Survivor not found :(("
                });
            }
            else {
                res.status(201).json(results[1][results[1].length - 1]);
            }
        }
    }

    model.insertSingle(data, callback); // return data with request stuff and callback function
}


module.exports.readQuestRecordsById = (req, res, next) =>
{
    const data = {
        sid: req.params.id
    }// from parameters set on the link e.g. localhost:3000/quest_record/1, where 1 is the parameter or arguement

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestRecordById:", error);
            res.status(500).json(error); // for handling other errors
        } else {
            if(results.length == 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Quest records not found :(("
                });
            }
            else {
                res.status(200).json(results);
            }
        }
    }

    model.selectById(data, callback);
}


module.exports.updateQuestRecordsById = (req, res, next) =>
{
    if(req.body.notes == undefined)
    {
        res.status(400).json({
            message: "Error 400 Bad Request: Please define quest record properly :/"
        });
        return;
    }

    const data = {
        qrecord_id: req.params.id,
        notes: req.body.notes
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewQuest:", error);
            res.status(500).json(error); // for handling other errors
        }else {
            if(results[1] == 0) // no rows in table were affected :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Quest record not found :("
                });
            }
            else{
                res.status(200).json(results[1][0]); // 200 OK
            }
        }
    }

    model.updateById(data, callback);
}

// ===============================Middleware Here=============================================
module.exports.createNewQuestRecordsCheck = (req, res, next) =>
{
    const data = {
        survivor_id: req.body.survivor_id,
        quest_id: req.body.quest_id
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        
        if(results[0].length == 0 || results[1].length == 0) // no results were found :/
        {
            res.status(404).json({
                message: "Error 404 Not Found: Quest not found :(("
            });
            return;
        }
        else{
            next();
        }
        
    }
    model.insertSingleCheck(data, callback); // return data with request stuff and callback function
}

// ===========================================================================================