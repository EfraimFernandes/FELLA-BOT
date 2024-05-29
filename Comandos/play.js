/*const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Reproduz uma música do YouTube',
    execute: async (message, args) => {
        if (!message.member.voice.channel) {
            return message.reply('Você precisa estar em um canal de voz para usar este comando!');
        }

        const query = args.join(' ');
        if (!query) {
            return message.reply('Por favor, forneça um link do YouTube ou termos de pesquisa.');
        }

        const voiceChannel = message.member.voice.channel;
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();

        connection.on(VoiceConnectionStatus.Ready, async () => {
            try {
                const stream = ytdl(query, { filter: 'audioonly', highWaterMark: 1 << 25 });
                const resource = createAudioResource(stream);

                player.play(resource);
                connection.subscribe(player);

                player.on(AudioPlayerStatus.Playing, () => {
                    console.log('A música começou a tocar!');
                });

                player.on('error', error => {
                    console.error('Erro no player de áudio:', error);
                    message.reply('Houve um erro ao tentar reproduzir a música.');
                });

                await message.reply(`Reproduzindo: ${query}`);
            } catch (error) {
                console.error('Erro ao tentar reproduzir a música:', error);
                message.reply('Houve um erro ao tentar reproduzir a música.');
            }
        });

        player.on(AudioPlayerStatus.Idle, () => {
            console.log('A música terminou de tocar!');
            connection.destroy();
        });

        connection.on(VoiceConnectionStatus.Disconnected, () => {
            connection.destroy();
        });
    },
};*/
