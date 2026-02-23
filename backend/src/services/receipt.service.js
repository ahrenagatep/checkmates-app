async function processReceipt(image) {
    // placeholder for OCR call
    const rawText = "MOCK RECEIPT TEXT"

    const structuredData = {
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0
    };

    return structuredData;
}

module.exports = {
    processReceipt
};