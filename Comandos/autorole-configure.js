const Autorole = require('../models/Autorole');

module.exports = {
    name: 'autorole',
    description: 'Configura o cargo a ser atribuído automaticamente aos novos membros.',
    execute: async (message, args) => {
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('Você não tem permissão para usar este comando.');
        }

        const role = message.mentions.roles.first();
        if (!role) {
            return message.reply('Por favor, mencione um cargo válido.');
        }

        const guildId = message.guild.id;
        let autorole = await Autorole.findOne({ guildId });

        if (!autorole) {
            autorole = new Autorole({ guildId, roleId: role.id });
        } else {
            autorole.roleId = role.id;
        }

        await autorole.save();
        message.reply(`O cargo ${role.name} foi configurado como autorole.`);
    },
};
