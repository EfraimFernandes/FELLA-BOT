const User = require('../models/User');

module.exports = {
    name: 'slots',
    description: 'Joga nos slots',
    execute: async (message) => {
        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = new User({ userId: message.author.id });
        }

        if (user.balance < 10) {
            return message.channel.send(`${message.author.username}, você precisa de pelo menos 10 moedas para jogar slots.`);
        }

        const items = ['🍒', '🍋', '🍊', '🍉'];
        const slot1 = items[Math.floor(Math.random() * items.length)];
        const slot2 = items[Math.floor(Math.random() * items.length)];
        const slot3 = items[Math.floor(Math.random() * items.length)];

        if (slot1 === slot2 && slot2 === slot3) {
            user.balance += 50;
            message.channel.send(`${message.author.username} jogou slots: [${slot1}] [${slot2}] [${slot3}] - Você ganhou! Seu saldo agora é ${user.balance} moedas.`);
        } else {
            user.balance -= 10;
            message.channel.send(`${message.author.username} jogou slots: [${slot1}] [${slot2}] [${slot3}] - Você perdeu! Seu saldo agora é ${user.balance} moedas.`);
        }
        await user.save();
    },
};