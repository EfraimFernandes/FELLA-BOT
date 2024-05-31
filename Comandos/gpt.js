const axios = require('axios');

module.exports = {
    name: 'gpt',
    description: 'Interage com o modelo distilgpt2 da Hugging Face',
    execute: async (message, args) => {
        const prompt = args.join(' ');

        if (!prompt) {
            return message.reply('Por favor, forneça uma mensagem para enviar ao GPT.');
        }

        const apiKey = process.env.HUGGINGFACE_API_KEY;
        const apiUrl = 'https://api-inference.huggingface.co/models/distilgpt2';

        try {
            const response = await axios.post(
                apiUrl,
                {
                    inputs: prompt,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            const reply = response.data[0].generated_text.trim();
            message.reply(reply);
        } catch (error) {
            console.error('Erro ao tentar se comunicar com o GPT:', error.response ? error.response.data : error.message);
            message.reply('Houve um erro ao tentar se comunicar com o GPT.');
        }
    },
};