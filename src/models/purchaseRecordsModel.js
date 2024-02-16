const pool = require('../services/db');

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Purchase_records
        WHERE precord_id = ?;
    `;//short and simple :)
    const VALUES = [data.precord_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ===================Middleware here==================================================================
module.exports.insertSingleCheck = (data, callback) =>
{
    const CHIPCHECKSTATEMENT = `
        SELECT * FROM Survivor
        WHERE survivor_id = ?;

        SELECT * FROM Quest;

        SELECT * FROM Quest_records
        WHERE survivor_id = ?;

        SELECT * FROM Tool;

        SELECT * FROM Purchase_records
        WHERE survivor_id = ?;

        SELECT * FROM Tool
        WHERE tool_id = ?;
    `;
    const CHIPCHECKVALUES = [data.survivor_id, data.survivor_id, data.survivor_id, data.tool_id];

    pool.query(CHIPCHECKSTATEMENT, CHIPCHECKVALUES, callback);
}
// ====================================================================================================