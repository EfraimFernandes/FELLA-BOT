module.exports = {
    name: 'help',
    description: 'Lista todos os comandos disponíveis',
    execute: async (message) => {
        const commands = message.client.commands.map(command => `\`${command.name}\`: ${command.description}`).join('\n');
        message.channel.send(`Aqui está a lista de todos os comandos disponíveis:\n\n${commands}`);
    },
};