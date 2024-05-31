const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const User = require('./models/User');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.TOKEN;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error(err));

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'Comandos');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}

let messageCount = {};

client.once('ready', () => {
    console.log('Bot está online!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const prefix = '!';
    if (!message.content.startsWith(prefix)) {
        if (!messageCount[message.author.id]) {
            messageCount[message.author.id] = 1;
        } else {
            messageCount[message.author.id]++;
        }

        const count = messageCount[message.author.id];
        if (count % 100 === 0) {
            try {
                let user = await User.findOneAndUpdate(
                    { userId: message.author.id },
                    { $inc: { level: 1, balance: 1000 } },
                    { upsert: true, new: true }
                );
                message.reply(`${message.author.username} subiu para o level ${user.level} e ganhou 1000 moedas!`);
            } catch (error) {
                console.error('Erro ao atualizar o level do usuário:', error);
                message.reply('Houve um erro ao atualizar o seu level.');
            }
        }
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Houve um erro ao tentar executar esse comando.');
    }
});

client.login(token);
