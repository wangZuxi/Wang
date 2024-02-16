const model = require("../models/userModel.js"); // where all my beautiful glorious sql statements are stored


module.exports.createNewUser = (req, res, next) =>
{
    if(req.body.username == 0 || req.body.email == 0 || req.body.password == 0)
    {
        res.status(400).send({
            message: "Please define user properly >:("
        });
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }// Some stuff taken from request body

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error); // for handling other errors
        }
        else{
            res.locals.id = results[1].length
            res.status(201).json(results[1][0]); // displays the created user, along with its id
        }
    }
    model.insertSingle(data, callback); // return data with request stuff and callback function
}

module.exports.login = (req, res, next) =>
{
    if(req.body.username == 0 || req.body.password == 0)
    {
        res.status(400).json({message: "Username or password is undefined"});
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0){
                res.status(404).json({message:'User not found'});
            }else{
                res.locals.hash = results[0].password;
                res.locals.userId = results[0].user_id;
                next();
            }
        }
    }

    model.login(data, callback);
}

module.exports.readAllUser = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) { // for other errors :(
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results); // Success (Hopefully) :) 200 status ok
    }

    model.selectAll(callback); //Returns callback function, no data required no sir-ry
}


module.exports.readUserById = (req, res, next) =>
{
    const data = {
        user_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error); // for handling other errors
        } else {
            if(results[0].length == 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404: User not found :(("
                });
            }
            else {
                let total_points = 0;
                for(let i = 0; i < results[2].length; i++){ // runs through task progress
                    for(let j = 0; j < results[1].length; j++){ // runs through tasks
                        if(results[2][i].task_id === results[1][j].task_id){ //matching task ids
                            total_points += results[1][j].points; //adding points
                        }
                    }
                }
                total_points -= results[3].length * 250; // each survivor costs 100 points
                results[0][0].total_points = total_points;
                res.status(200).json(results[0][0]);
            }
        }
    }

    model.selectById(data, callback);
}


module.exports.updateUserById = (req, res, next) =>
{
    if(req.body.username == 0 || req.body.email == 0)
    {
        res.status(400).json({
            message: "Please define name and level properly :/"
        });
        return;
    }

    const data = {
        user_id: req.params.id,
        username: req.body.username,
        email: req.body.email
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error); // for handling other errors
        }
        else {
            if(results[1] == 0) // no rows in table were affected :/
            {
                res.status(404).json({
                    message: "Error 404: User not found :("
                });
            }
            else{
                res.status(200).json(results[1][0]); // 200 OK
            }
        }
    }

    model.updateById(data, callback);
}


module.exports.deleteUserById = (req, res, next) =>
{
    const data = {
        user_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) { // for handling other errors :/
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) // no rows in table were affected
            {
                res.status(404).json({
                    message: "Error 404: User not found :("
                });
            }else {
                res.status(204).send();
            } // 204 No Content. Code works!...............hopefully :/
        }
    }

    model.deleteById(data, callback);
}

// ===================================MiddleWare here===========================================================

module.exports.createNewUserCheck = (req, res, next) =>
{
    const data = {
        username: req.body.username,
        email: req.body.email
    }// Some stuff from request body

    const callback = (error, results, fields) => {
        if(results.length > 0){
            res.status(409).json({message: 'username or email already exists >:('}); // displays the created user, along with its id
        }
        else{
            if(/[a-z]+@[a-z]+\.+[a-z]/gi.test(data.email)){
                next();
            }
            else{
                res.status(400).json({message: 'Please enter a proper email :/'});
            }
        }
    }

    model.insertSingleCheck(data, callback); // return data with request stuff and callback function
}


module.exports.updateUserByIdCheck = (req, res, next) =>
{
    const data = {
        username: req.body.username,
        email: req.body.email
    }// Moar stuff from data

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error); // for handling other errors
        }
        else {
            if(results.length > 0){
                res.status(409).json({
                    message: 'username or email already exists >:('
                }); // 200 OK
            }
            else{
                next()
            }
        }
    }

    model.updateByIdCheck(data, callback);
}
// ==============================================================================================