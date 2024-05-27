const User = require('../models/User');

module.exports = {
    name: 'saldo',
    description: 'Mostra o saldo do usuário',
    execute: async (message) => {
        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = new User({ userId: message.author.id });
            await user.save();
        }
        message.channel.send(`${message.author.username}, seu saldo é ${user.balance} moedas.`);
    },
};