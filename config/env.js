require('dotenv').config();

// Centralized configuration using Best Practices
const config = {
    PORT: process.env.PORT || 5000,
    API_TIMEOUT_MS: parseInt(process.env.API_TIMEOUT_MS, 10) || 15000, // 15s default timeout
    API_KEYS: {
        GROQ: process.env.GROQ_API_KEY,
        MISTRAL: process.env.MISTRAL_API_KEY,
        OPENAI: process.env.OPENAI_API_KEY,
        HUGGINGFACE: process.env.HUGGINGFACE_API_KEY
    }
};

// Application start-up health check
const configuredKeysCount = Object.values(config.API_KEYS).filter(Boolean).length;
if (configuredKeysCount === 0) {
    console.warn('⚠️ WARNING: No AI API keys are found in the .env configuration. The application will not function properly.');
} else {
    console.info(`✅ Configuration Loaded Secruely: Found ${configuredKeysCount} initialized API provider keys.`);
}

module.exports = config;
