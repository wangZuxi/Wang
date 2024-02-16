const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO Task (title, description, points)
        VALUES (?, ?, ?);
        
        SELECT * FROM Task
        WHERE title = ?;
    `;
    const VALUES = [data.title, data.description, data.points, data.title];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Task;
    `;// Short and simple :)

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Task
        WHERE task_id = ?;
    `;// abit less short and simple :)
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE Task 
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?;
        
        SELECT * FROM Task
        WHERE task_id = ?;            
    `;
    // Update Task, and then display the updated Task
    const VALUES = [data.title, data.description, data.points, data.task_id, data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}


module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Task 
    WHERE task_id = ?;

    ALTER TABLE Task AUTO_INCREMENT = 1;
    `;// delete Task from database with the given id
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ===========================Middleware here=======================================================
module.exports.insertSingleCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM Task
        WHERE title = ? OR description = ?;
    `;// Checking if values are already in database
    const DUPEVALUES = [data.title, data.description];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback)
}

module.exports.updateByIdCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM Task
        WHERE title = ? AND description = ? AND points = ?;
    `;// Checking if values are already in database, or if user has actually changed anything
    const DUPEVALUES = [data.title, data.description, data.points];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback)
}
// =================================================================================================