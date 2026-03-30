const aiService = require('../services/aiService');

/**
 * Handles concurrent chat requests to multiple selected models.
 * Uses Promise.allSettled to ensure fault tolerance.
 */
exports.handleChatRequest = async (req, res) => {
    try {
        const { prompt, models } = req.body;

        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            return res.status(400).json({ success: false, message: 'Valid prompt is required' });
        }

        if (!models || !Array.isArray(models) || models.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one model must be specified in models array' });
        }

        // Available model providers mapped to their respective service functions
        const modelHandlers = {
            'groq': aiService.queryGroq,
            'mistral': aiService.queryMistral,
            'azure': aiService.queryAzureOpenAI
        };

        // Validate selected models and prepare promises
        const promises = [];
        const modelNames = [];

        for (const model of models) {
            const provider = model.toLowerCase();
            if (modelHandlers[provider]) {
                promises.push(modelHandlers[provider](prompt));
                modelNames.push(provider);
            } else {
                // If a requested model does not have a handler, we can push a rejected promise immediately
                promises.push(Promise.reject(new Error(`Model provider '${provider}' is not supported`)));
                modelNames.push(provider);
            }
        }

        // Dispatch all promises concurrently
        // Promise.allSettled guarantees it won't crash if one fails
        const results = await Promise.allSettled(promises);

        // Format the results
        const formattedResponses = modelNames.map((modelName, index) => {
            const result = results[index];
            if (result.status === 'fulfilled') {
                return {
                    model: modelName,
                    status: 'success',
                    data: result.value
                };
            } else {
                return {
                    model: modelName,
                    status: 'error',
                    message: result.reason.message || 'An unknown error occurred'
                };
            }
        });

        res.json({
            success: true,
            prompt: prompt,
            responses: formattedResponses
        });

    } catch (error) {
        console.error('Error in handleChatRequest:', error);
        res.status(500).json({ success: false, message: 'Server error processing chat request' });
    }
};
