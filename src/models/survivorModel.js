const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO Survivor (name, user_id)
        VALUES (?, ?);

        SELECT * FROM Survivor
        WHERE name = ?;
    `;
    const VALUES = [data.name, data.user_id, data.name];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.login = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Survivor
    WHERE name = ? AND user_id = ?;
    `;
    const VALUES = [data.name, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Survivor;
    `;// Short and simple :)

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Survivor
        WHERE survivor_id = ?;
        
        SELECT * FROM Quest;

        SELECT * FROM Quest_records
        WHERE survivor_id = ?;

        SELECT * FROM Tool;

        SELECT * FROM Purchase_records
        WHERE survivor_id = ?;
    `;// Selecting from all tables to calculate total points.
    const VALUES = [data.survivor_id, data.survivor_id, data.survivor_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE Survivor
        SET name = ?
        WHERE survivor_id = ?;
        
        SELECT * FROM Survivor
        WHERE survivor_id = ?;     
    `;
    // Update survivor, and then display the updated survivor
    const VALUES = [data.name, data.survivor_id, data.survivor_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}


module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Survivor
    WHERE survivor_id = ?;

    ALTER TABLE Survivor AUTO_INCREMENT = 1;
    `;// delete survivor from database with the given id
    const VALUES = [data.survivor_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ===============================Middleware Here=============================================
module.exports.insertSingleCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM Survivor
        WHERE name = ?;

        SELECT * FROM User
        WHERE user_id = ?;

        SELECT * FROM Task;

        SELECT * From TaskProgress
        WHERE user_id = ?;

        SELECT * From Survivor
        WHERE user_id = ?;
    `;// Checking if values are already in database
    const DUPEVALUES = [data.name, data.user_id, data.user_id, data.user_id];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback);
}

module.exports.updateByIdCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM Survivor
        WHERE name = ?;
    `;// Checking if values are already in database
    const DUPEVALUES = [data.name];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback);
}
// ===========================================================================================