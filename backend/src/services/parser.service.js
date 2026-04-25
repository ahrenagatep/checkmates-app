require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function parseReceiptText(rawText) {
    const prompt = `You are a receipt parser. Extract the data from this text and return ONLY a valid JSON object. Do NOT include Markdown, code blocks, or any extra text. Fix typos of items if needed.

The JSON must follow this exact shape:
{
  "items": [{ "name": "string", "amount": number, "price": number }],
  "subtotal": number,
  "tax": number,
  "total": number
}

Receipt text:
${rawText}`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt
    });

    let raw = response.text.trim();
    raw = raw.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```$/, '').trim(); // trim any codeblocks b/c gemini loves codeblocks idk

    return JSON.parse(raw);
}

module.exports = { parseReceiptText };

// temporary connection test block delete later
// parseReceiptText("Item: Coffee $3.50\nTotal: $3.50")
//     .then(result => console.log("Parsed:", JSON.stringify(result, null, 2)))
//     .catch(err => console.error("Error:", err.message));