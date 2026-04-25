const fetch = require('node-fetch');
const FormData = require('form-data');
const { parseReceiptText } = require('./parser.service.js');

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
        console.log("RAW TEXT:")
        console.log(rawText)
        // parse rawText into structured data (FINISHED)
        // NEW TODO: FIX POSSIBLE PRICING ERRORS?
        const structuredData = await parseReceiptText(rawText);

        return structuredData;

    } catch (error) {
        throw new Error(`OCR processing failed: ${error.message}`);
    }
};

module.exports = {
    processReceipt
};