module.exports = {
    name: 'ping',
    description: 'Testa a velocidade de resposta do bot.',
    execute: async (message, args) => {
        const sent = await message.reply('Ping?');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);
        
        sent.edit(`Pong! Latência da mensagem: ${latency}ms. Latência da API: ${apiLatency}ms.`);
    },
};