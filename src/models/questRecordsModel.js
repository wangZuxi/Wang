const pool = require('../services/db');

module.exports.insertSingle = (data, callback) =>
{
        const SQLSTATEMENT = `
            INSERT INTO Quest_records (survivor_id, quest_id, completion_date, notes)
            VALUES (?, ?, ?, ?);

            SELECT * FROM Quest_records
            WHERE survivor_id = ? AND quest_id = ? AND completion_date = ? AND notes = ?;
        `;
        const VALUES = [data.survivor_id, data.quest_id, data.completion_date, data.notes, data.survivor_id, data.quest_id, data.completion_date, data.notes];

        pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Quest_records
        WHERE survivor_id = ?;
    `;//short and simple :)
    const VALUES = [data.sid];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) =>
{
        const SQLSTATEMENT = `
            UPDATE Quest_records
            SET notes = ?
            WHERE qrecord_id = ?;
            
            SELECT * FROM Quest_records
            WHERE qrecord_id = ?;            
        `;
        // Update quest record, and then display the updated quest record
        const VALUES = [data.notes, data.qrecord_id, data.qrecord_id];

        pool.query(SQLSTATEMENT, VALUES, callback);
}

// ===================================MiddleWare here===========================================================

module.exports.insertSingleCheck = (data, callback) =>
{
    const TOOLCHECKSTATEMENT = `
        SELECT * FROM Quest
        WHERE quest_id = ?;

        SELECT * FROM Survivor
        WHERE survivor_id = ?;
    `;
    const TOOLCHECKVALUES = [data.quest_id, data.survivor_id];

    pool.query(TOOLCHECKSTATEMENT, TOOLCHECKVALUES, callback)
}

// ==============================================================================================