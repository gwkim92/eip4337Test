const express = require("express");
const router = express.Router();
const userOperationController = require("../controllers/userOperationController");

router.post("/submit-operation", async (req, res) => {
  try {
    const result = await userOperationController.processUserOperation(req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
