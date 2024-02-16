const pool = require("../services/db");

// For resetting and initialising tables in mySQL for section B
const SQLSTATEMENT =`

DROP TABLE IF EXISTS Survivor;

DROP TABLE IF EXISTS Quest;

DROP TABLE IF EXISTS Quest_records;

DROP TABLE IF EXISTS Tool;

DROP TABLE IF EXISTS Purchase_records;


CREATE TABLE Survivor (
    survivor_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name TEXT,
    inventory TEXT
);
CREATE TABLE Quest (
    quest_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    required_tools TEXT,
    reward INT
);
CREATE TABLE Quest_records (
    qrecord_id INT PRIMARY KEY AUTO_INCREMENT,
    survivor_id INT NOT NULL,
    quest_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT
);
CREATE TABLE Msg (
    msg_id INT PRIMARY KEY AUTO_INCREMENT,
    survivor_id INT NOT NULL,
    msg TEXT,
    msg_date TIMESTAMP
);
CREATE TABLE Tool (
    tool_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    description TEXT,
    cost INT
);
CREATE TABLE Purchase_records (
    precord_id INT PRIMARY KEY AUTO_INCREMENT,
    survivor_id INT NOT NULL,
    tool_id INT NOT NULL,
    quantity INT NOT NULL,
    transaction_date TIMESTAMP
);

INSERT INTO Quest (quest_id, title, description, required_tools, reward) VALUES
(1, 'Carcass Cleaning', 'Bodies are piling up. Help clear the load!', '', 10),
(2, 'Uranium Issue', "There's this batch of green bright stuff outside the tavern. Help scrap it off.", 'Shovel', 20),
(3, "Granny's Birthday", 'Mrs Jaggof is hosting a party for her birthday! Bring her some food.', 'Baked beans', 100),
(4, 'Cave Complications', "Zuxi wandered abit too far into the cave. Help search for our beloved student and don't get lost", 'Rope, Torchlight', 40),
(5, 'Mutants Galore!', 'Mutants. Tons. By wall. You take gun. You shoot. Me give you money', 'Assualt Rifle', 2);

INSERT INTO Tool (tool_id, name, description, cost) VALUES
(1, 'Shovel', 'Great for cleaning up Uranium!', 5),
(2, 'Rope', "Zuxi seems to have left this behind...Oh well, finder's keepers!", 10),
(3, 'Torchlight', 'LET THERE BE LIIIIIIIIGHHHHT HHRRMRRGGGGG', 15),
(4, 'Assualt Rifle', 'Big gun.', 20),
(5, 'Baked Beans', 'Is there anything better?', 99);

`;


pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating tables! :( ", error);
    } else {
        console.log("Tables created successfully :)");
    }
    process.exit();
});