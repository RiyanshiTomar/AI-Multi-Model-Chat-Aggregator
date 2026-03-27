const axios = require('axios');
const { OpenAI } = require('openai');
const config = require('../config/env');

// Pre-configured constants for different free-tier friendly providers
const GROQ_MODEL = 'llama3-8b-8192'; // Free and fast LLaMa 3 provided by Groq
const MISTRAL_MODEL = 'mistral-tiny'; // Mistral standard endpoint
const HUGGINGFACE_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2'; // Example HF model

/**
 * Service to interact with Groq's super-fast free tier API
 * Requires GROQ_API_KEY
 */
exports.queryGroq = async (prompt) => {
    if (!config.API_KEYS.GROQ) throw new Error('GROQ_API_KEY is not configured securely on the server');

    const openai = new OpenAI({
        baseURL: 'https://api.groq.com/openai/v1',
        apiKey: config.API_KEYS.GROQ,
        timeout: config.API_TIMEOUT_MS, // Safe timeout implementation
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: GROQ_MODEL,
    });

    return completion.choices[0]?.message?.content || '';
};

/**
 * Service to interact with Mistral AI
 * Requires MISTRAL_API_KEY
 */
exports.queryMistral = async (prompt) => {
    if (!config.API_KEYS.MISTRAL) throw new Error('MISTRAL_API_KEY is not configured securely on the server');

    const openai = new OpenAI({
        baseURL: 'https://api.mistral.ai/v1',
        apiKey: config.API_KEYS.MISTRAL,
        timeout: config.API_TIMEOUT_MS,
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: MISTRAL_MODEL,
    });

    return completion.choices[0]?.message?.content || '';
};

/**
 * General OpenAI Service
 * Requires OPENAI_API_KEY
 */
exports.queryOpenAI = async (prompt) => {
    if (!config.API_KEYS.OPENAI) throw new Error('OPENAI_API_KEY is not configured securely on the server');

    const openai = new OpenAI({
        apiKey: config.API_KEYS.OPENAI,
        timeout: config.API_TIMEOUT_MS,
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
    });

    return completion.choices[0]?.message?.content || '';
};

/**
 * HuggingFace Inference API (Free alternative without stringent rate limits)
 * Requires HUGGINGFACE_API_KEY
 */
exports.queryHuggingFace = async (prompt) => {
    if (!config.API_KEYS.HUGGINGFACE) throw new Error('HUGGINGFACE_API_KEY is not configured securely on the server');

    const response = await axios.post(
        `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL}`,
        { inputs: prompt },
        {
            headers: {
                Authorization: `Bearer ${config.API_KEYS.HUGGINGFACE}`,
                'Content-Type': 'application/json',
            },
            timeout: config.API_TIMEOUT_MS, // Prevent hanging connection
        }
    );

    // HuggingFace typically returns an array like [{ generated_text: "..." }]
    if (response.data && response.data.length > 0) {
        let text = response.data[0].generated_text || '';
        // HF sometimes returns the prompt appended to the response, strip if needed
        return text;
    }

    throw new Error('Failed to parse HuggingFace response');
};
