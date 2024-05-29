const User = require('../Models/User');  // Importe o modelo do usuário

module.exports = {
    name: 'level',
    description: 'Sistema de nível',
    execute: async (message) => {
        if (message.author.bot) return;

        // Encontre o usuário no banco de dados ou crie um novo usuário
        let user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            user = new User({ discordId: message.author.id, xp: 0, level: 1 });  // Inicialize com level 1
        }

        user.xp += 1;  // Adicione algum XP ao usuário

        // Verifique se o usuário deve subir de nível
        const nextLevelXp = user.level * 10;
        console.log(`Usuário: ${message.author.username}, XP: ${user.xp}, Level Atual: ${user.level}, XP para o próximo nível: ${nextLevelXp}`);

        if (user.xp >= nextLevelXp) {
            user.level += 1;

            // Envie uma mensagem para o usuário subir de nível
            message.reply(`Parabéns! Você subiu para o nível ${user.level}!`);
        }

        // Salve o usuário no banco de dados
        await user.save();
    },
};
