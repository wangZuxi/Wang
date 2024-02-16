const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
        const SQLSTATEMENT = `
            INSERT INTO User (username, email, password)
            VALUES (?, ?, ?);

            SELECT * FROM User
            WHERE username = ?;
            ;
        `;
        // insert the values, then find and display the user :D
        const VALUES = [data.username, data.email, data.password, data.username];

        pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.login = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM User;
    `;// Short and simple :)

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM User
        WHERE user_id = ?;
        
        SELECT * FROM Task;

        SELECT * From TaskProgress
        WHERE user_id = ?;

        SELECT * From Survivor
        WHERE user_id = ?;
    `;// Selecting from all tables to calculate total points. Refer to userController, line 64 for the calculation
    const VALUES = [data.user_id, data.user_id, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) =>
{
        const SQLSTATEMENT = `
            UPDATE User 
            SET username = ?, email = ?
            WHERE user_id = ?;
            
            SELECT * FROM User
            WHERE user_id = ?;            
        `;
        // Update user, and then display the updated user
        const VALUES = [data.username, data.email, data.user_id, data.user_id];

        pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM User 
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;// delete user from database with the given id
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// ===================================MiddleWare here===========================================================

module.exports.insertSingleCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM User
        WHERE username = ? OR email = ?;
    `;// Checking if values are already in database
    const DUPEVALUES = [data.username, data.email];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback);
}


module.exports.updateByIdCheck = (data, callback) =>
{
    const DUPESTATEMENT = `
        SELECT * FROM User
        WHERE username = ? AND email = ?;
    `;// Checking if values are already in database
    const DUPEVALUES = [data.username, data.email];

    pool.query(DUPESTATEMENT, DUPEVALUES, callback);
}

// ==============================================================================================