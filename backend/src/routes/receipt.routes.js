const express = require('express');
const router = express.Router();

const receiptService = require("../services/receipt.service");

// POST /api/receipt/process

router.post("/process", async (req, res) => {
    try {
        const { image } = req.body;

        // validation
        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const result = await receiptService.processReceipt(image);

        res.status(200).json(result);

    } catch (error) {
        console.error("Receipt processing failed:", error.message);

        res.status(500).json({
            error: "Failed to process receipt"
        });
    }
});

module.exports = router;