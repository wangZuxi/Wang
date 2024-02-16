const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO Quest (title, description, required_tools, reward)
        VALUES (?, ?, ?, ?);

        SELECT * FROM Quest
        WHERE title = ?;
    `;
    const VALUES = [data.title, data.description, data.required_tools, data.reward, data.title];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Quest;
    `;// Short and simple :)

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Quest
        WHERE quest_id = ?;
    `;// Just abit less short and simple :)
    const VALUES = [data.quest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE Quest
        SET title = ?, description = ?, required_tools = ?, reward = ?
        WHERE quest_id = ?;
        
        SELECT * FROM Quest
        WHERE quest_id = ?;            
    `;
    // Update user, and then display the updated user
    const VALUES = [data.title, data.description, data.required_tools, data.reward, data.quest_id, data.quest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Quest
    WHERE quest_id = ?;

    ALTER TABLE Quest AUTO_INCREMENT = 1;
    `;// delete user from database with the given id
    const VALUES = [data.quest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// ===============================Middleware Here=============================================
module.exports.insertSingleCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM Quest
        WHERE title = ? OR description = ?;

        SELECT * FROM Tool;
    `;// Checking if values are already in database
    // Checking if required tools are inside tool list
    const DUPEVALUES = [data.title, data.description];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback);
}

module.exports.updateByIdCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM Quest
        WHERE title = ? AND description = ? AND required_tools = ? AND reward = ?;

        SELECT * FROM Tool;
    `;// Checking if values are already in database
    const DUPEVALUES = [data.title, data.description, data.required_tools, data.reward];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback);
}
// ===========================================================================================