const model = require("../models/msgModel.js"); // where all my beautiful glorious sql statements are stored

let day = new Date();
let dateNow = `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()} ${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`

module.exports.createNewMsg = (req, res, next) =>
{
    if(req.body.survivor_id == 0 || req.body.msg == 0 || req.body.msg_date == 0)
    {
        res.status(400).json({message:"Please define Message properly >:("});
        return;
    }
    

    const data = {
        survivor_id: req.body.survivor_id,
        msg: req.body.msg,
        msg_date: dateNow
    }// Some stuff from reMsg body

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewMsg:", error);
            res.status(500).json(error); // for handling other errors
            
        }
        else{
            res.status(201).json(results[1][0]); // displays the created Msg, along with its id
        }
    }
    model.insertSingle(data, callback); // return data with reMsg stuff and callback function
}


module.exports.readAllMsg = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) { // for other errors :(
            console.error("Error readAllMsg:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results); // Success (Hopefully) :) 200 status ok
    }
    model.selectAll(callback); //Returns callback function, no data required no sir-ry
}

module.exports.readById = (req, res, next) =>
{
    const data = {
        user_id: req.params.id
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) { // for other errors :(
            console.error("Error readAllMsg:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results); // Success (Hopefully) :) 200 status ok
    }
    model.selectById(data, callback); //Returns callback function, no data required no sir-ry
}


module.exports.updateMsgById = (req, res, next) =>
{
    if(req.body.msg == undefined)
    {
        res.status(400).json({
            message: "Please define Message properly :/"
        });
        return;
    }

    const data = {
        msg_id: req.params.id,
        msg: req.body.msg,
        msg_date: dateNow
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewMsg:", error);
            res.status(500).json(error); // for handling other errors
        }
        else {
            if(results[1] == 0) // no rows in table were affected :/
            {
                res.status(404).json({
                    message: "Message not found :("
                });
            }
            else{
                res.status(200).json(results[1][0]); // 200 OK
            }
        }
    }
    model.updateById(data, callback);
}


module.exports.deleteMsgById = (req, res, next) =>
{
    const data = {
        msg_id: req.params.id
// getting id from route given e.g. http://localhost:3000/Msg/1, where 1 is req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) { // for handling other errors :/
            console.error("Error deleteMsgById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) // no rows in table were affected
            {
                res.status(404).json({
                    message: "Message not found :("
                });
            }else {
                res.status(204).send();
            } // 204 No Content. Code works!...............hopefully :/
        }
    }
    model.deleteById(data, callback);
}
