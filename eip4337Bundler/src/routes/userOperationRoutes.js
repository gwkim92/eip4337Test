const express = require("express");
const router = express.Router();
const { processUserOperation } = require("../utils/userOperationUtils");

router.post("/submit-operation", async (req, res) => {
  try {
    const result = await processUserOperation(req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
