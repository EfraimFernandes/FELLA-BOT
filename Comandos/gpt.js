//const OpenAIApi = require('openai');

// module.exports = {
//     name: 'gpt',
//     description: 'Interage com o modelo GPT-4 da OpenAI',
//     execute: async (message, args) => {
//         const prompt = args.join(' ');

//         if (!prompt) {
//             return message.reply('Por favor, forneça uma mensagem para enviar ao GPT-4.');
//         }

//         const openai = new OpenAIApi({
//             apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
//         });

//         try {
//             const response = await openai.createChatCompletion({
//                 model: 'gpt-3.5-turbo', // Use 'gpt-4' se você tiver acesso a ele, caso contrário, use 'gpt-3.5-turbo'
//                 messages: [{ role: 'user', content: prompt }],
//                 max_tokens: 150, // Ajuste conforme necessário
//                 temperature: 0.7, // Ajuste conforme necessário
//             });

//             const reply = response.data.choices[0].message.content.trim();
//             message.reply(reply);
//         } catch (error) {
//             console.error(error);
//             message.reply('Houve um erro ao tentar se comunicar com o GPT-4.');
//         }
//     },
// };