const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO Msg (survivor_id, msg, msg_date)
        VALUES (?, ?, ?);

        SELECT * FROM Msg
        WHERE msg_date = ?;
    `;
    const VALUES = [data.survivor_id, data.msg, data.msg_date, data.msg_date];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Msg;
    `;// Short and simple :)

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Msg
        WHERE user_id = ?;
    `;// Short and simple :)

    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE Msg
        SET msg = ?, msg_date = ?
        WHERE msg_id = ?;
        
        SELECT * FROM Msg
        WHERE msg_id = ?;            
    `;
    // Update user, and then display the updated user
    const VALUES = [data.msg, data.msg_date, data.msg_id, data.msg_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Msg
    WHERE msg_id = ?;

    ALTER TABLE Msg AUTO_INCREMENT = 1;
    `;// delete user from database with the given id
    const VALUES = [data.msg_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
