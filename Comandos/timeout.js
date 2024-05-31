const ms = require('ms'); // Certifique-se de ter a biblioteca ms instalada: npm install ms

module.exports = {
    name: 'timeout',
    description: 'Colocar um usuário em timeout por um determinado período de tempo',
    execute: async (message, args) => {
        if (!message.member.permissions.has('MODERATE_MEMBERS')) { // Use 'MODERATE_MEMBERS' para o timeout nativo
            return message.reply('Você não tem permissão para usar este comando.');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Você precisa mencionar um usuário para colocar em timeout.');
        }

        const duration = args[1];
        if (!duration) {
            return message.reply('Por favor, especifique a duração do timeout. Exemplo: !timeout @usuario 1h');
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            return message.reply('Por favor, forneça uma duração de timeout válida. Exemplo: 1h, 30m, 1d.');
        }

        if (msDuration < 5000 || msDuration > 2.419e9) {
            return message.reply('A duração do timeout não pode ser menor que 5 segundos ou maior que 28 dias.');
        }

        try {
            await member.timeout(msDuration, 'Timeout aplicado pelo comando!');
            message.reply(`${member.user.tag} foi colocado em timeout por ${duration}.`);
        } catch (error) {
            console.error(error);
            message.reply('Houve um erro ao tentar colocar o usuário em timeout.');
        }
    },
};