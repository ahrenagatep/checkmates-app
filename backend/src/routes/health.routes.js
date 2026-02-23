const express = require('express');
const router = express.Router();

// GET /health
router.get("/", (req, res) => {
    res.json({ status: "OK!" });
});

module.exports = router;