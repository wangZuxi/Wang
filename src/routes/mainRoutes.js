const express = require('express');
const router = express.Router();

// ========SECTION A=========================================
// USER ROUTES :)
const userRoutes = require('./userRoutes');
router.use("/users", userRoutes);

// TASK ROUTES :0
const taskRoutes = require('./taskRoutes');
router.use("/tasks", taskRoutes);

// TASK PROGRESS ROUTES :D
const taskProgressRoutes = require('./taskProgressRoutes');
router.use("/task_progress", taskProgressRoutes);
// =========================================================


// =============SECTION B===================================
// SURVIVOR ROUTES :)
const survivorRoutes = require('./survivorRoutes');
router.use("/survivor", survivorRoutes);

// QUEST ROUTES :)
const questRoutes = require('./questRoutes');
router.use("/quest", questRoutes);

// QUEST RECORD ROUTES :)
const questRecordsRoutes = require('./questRecordsRoutes');
router.use("/quest_records", questRecordsRoutes);

// MESSAGE BOARD ROUTES :D)
const msgRoutes = require('./msgRoutes');
router.use("/msg", msgRoutes);

// TOOL ROUTES :)
const toolRoutes = require('./toolRoutes');
router.use("/tool", toolRoutes);

// PURCHASE RECORD ROUTES :)
const purchaseRecordsRoutes = require('./purchaseRecordsRoutes');
router.use("/purchase_records", purchaseRecordsRoutes);
//==========================================================
module.exports = router;