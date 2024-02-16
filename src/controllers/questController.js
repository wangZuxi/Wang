const model = require("../models/questModel.js"); // where all my beautiful glorious sql statements are stored


module.exports.createNewQuest = (req, res, next) =>
{
    if(req.body.title == 0 || req.body.description == 0 || isNaN(req.body.reward) || req.body.reward == 0)
    {
        res.status(400).json({message:"Error 400 Bad Request: Please define quest properly >:("});
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        required_tools: req.body.required_tools,
        reward: req.body.reward
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewQuest:", error);
            res.status(500).json(error); // for handling other errors
            
        }
        else{
            res.status(201).json(results[1][0]); // displays the created Quest, along with its id
        }
    }
    model.insertSingle(data, callback); // return data with request stuff and callback function
}


module.exports.readAllQuest = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) { // for other errors :(
            console.error("Error readAllQuest:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results); // Success (Hopefully) :) 200 status ok
    }
    model.selectAll(callback); //Returns callback function, no data required no sir-ry
}


module.exports.readQuestById = (req, res, next) =>
{
    const data = {
        quest_id: req.params.id
    }// from parameters set on the link e.g. localhost:3000/quest/1, where 1 is the parameter or arguement

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestById:", error);
            res.status(500).json(error); // for handling other errors
        } else {
            if(results.length == 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Quest not found :(("
                });
            }
            else {
                res.status(200).json(results[0]);
            }
        }
    }
    model.selectById(data, callback);
}


module.exports.updateQuestById = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.reward == undefined)
    {
        res.status(400).json({
            message: "Error 400 Bad Request: Please define quest properly :/"
        });
        return;
    }

    const data = {
        quest_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        required_tools: req.body.required_tools,
        reward: req.body.reward
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewQuest:", error);
            res.status(500).json(error); // for handling other errors
        }
        else {
            if(results[1] == 0) // no rows in table were affected :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Quest not found :("
                });
            }
            else{
                res.status(200).json(results[1][0]); // 200 OK
            }
        }
    }
    model.updateById(data, callback);
}


module.exports.deleteQuestById = (req, res, next) =>
{
    const data = {
        quest_id: req.params.id
// getting id from route given e.g. http://localhost:3000/quest/1, where 1 is req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) { // for handling other errors :/
            console.error("Error deleteQuestById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) // no rows in table were affected
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Quest not found :("
                });
            }else {
                res.status(204).send();
            } // 204 No Content. Code works!...............hopefully :/
        }
    }
    model.deleteById(data, callback);
}


// ===============================Middleware Here=============================================
module.exports.createNewQuestCheck = (req, res, next) =>
{
    const data = {
        title: req.body.title,
        description: req.body.description
    }// Some stuff from request body

    const callback = (error, results, fields) => {        
        if(results[0].length > 0){
            res.status(409).json({
                message: 'Error 409 Conflict: Title or description already exists >:('
            }); 
        }
        else{
            next();
        }  
    }
    model.insertSingleCheck(data, callback); // return data with request stuff and callback function
}

module.exports.updateQuestByIdCheck = (req, res, next) =>
{
    if(req.body.required_tools == undefined)
    {
        res.status(400).json({message:"Error 400 Bad Request: Please define quest properly >:("});
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        required_tools: req.body.required_tools,
        reward: req.body.reward
    }// Some stuff from request body

    const callback = (error, results, fields) => {

        let tools;
        let counter = 0
        if(data.required_tools.length != 0){
            tools = data.required_tools.split(/,|,+ /gi); // Regex is AWESOME OH YEAH
            for(let i = 0; i < tools.length; i++){ // runs through required tools
                for(let j = 0; j < results[1].length; j++){ // runs through all tools
                    if(tools[i] == results[1][j].name){counter += 1;}
                }
            }
            if(counter != tools.length){
                res.status(404).json({
                    message: 'Error 404 Not Found: Required tool(s) could not be found in tools list :/'
                }); 
                return;
            }
        }

        if(results[0].length > 0){
            res.status(409).json({
                message: 'Error 409 Conflict: title or description already exists >:('
            }); 
        }
        else{
            next();
        }
    }
    model.updateByIdCheck(data, callback);
}
// ===========================================================================================