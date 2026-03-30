const axios = require('axios');
const { OpenAI } = require('openai');
const config = require('../config/env');

// Pre-configured constants for different free-tier friendly providers
const GROQ_MODEL = 'llama-3.1-8b-instant'; // Updated to a stable version
const MISTRAL_MODEL = 'mistral-tiny'; // Mistral standard endpoint
const HUGGINGFACE_MODEL = 'google/gemma-2-2b-it'; // Very reliable on free Inference API

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
 * HuggingFace Inference API (Free alternative without stringent rate limits)
 * Requires HUGGINGFACE_API_KEY
 */
exports.queryHuggingFace = async (prompt) => {
    if (!config.API_KEYS.HUGGINGFACE) throw new Error('HUGGINGFACE_API_KEY is not configured securely on the server');

    try {
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

        // HuggingFace can return an array or a single object
        let text = '';
        if (Array.isArray(response.data) && response.data.length > 0) {
            text = response.data[0].generated_text || '';
        } else if (response.data && response.data.generated_text) {
            text = response.data.generated_text;
        } else {
            // Fallback for some models that return raw strings or other structures
            text = JSON.stringify(response.data);
        }

        return text;

        throw new Error('Failed to parse HuggingFace response');
    } catch (error) {
        console.error('HuggingFace Error:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Azure OpenAI Service
 * Requires AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, and AZURE_OPENAI_DEPLOYMENT
 */
exports.queryAzureOpenAI = async (prompt) => {
    if (!config.API_KEYS.AZURE_OPENAI_KEY || !config.API_KEYS.AZURE_OPENAI_ENDPOINT || !config.API_KEYS.AZURE_OPENAI_DEPLOYMENT) {
        console.error('Azure Config Missing:', {
            hasKey: !!config.API_KEYS.AZURE_OPENAI_KEY,
            hasEndpoint: !!config.API_KEYS.AZURE_OPENAI_ENDPOINT,
            hasDeployment: !!config.API_KEYS.AZURE_OPENAI_DEPLOYMENT
        });
        throw new Error('Azure OpenAI configuration is incomplete on the server');
    }

    const openai = new OpenAI({
        apiKey: config.API_KEYS.AZURE_OPENAI_KEY,
        baseURL: `${config.API_KEYS.AZURE_OPENAI_ENDPOINT.replace(/\/$/, '')}/openai/deployments/${config.API_KEYS.AZURE_OPENAI_DEPLOYMENT}`,
        defaultQuery: { 'api-version': '2024-02-01' },
        defaultHeaders: { 'api-key': config.API_KEYS.AZURE_OPENAI_KEY },
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: config.API_KEYS.AZURE_OPENAI_DEPLOYMENT,
    });

    return completion.choices[0]?.message?.content || '';
};
