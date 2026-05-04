import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/analyze', async (req, res) => {
  console.log('--- New Analysis Request ---');
  try {
    const { transcript } = req.body;

    if (!transcript) {
      console.log('Error: No transcript provided');
      return res.status(400).json({ error: 'Transcript is required' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') {
      console.log('Error: Missing GEMINI_API_KEY');
      return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    console.log('Sending transcript to Gemini (length:', transcript.length, ')');

    const prompt = `
      You are a professional impromptu speaking coach. Analyze the following transcript of a speech.
      Return a structured JSON report.
      
      Transcript: "${transcript}"

      Return ONLY a JSON object with the following structure:
      {
        "clarity_score": number (1-10),
        "confidence_score": number (1-10),
        "filler_word_feedback": "string summarizing use of filler words like um, ah, you know",
        "structure_feedback": "string evaluating the introduction, body, and conclusion",
        "improvement_tips": ["tip 1", "tip 2", "tip 3"]
      }
    `;

    let model;
    const modelNames = ['gemini-2.5-flash-lite'];
    let lastError;

    for (const modelName of modelNames) {
      try {
        console.log(`Attempting analysis with model: ${modelName}`);
        model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log(`SUCCESS with model: ${modelName}`);
        console.log('RAW Response:', text);

        let resultJson;
        try {
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          const cleanText = jsonMatch ? jsonMatch[0] : text;
          resultJson = JSON.parse(cleanText);
          return res.json(resultJson);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          return res.status(500).json({ error: 'Failed to parse AI response' });
        }
      } catch (err) {
        console.warn(`Model ${modelName} failed:`, err.message);
        lastError = err;
        continue;
      }
    }

    throw lastError || new Error('All models failed to respond');
  } catch (error) {
    console.error('--- AI Analysis Error Details ---');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    if (error.response) {
      console.error('API Response Error:', error.response.data);
    }
    res.status(500).json({ error: error.message || 'Failed to analyze speech' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
