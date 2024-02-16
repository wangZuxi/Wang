const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO Taskprogress (user_id, task_id, completion_date, notes)
        VALUES (?, ?, ?, ?);
        
        SELECT * FROM Taskprogress
        WHERE user_id = ?;
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Taskprogress
        WHERE user_id = ?;
    `;// short and simple :)
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
        UPDATE Taskprogress 
        SET notes = ?
        WHERE progress_id = ?;
        
        SELECT * FROM Taskprogress
        WHERE progress_id = ?;  
    `;
    const VALUES = [data.notes, data.progress_id, data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
        DELETE FROM Taskprogress 
        WHERE progress_id = ?;

        ALTER TABLE Taskprogress AUTO_INCREMENT = 1;
    `;// delete Taskprogress from database with the given id
    const VALUES = [data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ===============================Middleware Here=============================================
module.exports.insertSingleCheck = (data, callback) =>
{
    const CHECKSTATEMENT = `
        SELECT * FROM User
        WHERE user_id = ?;

        SELECT * FROM Task
        WHERE task_id = ?;
    `;// Checking if values are in database
    const CHECKVALUES = [data.user_id, data.task_id];

    pool.query(CHECKSTATEMENT, CHECKVALUES, callback)
}

// ===========================================================================================