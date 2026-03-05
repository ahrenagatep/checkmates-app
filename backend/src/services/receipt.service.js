const fetch = require('node-fetch');
const FormData = require('form-data');

async function processReceipt(image) {
    try {
        // creating form data
        const formData = new FormData();
        formData.append('base64Image', image);
        formData.append('language', 'eng');

        // fetch call structure
        const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            headers: {
                'apikey': process.env.OCR_API_KEY
            },
            body: formData
        });

        // getting the parsed text
        const data = await response.json();

        // check if the response is valid
        if (!data.ParsedResults || data.ParsedResults.length === 0) {
            throw new Error('OCR failed to parse receipt');
        }

        const rawText = data.ParsedResults[0].ParsedText

        // TODO: Parse rawText into structured data
        const structuredData = parseReceiptText(rawText);

        return structuredData;

    } catch (error) {
        throw new Error(`OCR processing failed: ${error.message}`);
    }
};

function parseReceiptText(rawText) {
    const structuredData = {
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        rawText: rawText // kept for debugging purposes
    };

    return structuredData;
}

module.exports = {
    processReceipt
};