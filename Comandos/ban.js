module.exports = {
    name: 'ban',
    description: 'Banir um usuário',
    execute(message, args) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Você precisa mencionar um usuário para banir.');
        }
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('Você não tem permissão para banir usuários.');
        }
        member.ban().then(() => {
            message.reply(`${member.user.tag} foi banido.`);
        });
    },
};
