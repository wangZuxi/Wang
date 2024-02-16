const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
        const SQLSTATEMENT = `
            INSERT INTO Tool (name, description, cost)
            VALUES (?, ?, ?);

            SELECT * FROM Tool
            WHERE name = ?;
        `;
        const VALUES = [data.name, data.description, data.cost, data.name];

        pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Tool;
    `;// Short and simple :)

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Tool
        WHERE tool_id = ?;
    `;// Just abit less short and simple :)
    const VALUES = [data.tool_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE Tool
        SET cost = ?
        WHERE tool_id = ?;
        
        SELECT * FROM Tool
        WHERE tool_id = ?;            
    `;
    // Update tool, and then display the updated tool
    const VALUES = [data.cost, data.tool_id, data.tool_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Tool
    WHERE tool_id = ?;

    ALTER TABLE Tool AUTO_INCREMENT = 1;
    `;// delete tool from database with the given id
    const VALUES = [data.tool_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ===================================MiddleWare here===========================================================

module.exports.insertSingleCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM Tool
        WHERE name = ? OR description = ?;

        SELECT * FROM Tool
        WHERE name = ?
    `;// Checking if values are already in database
    const DUPEVALUES = [data.name, data.description, data.name];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback);
}
// =============================================================================================================