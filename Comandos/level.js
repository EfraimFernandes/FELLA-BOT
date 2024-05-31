const User = require('../models/User');

module.exports = {
    name: 'level',
    description: 'Mostra o level do usuário',
    execute: async (message) => {
        try {
            let user = await User.findOne({ userId: message.author.id });
            if (!user) {
                user = new User({ userId: message.author.id });
                await user.save();
            }
            message.reply(`${message.author.username}, seu level é ${user.level}.`);
        } catch (error) {
            console.error('Erro ao verificar o level:', error);
            message.reply('Houve um erro ao verificar o seu level.');
        }
    },
};
