const model = require("../models/purchaseRecordsModel.js"); // where all my beautiful glorious sql statements are stored


module.exports.createNewPurchaseRecords = (req, res, next) =>
{
    if(req.body.survivor_id == undefined || req.body.tool_id == undefined || req.body.quantity == undefined || req.body.transaction_date == undefined)
    {
        res.status(400).send("Error 400 Bad Request: Please define purchase record properly >:(");
        return;
    }

    const data = {
        survivor_id: req.body.survivor_id,
        tool_id: req.body.tool_id,
        quantity: req.body.quantity,
        transaction_date: req.body.transaction_date
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPurchaserecords:", error);
            res.status(500).json(error); // for handling other errors
        }
        else{
            res.status(201).json(results[1][results[1].length - 1]);
        }
    }

    model.insertSingle(data, callback); // return data with request stuff and callback function
}


module.exports.readPurchaseRecordsById = (req, res, next) =>
{
    const data = {
        precord_id: req.params.id
    }// from parameters set on the link e.g. localhost:3000/purchase_record/1, where 1 is the parameter or arguement

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPurchaseRecordById:", error);
            res.status(500).json(error); // for handling other errors
        } else {
            if(results.length == 0) // no results were found :/
            {
                res.status(404).json({
                    message: "Error 404 Not Found: Purchase record not found :(("
                });
            }
            else {
                res.status(200).json(results[0]);
            }
        }
    }

    model.selectById(data, callback);
}

// ===================Middleware here==================================================================
module.exports.createNewPurchaseRecordsCheck = (req, res, next) =>
{
    const data = {
        survivor_id: req.body.survivor_id,
        tool_id: req.body.tool_id,
        quantity: req.body.quantity,
        transaction_date: req.body.transaction_date
    }

    const callback = (error, results, fields) => {
        if(results[5] == 0 || results[0] == 0){
            res.status(404).json({message: 'Error 404 Not Found: Tool or survivor does not exist :('}); 
            return;
        }

        if(data.quantity < 1){
            res.status(400).json({message: 'Error 400 Bad Request: Please purchase something :/'}); 
            return;
        }
        
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
        let total_cost = 0;
        for(let i = 0; i < results[3].length; i++){ // runs through tools
            if(results[3][i].tool_id === data.tool_id){ //matching tool ids
                total_cost += (results[3][i].cost * data.quantity); //calculating total cost...
            }
        }

        if(total_chips < total_cost){
            res.status(404).json({message: 'Error 404 Not Found: Survivor does not have the funds for this purchase :/'}); 
        }
        else{
            next();
        }
    }

    model.insertSingleCheck(data, callback); // return data with request stuff and callback function
}
// ====================================================================================================