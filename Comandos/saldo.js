const User = require('../models/User');

module.exports = {
    name: 'saldo',
    description: 'Mostra o saldo do usuário',
    execute: async (message) => {
        try {
            let user = await User.findOne({ userId: message.author.id });
            
            // Se o usuário não existir, cria um novo
            if (!user) {
                user = await User.create({ userId: message.author.id, balance: 0 });
            }

            message.channel.send(`${message.author.username}, seu saldo é ${user.balance || 0} moedas.`);
        } catch (error) {
            console.error('Erro ao verificar o saldo:', error);
            message.reply('Houve um erro ao verificar o seu saldo.');
        }
    },
};