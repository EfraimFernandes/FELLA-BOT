const User = require('../models/User');

module.exports = {
    name: 'daily',
    description: 'Recebe moedas diárias',
    execute: async (message) => {
        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = new User({ userId: message.author.id });
        }

        const now = new Date();
        const lastDaily = user.lastDaily;

        if (lastDaily) {
            const lastDailyDate = new Date(lastDaily);
            if (
                now.getFullYear() === lastDailyDate.getFullYear() &&
                now.getMonth() === lastDailyDate.getMonth() &&
                now.getDate() === lastDailyDate.getDate()
            ) {
                return message.channel.send(`${message.author.username}, você já resgatou suas moedas diárias hoje. Tente novamente amanhã.`);
            }
        }

        user.balance += 100;
        user.lastDaily = now;
        await user.save();
        message.channel.send(`${message.author.username}, você recebeu 100 moedas! Seu saldo agora é ${user.balance} moedas.`);
    },
};