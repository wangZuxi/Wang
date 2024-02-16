const model = require("../models/survivorModel.js"); // where all my beautiful glorious sql statements are stored


module.exports.createNewSurvivor = (req, res, next) =>
{
    if(req.body.name === undefined||req.body.user_id === undefined)
    {
        res.status(400).json({message:"Error 400 Bad Request: Please define survivor properly >:("});
        return;
    }

    const data = {
        name: req.body.name,
        user_id:req.body.user_id
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewSurvivor:", error);
            res.status(500).json(error); // for handling other errors
        }
        else{
            res.status(201).json(results[1][0]); // displays the created Survivor, along with its id
        }
    }

    model.insertSingle(data, callback); // return data with request stuff and callback function
}

module.exports.login = (req, res, next) =>
{
    if(req.body.name == 0||req.body.user_id == 0)
    {
        res.status(400).json({message: "Name is undefined"});
        return;
    }

    const data = {
        name: req.body.name,
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error survivorLogin:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0){
                res.status(404).json({message:'Survivor could not be found in your database'});
            }else{
                res.status(200).json(results[0])
            }
        }
    }

    model.login(data, callback);
}

module.exports.readAllSurvivor = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) { // for other errors :(
            console.error("Error readAllSurvivor:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results); // Success (Hopefully) :) 200 status ok
    }

    model.selectAll(callback); //Returns callback function, no data required no sir-ry
}


module.exports.readSurvivorById = (req, res, next) =>
{
    const data = {
        survivor_id: req.params.id
    }// from parameters set on the link e.g. localhost:3000/Survivor/1, where 1 is the parameter or arguement

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readSurvivorById:", error);
            res.status(500).json(error); // for handling other errors
        } else {
            if(results[0].length == 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Survivor not found :(("
                });
            }
            else {
                let total_chips = 0;
                for(let i = 0; i < results[2].length; i++){ // runs through task progress
                    for(let j = 0; j < results[1].length; j++){ // runs through tasks
                        if(results[2][i].quest_id === results[1][j].quest_id){ //matching task ids
                            total_chips += results[1][j].reward; //adding chips from quests
                        }
                    }
                }
                for(let i = 0; i < results[4].length; i++){ // runs through purchase records
                    for(let j = 0; j < results[3].length; j++){ // runs through all tools
                        if(results[4][i].tool_id == results[3][j].tool_id){ //matching tool ids
                            total_chips -= (results[3][j].cost * results[4][i].quantity); //deducting chips from all purchases
                        }
                    }
                }
                results[0][0].total_chips = total_chips;

                let inv = [];
                for(let i = 0; i < results[4].length; i++){ // runs through purchase records
                    for(let j = 0; j < results[3].length; j++){ // runs through all tools
                        if(results[4][i].tool_id == results[3][j].tool_id){ //matching tool ids
                            inv.push(results[3][j].name); //deducting chips from all purchases
                        }
                    }
                }
                results[0][0].inventory = inv.join(', ');
                res.status(200).json(results[0][0]);
            }
        }
    }

    model.selectById(data, callback);
}


module.exports.updateSurvivorById = (req, res, next) =>
{
    if(req.body.name == 0)
    {
        res.status(400).json({
            message: "Error 400 Bad Request: Please define survivor name properly :/"
        });
        return;
    }

    const data = {
        survivor_id: req.params.id,
        name: req.body.name
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewSurvivor:", error);
            res.status(500).json(error); // for handling other errors
        }
        else {
            if(results[1] == 0) // no rows in table were affected :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Survivor not found :("
                });
            }
            else{
                res.status(200).json(results[1][0]); // 200 OK
            }
        }
    }

    model.updateById(data, callback);
}


module.exports.deleteSurvivorById = (req, res, next) =>
{
    const data = {
        survivor_id: req.params.id
// getting id from route given e.g. http://localhost:3000/Survivor/1, where 1 is req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) { // for handling other errors :/
            console.error("Error deleteSurvivorById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) // no rows in table were affected
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Survivor not found :("
                });
            }else {
                res.status(204).send();
            } // 204 No Content. Code works!...............hopefully :/
        }
    }

    model.deleteById(data, callback);
}


// ===============================Middleware Here=============================================

module.exports.createNewSurvivorCheck = (req, res, next) =>
{
    const data = {
        name: req.body.name,
        user_id: req.body.user_id
    }// Some stuff from request body    

    const callback = (error, results, fields) => {
        
        let total_points = 0;
        for(let i = 0; i < results[3].length; i++){ // runs through task progress
            for(let j = 0; j < results[2].length; j++){ // runs through tasks
                if(results[3][i].task_id === results[2][j].task_id){ //matching task ids
                    total_points += results[2][j].points; //adding points
                }
            }
        }
        total_points -= results[4].length * 250; // each user costs 100 points

        if(results[0].length > 0){
            res.status(409).json({
                message: 'Name already exists >:('
            }); 
        }
        else if(total_points < 250){
            res.status(403).json({
                message: 'User does not have enough points to create a survivor! :('
            }); 
        }
        else{
            next();
        }    
    }

    model.insertSingleCheck(data, callback); // return data with request stuff and callback function
}

module.exports.updateSurvivorByIdCheck = (req, res, next) =>
{
    const data = {
        name: req.body.name
    }// Some stuff from request body    

    const callback = (error, results, fields) => {
        if(results.length > 0){
            // refer to SurvivorModel.js, line 17
            res.status(409).json({
                message: 'Error 409 Conflict: name already exists >:('
            }); 
        }
        else{
            next();
        } 
    }   
    model.updateByIdCheck(data, callback); // return data with request stuff and callback function
}

// ===========================================================================================