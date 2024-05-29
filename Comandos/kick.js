module.exports = {
    name: 'kick',
    description: 'Expulsa um usuário do servidor',
    execute: async (message, args) => {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('Você não tem permissão para usar este comando.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Por favor, mencione um usuário válido para expulsar.');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('O usuário mencionado não está no servidor.');
        }

        try {
            await member.kick();
            message.channel.send(`${user.tag} foi expulso do servidor.`);
        } catch (error) {
            console.error(error);
            message.reply('Houve um erro ao tentar expulsar o usuário.');
        }
    },
};